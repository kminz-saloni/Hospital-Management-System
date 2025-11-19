# 🏥 Hospital Management System - Frontend & Backend

A complete, modern Hospital Management System built with **HTML, CSS, Vanilla JavaScript** for the frontend and **Node.js + Express + MySQL** for the backend.

---

## 📋 Features

### For Patients:
- ✅ Register and Login
- ✅ Browse departments and available dates
- ✅ Book appointments with automatic room allocation
- ✅ View upcoming appointments
- ✅ Cancel appointments
- ✅ Real-time slot availability updates (every 6 seconds)

### For Doctors:
- ✅ Secure login
- ✅ View today's appointments
- ✅ View all upcoming appointments
- ✅ Access patient details
- ✅ Auto-refresh appointments (every 30 seconds)

### For Admins:
- ✅ Dashboard with statistics
- ✅ Manage departments
- ✅ Add, view, and delete doctors
- ✅ Add, view, and delete rooms
- ✅ View all appointments
- ✅ View all patients
- ✅ Check daily slot availability

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- A web browser
- A code editor (optional)

### 1. Database Setup

First, create the MySQL database and tables. Connect to MySQL:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE hospital_db;
USE hospital_db;

-- Create tables (Department, Patient, Doctor, Room, Appointment, etc.)
-- Import your existing database schema
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Configure database connection in `server/db.js`:

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",  // Change this
  database: "hospital_db"
});
```

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:4000`

### 3. Frontend Setup

The frontend is pure HTML/CSS/JavaScript, so you can run it with:

#### Option A: Using Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Open the `client` folder
3. Right-click on `index.html`
4. Select "Open with Live Server"

#### Option B: Using http-server (npm package)
```bash
cd client
npx http-server -p 8080
```

#### Option C: Using Python
```bash
cd client
python -m http.server 8080
```

The frontend will be available at `http://localhost:8080` (or the port you specified)

---

## 🔐 Login Credentials

### Admin Login:
- Email: `admin@hospital.com`
- Password: `admin123`

### Doctor Login:
- Use any doctor credentials from your database
- Or create a new doctor through the admin dashboard

### Patient Login:
- Register a new account on the registration page
- Or use existing patient credentials

---

## 📁 Project Structure

```
Hospital-Management-System/
│
├── client/                          # Frontend
│   ├── index.html                   # Landing page
│   ├── css/
│   │   └── main.css                # Global styles
│   ├── js/
│   │   ├── api.js                  # API helper functions
│   │   └── auth.js                 # Authentication helpers
│   └── pages/
│       ├── login.html              # Login page (Patient/Doctor/Admin)
│       ├── register.html           # Patient registration
│       ├── learn-more.html         # About page
│       ├── patient_dashboard.html  # Patient dashboard
│       ├── doctor_dashboard.html   # Doctor dashboard
│       └── admin_dashboard.html    # Admin dashboard
│
└── server/                          # Backend
    ├── server.js                    # Main server file
    ├── db.js                        # Database configuration
    ├── package.json                 # Dependencies
    └── routes/
        ├── auth.js                  # Authentication routes
        ├── appointments.js          # Appointment management
        ├── departments.js           # Department operations
        ├── patients.js              # Patient operations
        ├── doctors.js               # Doctor CRUD
        ├── rooms.js                 # Room management
        ├── admissions.js            # Admission routes
        └── billing.js               # Billing routes
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register patient
- `POST /api/auth/login` - Patient login
- `POST /api/doctors/login` - Doctor login

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id/remaining?date=YYYY-MM-DD` - Get remaining slots
- `GET /api/departments/:id/available-dates?start=YYYY-MM-DD&end=YYYY-MM-DD` - Get available dates

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/patients/:id/appointments?future=true` - Get patient's appointments

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor
- `GET /api/doctors/:id/appointments?today=true` - Get doctor's appointments

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

For complete API documentation, see `server/API_DOCUMENTATION.md`

---

## 🎨 Design Features

- **Modern UI**: Clean, professional healthcare design
- **Responsive**: Works on desktop, tablet, and mobile
- **Color Scheme**: Blue and white theme with accent colors
- **Animations**: Smooth transitions and hover effects
- **Real-time Updates**: Slot availability refreshes automatically
- **User-Friendly**: Intuitive navigation and clear feedback

---

## 🔧 Configuration

### Backend Port
To change the backend port, edit `server/server.js`:
```javascript
const PORT = 4000; // Change this
```

### Frontend API URL
To change the API URL, edit `client/js/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:4000/api'; // Change this
```

---

## 📝 Important Notes

1. **Daily NEW patient limit** is enforced per department through database triggers
2. **Per-patient per-day per-department restriction** prevents duplicate bookings
3. **Emergency appointments** can override the daily limit
4. **Follow-up appointments** are unlimited
5. **Room allocation** happens automatically via database triggers
6. **Maximum booking window** is 30 days from today
7. Only dates with available slots are shown in the dropdown

---

## 🐛 Troubleshooting

### Backend won't start:
- Check if MySQL is running
- Verify database credentials in `db.js`
- Ensure port 4000 is not in use

### Frontend shows network errors:
- Make sure backend is running on port 4000
- Check CORS settings in `server.js`
- Verify API_BASE_URL in `api.js`

### Can't book appointments:
- Check if department has remaining slots
- Verify database triggers are set up
- Check browser console for errors

---

## 🚀 Development

### Adding New Features:
1. Backend: Add route in `server/routes/`
2. Frontend: Add API function in `client/js/api.js`
3. Update UI in respective dashboard HTML file

### Styling:
- Global styles: `client/css/main.css`
- Component styles: Inline `<style>` tags in HTML files

---

## 📦 Dependencies

### Backend:
- express - Web framework
- mysql2 - MySQL driver
- cors - CORS middleware
- body-parser - Request body parsing

### Frontend:
- No external dependencies! Pure vanilla JavaScript

---

## 🎯 Future Enhancements

- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] Video consultation
- [ ] Medical records management
- [ ] Prescription management
- [ ] Billing and payments
- [ ] Advanced reporting and analytics
- [ ] Doctor availability calendar

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **Patient** | Register, Login, Book appointments, View appointments, Cancel appointments |
| **Doctor** | Login, View appointments, View patient details, Auto-refresh schedule |
| **Admin** | Manage departments, doctors, rooms, View all data, System statistics |

---

## 🔒 Security Notes

⚠️ **This is a demonstration project. For production use:**
- Implement proper password hashing (bcrypt)
- Add JWT authentication
- Use environment variables for sensitive data
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS
- Implement proper session management

---

## 📄 License

This project is open source and available for educational purposes.

---

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify database setup

---

## 🎉 Credits

Built with ❤️ using modern web technologies for efficient hospital management.

---

**Happy Healthcare Management! 🏥**
