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

// GET available dates with remaining slots > 0
router.get("/:id/available-dates", async (req, res) => {
  try {
    const deptId = req.params.id;
    const start = req.query.start;
    const end = req.query.end;

    // Validate department exists
    const [[dept]] = await pool.query(
      "SELECT DailyNewLimit FROM Department WHERE DeptID = ?",
      [deptId]
    );
    if (!dept) {
      return res.status(404).json({ error: "Department not found" });
    }

    const dailyLimit = dept.DailyNewLimit;

    // Generate date range (default: today to 30 days from now)
    const startDate = start ? new Date(start) : new Date();
    const endDate = end ? new Date(end) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const availableDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().slice(0, 10);

      // Count appointments for this date
      const [[{ used }]] = await pool.query(
        `SELECT COUNT(*) AS used FROM Appointment
         WHERE DeptID = ? AND AppDate = ? AND AppointmentType = 'NEW'`,
        [deptId, dateStr]
      );

      const remaining = dailyLimit - used;

      if (remaining > 0) {
        availableDates.push({
          date: dateStr,
          remaining: remaining,
          limit: dailyLimit
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json(availableDates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;

