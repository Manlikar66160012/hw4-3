document.addEventListener("DOMContentLoaded", () => {
    loadAppointments();
});

function createAppointment() {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;

    if (!title || !date || !startTime || !endTime) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let newAppointment = {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        status: "confirmed"
    };

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    loadAppointments();
}

function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = "";

    appointments.forEach((appointment, index) => {
        let row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${appointment.title}</td>
            <td>${appointment.date}</td>
            <td>${appointment.startTime} - ${appointment.endTime}</td>
            <td class="${appointment.status === 'cancelled' ? 'cancelled' : ''}">
                ${appointment.status === 'cancelled' ? '❌ cancelled' : '✅ confirmed'}
            </td>
            <td>
                <button class="cancel-btn" onclick="cancelAppointment(${appointment.id})">❌ ยกเลิก</button>
            </td>
        `;

        appointmentList.appendChild(row);
    });
}

function cancelAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let updatedAppointments = appointments.map(app => {
        if (app.id === id) {
            return { ...app, status: "cancelled" };
        }
        return app;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    loadAppointments();
}
