const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all patients
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT PatientID, Name, Email, Age, Gender, Phone, Address FROM Patient"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// GET patient by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT PatientID, Name, Email, Age, Gender, Phone, Address FROM Patient WHERE PatientID = ?",
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// GET patient's appointments
router.get("/:id/appointments", async (req, res) => {
  try {
    const patientId = req.params.id;
    const future = req.query.future === 'true';

    let sql = `
      SELECT a.*, d.Name AS DeptName, r.RoomNo, doc.Name AS DoctorName
      FROM Appointment a
      JOIN Department d ON a.DeptID = d.DeptID
      LEFT JOIN Room r ON a.RoomID = r.RoomID
      LEFT JOIN Doctor doc ON a.DoctorID = doc.DoctorID
      WHERE a.PatientID = ?
    `;

    if (future) {
      sql += ` AND a.AppDate >= CURDATE()`;
    }

    sql += ` ORDER BY a.AppDate, a.AppTime`;

    const [rows] = await pool.query(sql, [patientId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
