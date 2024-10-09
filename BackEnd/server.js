const express = require('express')
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "abhishek",
   database: "students",
});

// Connect to the database
db.connect((err) => {
   if (err) {
      console.error("Error connecting to the database:", err);
      return;
   }
   console.log("Connected to MySQL database");
});
app.get("/", (req, res) => {
   const sql = "SELECT * FROM students";
   db.query(sql, (err, results) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json(results);
   });
});
app.post("/insert", (req, res) => {
   const { id, name, city } = req.body;
   const sql = "INSERT INTO students (id,name, city) VALUES (?, ?,?)";
   db.query(sql, [id, name, city], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json({ message: "User created", userId: result.insertId });
   });
});
app.delete("/delete/:id", (req, res) => {
   let { id } = req.params;
   id = parseInt(id);
   const sql = "DELETE FROM students WHERE id = ?";
   db.query(sql, [id], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json({ message: "User deleted" });
   });
});
app.put("/update/:id", (req, res) => {
   const { name, city } = req.body;
   const { id } = req.params;
   const sql = "UPDATE students SET name = ?, city = ? WHERE id = ?";
   db.query(sql, [name, city, id], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json({ message: "User updated" });
   });
});

app.post("/login", (req, res) => {
   const { Email, Password } = req.body;
   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
   db.query(sql, [Email, Password], (err, results) => {
      if (err) {
         return res.status(500).send("Server Error");
      }
      if (results.length === 0) {
         return res.status(404).send("User not found");
      }
      res.json(results);
   });
});

app.post("/register", (req, res) => {
   const { Name, Email, Password } = req.body;
   const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
   db.query(sql, [Email, Password], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json({ message: "User created", userId: result.insertId, Email, Password });
   });
});
app.listen(5000, () => {
   console.log('Server running on port 5000')
})