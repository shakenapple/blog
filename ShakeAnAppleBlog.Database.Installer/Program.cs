using System;
using System.ComponentModel.DataAnnotations;

namespace ShakeAnAppleBlog.Database
{
    class Program
    {
        [CommandLineArguments]
        internal class ConnStringAttributes
        {
            [Required("Server")]
            public string Server { get; set; }

            [Required("Port")]
            public string Port { get; set; }

            [Required("User")]
            public string User { get; set; }

            [Required("Password")]
            public string Password { get; set; }

            public string Database { get; set; }
        }

        
        static void Main(string[] args)
        {
            var connStrAttrs = new ConnStringAttributes();
            Console.Write("Server: ");

            string connstring = String.Format("Server={0};Port={1};" +
                  "User Id={2};Password={3};Database={4};",
                  tbHost.Text, tbPort.Text, tbUser.Text,
                  tbPass.Text, tbDataBaseName.Text);
            // Making connection with Npgsql provider
            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            // quite complex sql statement
            string sql = "SELECT * FROM simple_table";
            // data adapter making request from our connection
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(sql, conn);
            // i always reset DataSet before i do
            // something with it.... i don't know why :-)
            ds.Reset();
            // filling DataSet with result from NpgsqlDataAdapter
            da.Fill(ds);
            // since it C# DataSet can handle multiple tables, we will select first
            dt = ds.Tables[0];
            // connect grid to DataTable
            dataGridView1.DataSource = dt;
            // since we only showing the result we don't need connection anymore
            conn.Close();
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    sealed public class RequiredAttribute : ValidationAttribute
    {
        private readonly string _propertyName;

        public RequiredAttribute(string propertyName)
        {
            _propertyName = propertyName;
            base.ErrorMessage = string.Format("{0} is required", _propertyName);
        }

        public override bool IsValid(object value)
        {
            if ((value is string) && string.IsNullOrEmpty(value as string))
            {
                return false;
            }
            if (value == null)
            {
                return false;
            }
            return true;
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
            
        }
    }
}
