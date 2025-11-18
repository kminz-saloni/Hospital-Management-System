var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get, post, del } from "./api.js";
const deptSelect = document.getElementById("deptSelect");
const tableBody = document.querySelector("#table tbody");
const msg = document.getElementById("msg");
function loadDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        const depts = yield get("departments");
        deptSelect.innerHTML = "<option value=''>Select Department</option>";
        depts.forEach(d => {
            deptSelect.innerHTML += `<option value="${d.DeptID}">${d.Name}</option>`;
        });
    });
}
function loadAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        const appts = yield get("appointments");
        tableBody.innerHTML = "";
        appts.forEach(a => {
            tableBody.innerHTML += `
      <tr>
        <td>${a.AppointmentID}</td>
        <td>${a.PatientName}</td>
        <td>${a.DeptName}</td>
        <td>${a.AppDate}</td>
        <td>${a.AppointmentType}</td>
        <td>${a.RoomNo}</td>
        <td><button data-id="${a.AppointmentID}" class="del">❌</button></td>
      </tr>
    `;
        });
        document.querySelectorAll(".del").forEach(btn => {
            btn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                const id = e.target.getAttribute("data-id");
                yield del(`appointments/${id}`);
                loadAppointments();
            }));
        });
    });
}
document.getElementById("form").addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const body = {
        PatientID: Number(document.getElementById("patientId").value),
        DeptID: Number(deptSelect.value),
        AppDate: document.getElementById("date").value,
        AppTime: document.getElementById("time").value || null,
        AppointmentType: document.getElementById("type").value
    };
    try {
        msg.style.color = "green";
        msg.textContent = "Appointment Created!";
        yield post("appointments", body);
        loadAppointments();
    }
    catch (err) {
        msg.style.color = "red";
        msg.textContent = err.error || "Error!";
    }
}));
loadDepartments();
loadAppointments();
