const express = require('express')
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const multer = require('multer');
app.use(express.json());
app.use(cors());
// Multer setup for memory storage
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('image');
const upload = multer({ storage: storage });
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
// GET all students
app.get("/", (req, res) => {
   const sql = "SELECT id, name, city, image FROM students";
   db.query(sql, (err, results) => {
      if (err) {
         return res.status(500).send({ error: "Database query failed", details: err });
      }

      // Convert image buffer to base64 and attach the MIME type (assuming it's PNG)
      // const dataWithImages = results.map((row) => ({
      //    ...row,
      //    image: row.image ? Buffer.from(row.image).toString('base64') : null,
      //    imageType: row.image ? 'image/png' : null,  // Adjust if image type is different
      // }));
      //res.json(dataWithImages);
      const students = results.map((student) => ({
         ...student,
         image: `data:image/jpeg;base64,${student.image.toString('base64')}`
      }));
      res.status(200).json(students);
   });
});

//Insert student data
app.post("/insert", upload.single('image'), (req, res) => {
   const { id, name, city } = req.body;
   const image = req.file.buffer;
   // Log the incoming data for debugging
   // console.log("Request body:", req.body);
   //console.log("Uploaded file:", image);
   const sql = "INSERT INTO students (id,name, city, image) VALUES (?, ?,?,?)";
   //const insertQuery = "CALL insertData(?, ?,?,?)";
   db.query(insertQuery, [id, name, city, image], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      res.json({ message: "User created", userId: result.insertId });
   });
});
// app.post('/insert', (req, res) => {
//    upload(req, res, (err) => {
//       if (err) {
//          return res.status(400).json({ error: err });
//       } else {
//          const { id, name, city } = req.body;
//          const image = req.file.buffer;
//          if (!name || !image) {
//             return res.status(400).json({ error: 'Name and Photo are required' });
//          }
//          const query = "INSERT INTO students (id,name, city, image) VALUES (?, ?,?,?)";
//          db.query(query, [id, name, city, image], (error, results) => {
//             if (error) {
//                return res.status(500).json({ error: 'Database error' });
//             }
//             res.status(200).json({
//                message: 'Student info uploaded successfully', studentId:
//                   results.insertId
//             });
//          });
//       }
//    });
// });
//Delete a student by ID
app.delete("/delete/:id", (req, res) => {
   let { id } = req.params;
   id = parseInt(id);
   //console.log(id);
   //const sql = "DELETE FROM students WHERE id = ?";
   const sql = "CALL deleteData(?)";
   db.query(sql, [id], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      // Check if any rows were affected
      if (result.affectedRows > 0) {
         res.json({ message: "User deleted successfully" });
      } else {
         res.status(404).json({ message: "No user found with this ID" });
      }
   });
});
// Update a student's data by ID
app.put("/update/:id", (req, res) => {
   const { name, city } = req.body;
   const { id } = req.params;
   const sql = "UPDATE students SET name = ?, city = ? WHERE id = ?";
   // const sql = "CALL updateData(?,?,?)";
   db.query(sql, [id, name, city], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }
      // Stored procedure results come as an array of arrays
      const affectedRows = result && result[0] && result[0].affectedRows;

      if (affectedRows === 0) {
         return res.status(404).json({ message: "No user found with this ID" });
      } else {
         res.json({ message: "User updated successfully" });
      }
   });
});
// User login
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
// User registration
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
// Change user password
app.post("/change-password", (req, res) => {
   const { currentPassword, newPassword, email } = req.body;

   const sql = "UPDATE users SET password = ? WHERE password = ? AND email = ?";
   db.query(sql, [newPassword, currentPassword, email], (err, result) => {
      if (err) {
         return res.status(500).send(err);
      }

      if (result.affectedRows === 0) {
         return res.status(400).json({ message: "Current password is incorrect" });
      }

      res.json({ message: "Password changed successfully" });
   });
});
// Start the server
app.listen(5000, () => {
   console.log('Server running on port 5000')
})