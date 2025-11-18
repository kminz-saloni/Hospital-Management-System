const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET department list
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Department");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// GET remaining daily NEW limits
router.get("/:id/remaining", async (req, res) => {
  try {
    const deptId = req.params.id;
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    const [[limitRow]] = await pool.query(
      "SELECT DailyNewLimit FROM Department WHERE DeptID = ?",
      [deptId]
    );
    if (!limitRow)
      return res.status(404).json({ error: "Department not found" });

    const [[{ used }]] = await pool.query(
      `SELECT COUNT(*) AS used FROM Appointment
       WHERE DeptID = ? AND AppDate = ? AND AppointmentType = 'NEW'`,
      [deptId, date]
    );

    const remaining = limitRow.DailyNewLimit - used;

    res.json({
      deptId: Number(deptId),
      date,
      limit: limitRow.DailyNewLimit,
      used,
      remaining
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;

