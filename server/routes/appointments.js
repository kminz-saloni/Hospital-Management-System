const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.Name AS PatientName, d.Name AS DeptName, r.RoomNo
      FROM Appointment a
      JOIN Patient p ON a.PatientID = p.PatientID
      JOIN Department d ON a.DeptID = d.DeptID
      LEFT JOIN Room r ON a.RoomID = r.RoomID
      ORDER BY a.AppDate, a.AppTime
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// CREATE appointment
router.post("/", async (req, res) => {
  try {
    const { PatientID, DeptID, AppDate, AppTime, AppointmentType } = req.body;

    const sql = `INSERT INTO Appointment 
      (PatientID, DeptID, AppDate, AppTime, AppointmentType)
      VALUES (?, ?, ?, ?, ?)`;

    try {
      const [result] = await pool.query(sql, [
        PatientID,
        DeptID,
        AppDate,
        AppTime || null,
        AppointmentType
      ]);

      const [rows] = await pool.query(
        `SELECT a.*, p.Name AS PatientName, r.RoomNo, d.Name AS DeptName
         FROM Appointment a
         JOIN Patient p ON a.PatientID = p.PatientID
         LEFT JOIN Room r ON a.RoomID = r.RoomID
         JOIN Department d ON a.DeptID = d.DeptID
         WHERE a.AppointmentID = ?`,
        [result.insertId]
      );

      res.status(201).json(rows[0]);
    } catch (e) {
      const msg = e.sqlMessage || e.message;
      res.status(400).json({ error: msg });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM Appointment WHERE AppointmentID = ?", [
      req.params.id
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
