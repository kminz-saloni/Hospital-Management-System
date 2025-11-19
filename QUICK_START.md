# 🚀 Quick Start Guide - Hospital Management System

## ⚡ Get Up and Running in 5 Minutes!

---

## Step 1: Start the Backend (1 minute)

```bash
cd server
npm install
node server.js
```

**Expected Output:**
```
🚀 Server running on port 4000
```

**If you see errors:**
- Check MySQL is running
- Update password in `server/db.js`
- Ensure database `hospital_db` exists

---

## Step 2: Start the Frontend (1 minute)

### Option A: VS Code Live Server (Recommended)
1. Open VS Code
2. Install "Live Server" extension
3. Right-click `client/index.html`
4. Click "Open with Live Server"

### Option B: Command Line
```bash
cd client
npx http-server -p 8080
```

**Frontend will open at:** `http://localhost:8080`

---

## Step 3: Test the System (3 minutes)

### 3.1 Register a Patient
1. Click "Register" on homepage
2. Fill in the form:
   - Name: John Doe
   - Email: john@test.com
   - Password: test123
3. Click "Register"
4. You'll be redirected to Patient Dashboard

### 3.2 Login as Admin
1. Go back to homepage → Click "Login"
2. Click "Admin" tab
3. Enter credentials:
   - Email: `admin@hospital.com`
   - Password: `admin123`
4. You'll see Admin Dashboard

### 3.3 Add a Doctor (Admin)
1. In Admin Dashboard, click "Doctors" tab
2. Click "+ Add Doctor"
3. Fill in form:
   - Name: Dr. Smith
   - Email: smith@hospital.com
   - Password: doctor123
   - Specialization: Cardiology
4. Click "Add Doctor"

### 3.4 Add a Room (Admin)
1. Click "Rooms" tab
2. Click "+ Add Room"
3. Fill in form:
   - Room No: 101
   - Select Department
   - Capacity: 2
   - Type: General
4. Click "Add Room"

### 3.5 Book an Appointment (Patient)
1. Logout from admin
2. Login as patient (john@test.com / test123)
3. Select a Department
4. Choose an available date
5. Select appointment type (NEW/FOLLOWUP/EMERGENCY)
6. Click "Book Appointment"
7. See your appointment with Room Number!

### 3.6 Test Doctor Dashboard
1. Logout
2. Login as Doctor (smith@hospital.com / doctor123)
3. View today's appointments
4. Click "Upcoming" to see all future appointments
5. Click "View" to see patient details

---

## 🎯 Quick Feature Test Checklist

### Patient Features:
- [ ] Register new account
- [ ] Login successfully
- [ ] View departments
- [ ] See available dates (only dates with slots)
- [ ] Check remaining slots (updates every 6 seconds)
- [ ] Book NEW appointment
- [ ] Book FOLLOWUP appointment
- [ ] Book EMERGENCY appointment
- [ ] View upcoming appointments
- [ ] Cancel appointment

### Doctor Features:
- [ ] Login successfully
- [ ] View today's appointments
- [ ] View all upcoming appointments
- [ ] Check patient details
- [ ] See appointment types (color-coded)
- [ ] View room assignments
- [ ] Auto-refresh works (wait 30 seconds)

### Admin Features:
- [ ] Login successfully
- [ ] View statistics (departments, doctors, rooms, appointments)
- [ ] See all departments
- [ ] Check remaining slots for today
- [ ] Add new doctor
- [ ] Delete doctor
- [ ] Add new room
- [ ] Delete room
- [ ] View all appointments
- [ ] View all patients

---

## 🔧 Common Issues & Solutions

### Issue: "Cannot connect to server"
**Solution:** Make sure backend is running on port 4000
```bash
cd server
node server.js
```

### Issue: "Database error"
**Solution:** Check MySQL connection in `server/db.js`
```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",  // Update this!
  database: "hospital_db"
});
```

### Issue: "No departments showing"
**Solution:** Add departments to your database
```sql
INSERT INTO Department (Name, DailyNewLimit) VALUES 
('Cardiology', 10),
('Neurology', 8),
('Pediatrics', 12);
```

### Issue: "Can't book appointment"
**Solution:** 
1. Make sure department has available slots
2. Check database triggers are set up
3. Verify date is within 30 days

### Issue: "Login not working"
**Solution:**
- Patient: Register first, then login
- Doctor: Add doctor via admin panel first
- Admin: Use admin@hospital.com / admin123

---

## 📋 Sample Data to Insert

### Departments:
```sql
INSERT INTO Department (Name, DailyNewLimit) VALUES 
('Cardiology', 10),
('Neurology', 8),
('Pediatrics', 12),
('Orthopedics', 15),
('General Medicine', 20);
```

### Sample Doctor (via Admin Panel):
- Name: Dr. Sarah Johnson
- Email: sarah@hospital.com
- Password: doctor123
- Department: Cardiology
- Specialization: Heart Specialist
- Phone: 555-0101

### Sample Room (via Admin Panel):
- Room No: 101, 102, 103, 201, 202
- Departments: Assign to various departments
- Capacity: 1-4
- Types: ICU, General, Private

---

## 🎨 Pages to Explore

1. **Landing Page:** `http://localhost:8080/index.html`
2. **Learn More:** `http://localhost:8080/pages/learn-more.html`
3. **Register:** `http://localhost:8080/pages/register.html`
4. **Login:** `http://localhost:8080/pages/login.html`
5. **Patient Dashboard:** `http://localhost:8080/pages/patient_dashboard.html`
6. **Doctor Dashboard:** `http://localhost:8080/pages/doctor_dashboard.html`
7. **Admin Dashboard:** `http://localhost:8080/pages/admin_dashboard.html`

---

## 📊 Test Scenarios

### Scenario 1: Patient Journey
```
1. Register → john@test.com
2. Login as patient
3. Select "Cardiology"
4. Pick tomorrow's date
5. Choose "NEW" type
6. Book appointment
7. See confirmation with Room Number
8. Check "Upcoming Appointments" table
```

### Scenario 2: Doctor's Day
```
1. Login as doctor
2. View today's schedule (should show 0 initially)
3. Book appointments as patient
4. Refresh doctor dashboard
5. See appointments appear
6. Click "View" to see patient details
```

### Scenario 3: Admin Management
```
1. Login as admin
2. Check statistics
3. Add 3 new doctors
4. Add 5 new rooms
5. View all appointments
6. Check department slots
7. View registered patients
```

---

## 🔄 Real-time Features to Test

### Patient Dashboard:
1. Book appointment for a date
2. Open in another tab
3. Book another appointment (same dept, same date)
4. Go back to first tab
5. **Watch slot counter decrease automatically** (6 seconds)

### Doctor Dashboard:
1. Login as doctor
2. Leave page open
3. Book appointment as patient (different tab)
4. **Watch appointments appear automatically** (30 seconds)

---

## 💡 Pro Tips

1. **Multiple Browsers:** Test patient + doctor simultaneously
2. **Console Open:** Check for any JavaScript errors
3. **Network Tab:** Monitor API calls
4. **Clear Storage:** `localStorage.clear()` to reset login
5. **Refresh Often:** Ensure latest data displays

---

## 🎯 Success Criteria

You've successfully set up the system when you can:

✅ Register and login as patient
✅ See departments and available dates
✅ Book appointment and get room number
✅ Login as doctor and see appointments
✅ Login as admin and manage data
✅ All real-time features work
✅ No errors in console
✅ API calls succeed (check Network tab)

---

## 📞 Need Help?

**Check these files:**
1. `README_FRONTEND.md` - Complete setup guide
2. `API_DOCUMENTATION.md` - API reference
3. `IMPLEMENTATION_SUMMARY.md` - Feature list
4. `VISUAL_GUIDE.md` - UI/UX overview

**Common Commands:**
```bash
# Start backend
cd server && node server.js

# Start frontend
cd client && npx http-server -p 8080

# Check MySQL
mysql -u root -p

# Clear localStorage (browser console)
localStorage.clear()
```

---

## 🎉 You're All Set!

The Hospital Management System is now running. Explore all features and enjoy the modern, responsive interface!

**Happy Healthcare Managing! 🏥**
