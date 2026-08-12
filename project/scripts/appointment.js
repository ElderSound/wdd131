/* ---------------- DOM REFERENCES ---------------- */

const appointmentForm = document.querySelector("#appointment-form");

const appointmentDate = document.querySelector("#appointment-date");

const appointmentConfirmation = document.querySelector(
  "#appointment-confirmation",
);

const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

const serviceError = document.querySelector("#service-error");

const phoneInput = document.querySelector("#phone");

/* ---------------- FUNCTIONS ---------------- */

function setMinimumDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = `${today.getMonth() + 1}`.padStart(2, "0");

  const day = `${today.getDate()}`.padStart(2, "0");

  const minimumDate = `${year}-${month}-${day}`;

  appointmentDate.min = minimumDate;
}

function formatAppointmentDate(dateValue) {
  const [year, month, day] = dateValue.split("-");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function saveAppointment(appointment) {
  localStorage.setItem("appointmentRequest", JSON.stringify(appointment));
}

function displayConfirmation(appointment) {
  appointmentConfirmation.innerHTML = `
    <h3>Appointment Request Received</h3>

    <p>
      Thank you, <strong>${appointment.fullName}</strong>.
    </p>

    <p>
      You requested an appointment for
      <strong>${appointment.services.join(", ")}</strong>
      on
      <strong>${formatAppointmentDate(appointment.date)}</strong>
      at
      <strong>${appointment.time}</strong>.
    </p>

    <p>
      A confirmation can be sent to
      <strong>${appointment.email}</strong>.
    </p>
  `;

  appointmentConfirmation.hidden = false;
}

function handleAppointmentSubmit(event) {
  event.preventDefault();

  const formData = new FormData(appointmentForm);

  const selectedServices = Array.from(serviceCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (selectedServices.length === 0) {
    serviceError.textContent = `Please select at least one dental service.`;

    return;
  }

  serviceError.textContent = ``;

  const appointment = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    services: selectedServices,
    date: formData.get("appointmentDate"),
    time: formData.get("appointmentTime"),
    message: formData.get("message"),
  };

  if (!appointment.date) {
    return;
  }

  saveAppointment(appointment);

  displayConfirmation(appointment);

  appointmentForm.reset();

  setMinimumDate();

  appointmentConfirmation.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

/* ---------------- EVENT LISTENERS ---------------- */

appointmentForm.addEventListener("submit", handleAppointmentSubmit);

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
});

/* ---------------- INITIALIZATION ---------------- */

setMinimumDate();
