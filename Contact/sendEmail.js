
// Function to send the email
function sendMail() {
  const params = {
    name: document.querySelector('[name="name"]').value,
    email: document.querySelector('[name="email"]').value,
    phone: document.querySelector('[name="phone"]').value,
    eventType: document.querySelector('[name="eventType"]').value,
    eventDate: document.querySelector('[name="eventDate"]').value,
    guests: document.querySelector('[name="guests"]').value,
    message: document.querySelector('[name="message"]').value
  };

  emailjs.send("service_7p41ak4", "template_y7u65it", params)
    .then(function () {
      // Success feedback
      document.getElementById("contact-form-content").style.display = "none";
      document.getElementById("success-message").classList.remove("hidden");
    })
    .catch(function (error) {
      alert("Failed to send message. Please try again.\n" + JSON.stringify(error));
    });
}
