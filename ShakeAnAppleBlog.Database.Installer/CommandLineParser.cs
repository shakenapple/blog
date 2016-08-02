using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace ShakeAnAppleBlog.Database
{
    [AttributeUsage(AttributeTargets.Property)]
    sealed public class OptionAttribute : Attribute
    {
        private readonly string _key;

        public string Key
        {
            get
            {
                return _key;
            }
        }

        public bool Required { get; set; }

        public OptionAttribute(string key)
        {
            _key = key;
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct)]
    sealed public class CommandLineArgumentsAttribute : Attribute
    {
        public CommandLineArgumentsAttribute()
        {
        }
    }

    public class CommandLineParser
    {
        public static void Parse(string[] args, object options)
        {
            new CommandLineParser().ParseInternal(args, options);
        }

        private void ParseInternal(string[] args, object options)
        {
            if (options.GetType().GetCustomAttribute<CommandLineArgumentsAttribute>() == null)
            {
                throw new ArgumentException("Options object should be annotated with CommandLineArgumentsAttribute");
            }

            var optionValues = this.CreateOptValueDictionary(args);
            foreach (var prop in options.GetType().GetProperties())
            {
                var optionAttr = prop.GetCustomAttribute<OptionAttribute>();
                if (optionAttr == null)
                {
                    continue;
                }

                var value = string.Empty;
                if (optionValues.TryGetValue(optionAttr.Key, out value))
                {
                    prop.SetValue(options, value);
                }
                else if (optionAttr.Required)
                {
                    throw new ValidationException(
                        string.Format("Value for {0} is required (try -{1})", prop.Name, optionAttr.Key));
                }
            }
        }

        private Dictionary<string, string> CreateOptValueDictionary(string[] args)
        {
            var result = new Dictionary<string, string>();
            var optionKey = string.Empty;
            foreach (var arg in args)
            {
                if (arg.StartsWith("-") || arg.StartsWith("/"))
                {
                    optionKey = arg.Substring(1);
                    result.Add(optionKey, string.Empty);
                }
                else
                {
                    result[optionKey] = arg;
                }
            }
            return result;
        }
    }
}
