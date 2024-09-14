document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const thankYouMessage = document.getElementById("thank-you");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = "none";
          thankYouMessage.style.display = "block";
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem submitting your form");
      });
  });
});
