const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTES
const appointmentsRouter = require("./routes/appointments");
const departmentsRouter = require("./routes/departments");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const roomsRouter = require("./routes/rooms");
const admissionsRouter = require("./routes/admissions");
const billingRouter = require("./routes/billing");

app.use("/api/appointments", appointmentsRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/admissions", admissionsRouter);
app.use("/api/billing", billingRouter);

app.get("/", (req, res) => {
  res.send("Hospital Management API is running");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
