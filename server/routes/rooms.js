const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, d.Name AS DeptName 
      FROM Room r
      LEFT JOIN Department d ON r.DeptID = d.DeptID
      ORDER BY r.RoomNo
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// GET room by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, d.Name AS DeptName 
      FROM Room r
      LEFT JOIN Department d ON r.DeptID = d.DeptID
      WHERE r.RoomID = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// CREATE room
router.post("/", async (req, res) => {
  try {
    const { RoomNo, DeptID, Capacity, RoomType } = req.body;

    if (!RoomNo || !DeptID) {
      return res.status(400).json({ error: "RoomNo and DeptID are required" });
    }

    const sql = `INSERT INTO Room (RoomNo, DeptID, Capacity, RoomType) 
                 VALUES (?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      RoomNo,
      DeptID,
      Capacity || null,
      RoomType || null
    ]);

    const [rows] = await pool.query(
      "SELECT * FROM Room WHERE RoomID = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// UPDATE room
router.put("/:id", async (req, res) => {
  try {
    const { RoomNo, DeptID, Capacity, RoomType } = req.body;
    const roomId = req.params.id;

    const sql = `UPDATE Room 
                 SET RoomNo = COALESCE(?, RoomNo), 
                     DeptID = COALESCE(?, DeptID), 
                     Capacity = COALESCE(?, Capacity),
                     RoomType = COALESCE(?, RoomType)
                 WHERE RoomID = ?`;

    await pool.query(sql, [RoomNo, DeptID, Capacity, RoomType, roomId]);

    const [rows] = await pool.query(
      "SELECT * FROM Room WHERE RoomID = ?",
      [roomId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// DELETE room
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM Room WHERE RoomID = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
