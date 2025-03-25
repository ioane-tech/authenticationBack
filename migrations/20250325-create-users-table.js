import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const runMigration = () => {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

  connection.query(createDatabaseQuery, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      process.exit(1);
    } else {
      console.log("Database created or already exists.");
      
      const useDatabaseQuery = `USE ${process.env.DB_NAME}`;
      
      connection.query(useDatabaseQuery, (err) => {
        if (err) {
          console.error("Error selecting database:", err);
          process.exit(1);
        } else {
          console.log(`Using database: ${process.env.DB_NAME}`);
          
          const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS usersTable (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255) NOT NULL UNIQUE,
              password VARCHAR(255) NOT NULL
            );
          `;

          connection.query(createUsersTableQuery, (err) => {
            if (err) {
              console.error("Error creating users table:", err);
              process.exit(1);
            } else {
              console.log("usersTable created successfully.");
            }
            connection.end(); 
          });
        }
      });
    }
  });
};

runMigration();
