const loginForm = document.getElementById("LoginForm");
const invalidUser = document.getElementById("userInvalid");

//respond:
//{"valid": True, "redirect": url_for("home")}
//{"valid": False}

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
        event.stopPropagation()
        loginForm.classList.add("was-validated");
    } else {
        loginForm.classList.remove("was-validated");
        const formData = new FormData(loginForm);
        const response = await fetch("/login", {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        if (data.valid)  window.location.href = data.redirect;
        else invalidUser.hidden = false;
    }
});


