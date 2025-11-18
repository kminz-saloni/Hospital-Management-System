import { get, post, del } from "./api.js";

const deptSelect = document.getElementById("deptSelect") as HTMLSelectElement;
const tableBody = document.querySelector("#table tbody") as HTMLTableSectionElement;
const msg = document.getElementById("msg") as HTMLParagraphElement;

async function loadDepartments() {
  const depts = await get<any[]>("departments");
  deptSelect.innerHTML = "<option value=''>Select Department</option>";

  depts.forEach(d => {
    deptSelect.innerHTML += `<option value="${d.DeptID}">${d.Name}</option>`;
  });
}

async function loadAppointments() {
  const appts = await get<any[]>("appointments");
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
    btn.addEventListener("click", async (e) => {
      const id = (e.target as HTMLElement).getAttribute("data-id");
      await del(`appointments/${id}`);
      loadAppointments();
    });
  });
}

document.getElementById("form")!.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    PatientID: Number((document.getElementById("patientId") as HTMLInputElement).value),
    DeptID: Number(deptSelect.value),
    AppDate: (document.getElementById("date") as HTMLInputElement).value,
    AppTime: (document.getElementById("time") as HTMLInputElement).value || null,
    AppointmentType: (document.getElementById("type") as HTMLSelectElement).value
  };

  try {
    msg.style.color = "green";
    msg.textContent = "Appointment Created!";
    await post("appointments", body);
    loadAppointments();
  } catch (err: any) {
    msg.style.color = "red";
    msg.textContent = err.error || "Error!";
  }
});

loadDepartments();
loadAppointments();
