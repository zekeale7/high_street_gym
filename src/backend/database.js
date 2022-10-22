import mysql from "mysql2/promise";

export const db_conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Frenchfries7",
    database: "sail-away-db",
    port: 3307,
});