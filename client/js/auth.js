// Authentication Helper Functions

// Check if user is logged in
function isLoggedIn() {
  const userType = localStorage.getItem('userType');
  return userType !== null;
}

// Get current user
function getCurrentUser() {
  const userType = localStorage.getItem('userType');
  if (!userType) return null;

  const userDataKey = userType; // 'patient', 'doctor', or 'admin'
  const userData = localStorage.getItem(userDataKey);
  
  return userData ? JSON.parse(userData) : null;
}

// Get user type
function getUserType() {
  return localStorage.getItem('userType');
}

// Logout function
function logout() {
  localStorage.removeItem('patient');
  localStorage.removeItem('doctor');
  localStorage.removeItem('admin');
  localStorage.removeItem('userType');
  window.location.href = '../index.html';
}

// Protect page (redirect if not logged in)
function protectPage(requiredUserType = null) {
  const userType = getUserType();
  
  if (!userType) {
    window.location.href = 'login.html';
    return false;
  }

  if (requiredUserType && userType !== requiredUserType) {
    alert('Unauthorized access');
    window.location.href = 'login.html';
    return false;
  }

  return true;
}

// Get patient info
function getPatientInfo() {
  const patient = localStorage.getItem('patient');
  return patient ? JSON.parse(patient) : null;
}

// Get doctor info
function getDoctorInfo() {
  const doctor = localStorage.getItem('doctor');
  return doctor ? JSON.parse(doctor) : null;
}

// Get admin info
function getAdminInfo() {
  const admin = localStorage.getItem('admin');
  return admin ? JSON.parse(admin) : null;
}

// Update user info in localStorage
function updateUserInfo(userType, userData) {
  localStorage.setItem(userType, JSON.stringify(userData));
}
