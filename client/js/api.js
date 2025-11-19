// API Configuration
const API_BASE_URL = 'http://localhost:4000/api';

// API Helper Functions
const api = {
  // Authentication
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  },

  // Departments
  async getDepartments() {
    const response = await fetch(`${API_BASE_URL}/departments`);
    return await response.json();
  },

  async getRemainingSlots(deptId, date) {
    const response = await fetch(`${API_BASE_URL}/departments/${deptId}/remaining?date=${date}`);
    return await response.json();
  },

  async getAvailableDates(deptId, start, end) {
    const response = await fetch(`${API_BASE_URL}/departments/${deptId}/available-dates?start=${start}&end=${end}`);
    return await response.json();
  },

  // Appointments
  async getAppointments() {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    return await response.json();
  },

  async createAppointment(appointmentData) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create appointment');
    }
    return await response.json();
  },

  async deleteAppointment(appointmentId) {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE'
    });
    return await response.json();
  },

  // Patients
  async getPatients() {
    const response = await fetch(`${API_BASE_URL}/patients`);
    return await response.json();
  },

  async getPatient(patientId) {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
    return await response.json();
  },

  async getPatientAppointments(patientId, futureOnly = false) {
    const url = futureOnly 
      ? `${API_BASE_URL}/patients/${patientId}/appointments?future=true`
      : `${API_BASE_URL}/patients/${patientId}/appointments`;
    const response = await fetch(url);
    return await response.json();
  },

  // Doctors
  async getDoctors() {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    return await response.json();
  },

  async getDoctor(doctorId) {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
    return await response.json();
  },

  async createDoctor(doctorData) {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData)
    });
    return await response.json();
  },

  async updateDoctor(doctorId, doctorData) {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData)
    });
    return await response.json();
  },

  async deleteDoctor(doctorId) {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: 'DELETE'
    });
    return await response.json();
  },

  async doctorLogin(credentials) {
    const response = await fetch(`${API_BASE_URL}/doctors/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  },

  async getDoctorAppointments(doctorId, todayOnly = false) {
    const url = todayOnly
      ? `${API_BASE_URL}/doctors/${doctorId}/appointments?today=true`
      : `${API_BASE_URL}/doctors/${doctorId}/appointments`;
    const response = await fetch(url);
    return await response.json();
  },

  // Rooms
  async getRooms() {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    return await response.json();
  },

  async getRoom(roomId) {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
    return await response.json();
  },

  async createRoom(roomData) {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    return await response.json();
  },

  async updateRoom(roomId, roomData) {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    return await response.json();
  },

  async deleteRoom(roomId) {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};

// Utility Functions
const utils = {
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  },

  formatTime(timeString) {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  },

  formatDateTime(dateString, timeString) {
    return `${this.formatDate(dateString)} at ${this.formatTime(timeString)}`;
  },

  getTodayDate() {
    return new Date().toISOString().split('T')[0];
  },

  getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  },

  showAlert(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const alertClass = type === 'error' ? 'alert-error' : 
                       type === 'warning' ? 'alert-warning' : 
                       type === 'info' ? 'alert-info' : 'alert-success';

    container.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
    
    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  },

  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="spinner"></div><p class="mt-2">Loading...</p></div>';
    }
  },

  hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  }
};
