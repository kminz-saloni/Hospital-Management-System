I am building a full Hospital Management System frontend in HTML + CSS + JavaScript (no frameworks). 
The backend is already fully completed in Node.js + Express + MySQL, and I will upload the backend folder to GitHub. 
You must generate the COMPLETE frontend using the existing backend APIs from my repository.

Here are the exact requirements you MUST follow:

============================
🔵 BACKEND INFORMATION  
============================
I already have a working backend with routes:

AUTH:
- POST /api/auth/register
- POST /api/auth/login

DEPARTMENTS:
- GET /api/departments
- GET /api/departments/:id/remaining?date=YYYY-MM-DD
- GET /api/departments/:id/available-dates?start=YYYY-MM-DD&end=YYYY-MM-DD

APPOINTMENTS:
- GET /api/appointments
- POST /api/appointments
- DELETE /api/appointments/:id

PATIENT APPOINTMENTS:
- GET /api/patients/:id/appointments?future=true

All backend logic includes:
- Daily NEW patient limit per department (tokens)
- Per-patient per-day per-department restriction
- Emergency override
- Follow-up unlimited
- Auto room balancing using triggers
- Only dates with remaining slots are shown
- Max date allowed = 30 days from today

============================
🔵 FRONTEND REQUIREMENTS  
============================

📌 General
• Must use only HTML, CSS, and Vanilla JavaScript.
• Must fetch data from backend using fetch() with the routes above.
• Must be responsive and attractive (modern UI with cards, shadows, rounded corners).
• Must organize frontend files as:
  /client
      /pages
      /css
      /js
      /assets

📌 Pages required:
1. Landing Page (index.html)
   • Two main buttons: Login, Register
   • One “Learn More” link/page

2. Patient Registration Page
   • Fields: name, email, password, age, gender, phone, address
   • After register → redirect to patient dashboard
   • Use /api/auth/register

3. Patient Login Page
   • Login using email + password
   • After login → redirect to patient dashboard
   • Use /api/auth/login

4. Learn More Page
   • Simple modern informational page

5. Patient Dashboard (user_dashboard.html)
   • Display “Welcome, {patientName}”
   • Department dropdown (GET /api/departments)
   • When department selected:
       → Show available dates (GET available-dates)
       → Only show dates with remaining > 0
       → Only dates from today to next 30 days
   • After selecting a date:
       → Show remaining tokens for that date (refresh every 6 seconds)
   • Input optional appointment time
   • Book appointment button
       → Use POST /api/appointments
       → After booking show: appointment ID, date, time, room number
   • Below, show “Your future appointments”
       → Use GET /api/patients/:id/appointments?future=true

============================
🔵 ADMIN DASHBOARD REQUIREMENTS
============================
Create an admin dashboard page with:
• Department list
• Add/View/Delete doctors
• Add/View rooms
• View all appointments (table)
• Show remaining tokens for each department today
• Graphical/visual representation optional (simple is okay)
• All admin data must use the SAME backend (don't create new routes)
• For doctors, read from Doctors table (CRUD through backend endpoints I already have or create placeholder functions if needed)
• Use same HTML/CSS/JS structure

============================
🔵 DOCTOR DASHBOARD REQUIREMENTS
============================
Create a doctor dashboard page with:
• Doctor login (email + password OR ID-based simple login)
• Doctor sees:
   - Today’s appointments assigned to them
   - Patient details
   - Room number
   - Appointment type (NEW / FOLLOWUP / EMERGENCY)
• Doctor can mark a patient as “Seen”
• Doctor can view upcoming appointments
• Works with same backend without modifying the backend logic
• You may create new frontend-only JS helpers but NO new server APIs

============================
🔵 DESIGN REQUIREMENTS
============================
• Attractive, modern, minimalistic UI (similar to healthcare web apps)
• Blue/white color theme
• Soft shadows, rounded corners
• Animated hover effects
• Use reusable components (header, navbar, card etc.)
• Mobile-friendly layout

============================
🔵 DELIVERABLES FROM COPILOT
============================
You must generate:

1. Full folder structure for frontend  
2. All HTML pages  
3. Full CSS styling (professional quality)  
4. All JS files:
   - auth.js
   - api.js
   - user_dashboard.js
   - doctor_dashboard.js
   - admin_dashboard.js
   - appointments.js (for admins)
5. Support code for fetching data from backend routes
6. Realtime token updates using /remaining API
7. A clean JSON-like structure at the end summarizing all files created

============================
🔵 IMPORTANT
============================
• Do NOT modify backend logic. Use existing endpoints only.
• Do NOT use React or frameworks.
• Everything must run with “Live Server” or http-server.
• All appointment restrictions are handled by backend triggers; frontend just displays errors.

============================
🔵 TASK
============================
Now generate the FULL frontend code (all HTML, CSS, JS) using the above requirements. Write clean, structured, readable code with comments.
Also generate a short README explaining how to run the frontend and backend together.

