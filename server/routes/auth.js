const express = require("express");
const router = express.Router();
const pool = require("../db");

// Patient Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if email already exists
    const [existing] = await pool.query(
      "SELECT PatientID FROM Patient WHERE Email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Insert new patient
    const sql = `INSERT INTO Patient (Name, Email, Password, Age, Gender, Phone, Address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await pool.query(sql, [
      name,
      email,
      password, // In production, you should hash the password
      age || null,
      gender || null,
      phone || null,
      address || null
    ]);

    // Fetch the created patient
    const [rows] = await pool.query(
      "SELECT PatientID, Name, Email, Age, Gender, Phone, Address FROM Patient WHERE PatientID = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      patient: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Patient Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find patient by email and password
    const [rows] = await pool.query(
      "SELECT PatientID, Name, Email, Age, Gender, Phone, Address FROM Patient WHERE Email = ? AND Password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      patient: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
