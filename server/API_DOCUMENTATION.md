# Hospital Management System - Backend API Documentation

## Base URL
`http://localhost:4000`

---

## Authentication Routes (`/api/auth`)

### Register Patient
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 30,
    "gender": "M",
    "phone": "1234567890",
    "address": "123 Main St"
  }
  ```
- **Response:** Patient object with PatientID

### Login Patient
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Patient object

---

## Department Routes (`/api/departments`)

### Get All Departments
- **GET** `/api/departments`
- **Response:** Array of departments

### Get Remaining Slots for a Date
- **GET** `/api/departments/:id/remaining?date=YYYY-MM-DD`
- **Response:**
  ```json
  {
    "deptId": 1,
    "date": "2025-11-18",
    "limit": 10,
    "used": 3,
    "remaining": 7
  }
  ```

### Get Available Dates with Slots
- **GET** `/api/departments/:id/available-dates?start=YYYY-MM-DD&end=YYYY-MM-DD`
- **Response:** Array of dates with remaining slots > 0
  ```json
  [
    {
      "date": "2025-11-18",
      "remaining": 7,
      "limit": 10
    }
  ]
  ```

---

## Appointment Routes (`/api/appointments`)

### Get All Appointments
- **GET** `/api/appointments`
- **Response:** Array of appointments with patient, department, and room details

### Create Appointment
- **POST** `/api/appointments`
- **Body:**
  ```json
  {
    "PatientID": 1,
    "DeptID": 2,
    "AppDate": "2025-11-20",
    "AppTime": "10:00:00",
    "AppointmentType": "NEW"
  }
  ```
- **Response:** Created appointment with room assignment

### Delete Appointment
- **DELETE** `/api/appointments/:id`
- **Response:** Success message

---

## Patient Routes (`/api/patients`)

### Get All Patients
- **GET** `/api/patients`
- **Response:** Array of all patients

### Get Patient by ID
- **GET** `/api/patients/:id`
- **Response:** Patient object

### Get Patient's Appointments
- **GET** `/api/patients/:id/appointments?future=true`
- **Query Params:**
  - `future=true` - Only return future appointments
- **Response:** Array of patient's appointments with department and room details

---

## Doctor Routes (`/api/doctors`)

### Get All Doctors
- **GET** `/api/doctors`
- **Response:** Array of doctors with department names

### Get Doctor by ID
- **GET** `/api/doctors/:id`
- **Response:** Doctor object with department name

### Create Doctor
- **POST** `/api/doctors`
- **Body:**
  ```json
  {
    "Name": "Dr. Smith",
    "Email": "smith@hospital.com",
    "Password": "password123",
    "DeptID": 1,
    "Specialization": "Cardiology",
    "Phone": "1234567890"
  }
  ```
- **Response:** Created doctor object

### Update Doctor
- **PUT** `/api/doctors/:id`
- **Body:** Partial doctor object (any fields to update)
- **Response:** Updated doctor object

### Delete Doctor
- **DELETE** `/api/doctors/:id`
- **Response:** Success message

### Doctor Login
- **POST** `/api/doctors/login`
- **Body:**
  ```json
  {
    "email": "smith@hospital.com",
    "password": "password123"
  }
  ```
- **Response:** Doctor object

### Get Doctor's Appointments
- **GET** `/api/doctors/:id/appointments?today=true`
- **Query Params:**
  - `today=true` - Only return today's appointments
- **Response:** Array of doctor's appointments with patient details

---

## Room Routes (`/api/rooms`)

### Get All Rooms
- **GET** `/api/rooms`
- **Response:** Array of rooms with department names

### Get Room by ID
- **GET** `/api/rooms/:id`
- **Response:** Room object with department name

### Create Room
- **POST** `/api/rooms`
- **Body:**
  ```json
  {
    "RoomNo": "101",
    "DeptID": 1,
    "Capacity": 2,
    "RoomType": "ICU"
  }
  ```
- **Response:** Created room object

### Update Room
- **PUT** `/api/rooms/:id`
- **Body:** Partial room object (any fields to update)
- **Response:** Updated room object

### Delete Room
- **DELETE** `/api/rooms/:id`
- **Response:** Success message

---

## Admission Routes (`/api/admissions`)
*Routes defined but implementation needed*

---

## Billing Routes (`/api/billing`)
*Routes defined but implementation needed*

---

## Important Notes

1. **Appointment Types:** NEW, FOLLOWUP, EMERGENCY
2. **Daily NEW patient limit** is enforced per department through database triggers
3. **Per-patient per-day per-department restriction** is handled by backend
4. **Emergency appointments** can override the daily limit
5. **Follow-up appointments** are unlimited
6. **Room balancing** is handled automatically via database triggers
7. **Max date allowed:** 30 days from today
8. All dates should be in `YYYY-MM-DD` format
9. All times should be in `HH:MM:SS` format

---

## Running the Backend

```bash
cd server
npm install
node server.js
```

Server will run on `http://localhost:4000`
