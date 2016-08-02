using Npgsql;
using System;

namespace ShakeAnAppleBlog.Database
{
    class Program
    {
        [CommandLineArguments]
        internal class ConnStringAttributes
        {
            [Option("s", Required = true)]
            public string Server { get; set; }

            [Option("p", Required = true)]
            public string Port { get; set; }

            [Option("user", Required = true)]
            public string User { get; set; }

            [Option("pwd", Required = true)]
            public string Password { get; set; }

            [Option("db")]
            public string Database { get; set; }
        }

        
        static void Main(string[] args)
        {
            
            var connStrAttrs = new ConnStringAttributes();
            CommandLineParser.Parse(args, connStrAttrs);

            string connstring = String.Format("Server={0};Port={1};" +
                  "User Id={2};Password={3};",
                  connStrAttrs.Server, connStrAttrs.Port, connStrAttrs.User,
                  connStrAttrs.Password);
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

   
}
