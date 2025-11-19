const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, dept.Name AS DeptName 
      FROM Doctor d
      LEFT JOIN Department dept ON d.DeptID = dept.DeptID
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// GET doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, dept.Name AS DeptName 
      FROM Doctor d
      LEFT JOIN Department dept ON d.DeptID = dept.DeptID
      WHERE d.DoctorID = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// CREATE doctor
router.post("/", async (req, res) => {
  try {
    const { Name, Email, Password, DeptID, Specialization, Phone } = req.body;

    if (!Name || !Email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const sql = `INSERT INTO Doctor (Name, Email, Password, DeptID, Specialization, Phone) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      Name,
      Email,
      Password || null,
      DeptID || null,
      Specialization || null,
      Phone || null
    ]);

    const [rows] = await pool.query(
      "SELECT * FROM Doctor WHERE DoctorID = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// UPDATE doctor
router.put("/:id", async (req, res) => {
  try {
    const { Name, Email, Password, DeptID, Specialization, Phone } = req.body;
    const doctorId = req.params.id;

    const sql = `UPDATE Doctor 
                 SET Name = COALESCE(?, Name), 
                     Email = COALESCE(?, Email), 
                     Password = COALESCE(?, Password),
                     DeptID = COALESCE(?, DeptID),
                     Specialization = COALESCE(?, Specialization),
                     Phone = COALESCE(?, Phone)
                 WHERE DoctorID = ?`;

    await pool.query(sql, [Name, Email, Password, DeptID, Specialization, Phone, doctorId]);

    const [rows] = await pool.query(
      "SELECT * FROM Doctor WHERE DoctorID = ?",
      [doctorId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// DELETE doctor
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM Doctor WHERE DoctorID = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// Doctor login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [rows] = await pool.query(
      "SELECT DoctorID, Name, Email, DeptID, Specialization, Phone FROM Doctor WHERE Email = ? AND Password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      doctor: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// GET doctor's appointments
router.get("/:id/appointments", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const today = req.query.today === 'true';

    let sql = `
      SELECT a.*, p.Name AS PatientName, p.Age, p.Gender, p.Phone AS PatientPhone,
             d.Name AS DeptName, r.RoomNo
      FROM Appointment a
      JOIN Patient p ON a.PatientID = p.PatientID
      JOIN Department d ON a.DeptID = d.DeptID
      LEFT JOIN Room r ON a.RoomID = r.RoomID
      WHERE a.DoctorID = ?
    `;

    if (today) {
      sql += ` AND a.AppDate = CURDATE()`;
    }

    sql += ` ORDER BY a.AppDate, a.AppTime`;

    const [rows] = await pool.query(sql, [doctorId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
