const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multer = require('multer');
app.use(express.json());
app.use(cors());

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/students', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
   id: {
      type: Number,
      required: true,
      unique: true,
   },
   name: {
      type: String,
      required: true,
   },
   city: {
      type: String,
      required: true,
   },
   image: {
      type: Buffer, // Stores image in binary format
   },
});

// Define User Schema
const userSchema = new mongoose.Schema({
   Name: {
      type: String,
      required: true,
   },
   Email: {
      type: String,
      required: true,
      unique: true,
   },
   Password: {
      type: String,
      required: true,
   },
});

// Create Student and User Models
const Student = mongoose.model('Student', studentSchema);
const User = mongoose.model('User', userSchema);

// GET all students
app.get("/", async (req, res) => {
   try {
      const students = await Student.find();
      const studentsWithImages = students.map((student) => ({
         ...student._doc,
         image: student.image ? `data:image/jpg;base64,${student.image.toString('base64')}` : null,
      }));
      res.status(200).json(studentsWithImages);
   } catch (err) {
      res.status(500).send({ error: "Failed to retrieve students", details: err });
   }
});

// Insert student data
app.post("/insert", upload.single('image'), async (req, res) => {
   const { id, name, city } = req.body;
   const image = req.file ? req.file.buffer : null;

   try {
      const student = new Student({ id, name, city, image });
      await student.save();
      res.json({ message: "Student created", student });
   } catch (err) {
      res.status(500).send({ error: "Failed to insert student", details: err });
   }
});

// Delete a student by ID
app.delete("/delete/:id", async (req, res) => {
   try {
      const result = await Student.deleteOne({ id: req.params.id });
      if (result.deletedCount > 0) {
         res.json({ message: "Student deleted successfully" });
      } else {
         res.status(404).json({ message: "No student found with this ID" });
      }
   } catch (err) {
      res.status(500).send({ error: "Failed to delete student", details: err });
   }
});

// Update a student's data by ID
app.put("/update/:id", async (req, res) => {
   const { name, city } = req.body;

   try {
      const student = await Student.findOneAndUpdate(
         { id: req.params.id },
         { name, city },
         { new: true }
      );

      if (!student) {
         return res.status(404).json({ message: "No student found with this ID" });
      }

      res.json({ message: "Student updated successfully", student });
   } catch (err) {
      res.status(500).send({ error: "Failed to update student", details: err });
   }
});

// User login
app.post("/login", async (req, res) => {
   const { Email, Password } = req.body;

   try {
      const user = await User.findOne({ Email, Password });
      if (!user) {
         return res.status(404).send("User not found");
      }
      res.json(user);
   } catch (err) {
      res.status(500).send("Server Error");
   }
});

// User registration
app.post("/register", async (req, res) => {
   const { Name, Email, Password } = req.body;

   try {
      const newUser = new User({ Name, Email, Password });
      await newUser.save();
      res.json({ message: "User created", user: newUser });
   } catch (err) {
      res.status(500).send({ error: "Failed to register user", details: err });
   }
});

// Change user password
app.post("/change-password", async (req, res) => {
   const { currentPassword, newPassword, email } = req.body;

   try {
      const user = await User.findOneAndUpdate(
         { Email: email, Password: currentPassword },
         { Password: newPassword }
      );

      if (!user) {
         return res.status(400).json({ message: "Current password is incorrect" });
      }

      res.json({ message: "Password changed successfully" });
   } catch (err) {
      res.status(500).send({ error: "Failed to change password", details: err });
   }
});

// Start the server
app.listen(5000, () => {
   console.log('Server running on port 5000');
});
