const loginBtn = document.getElementById("login-mainBtn");

/*
user = {
  "logged_in": True,
  "role": "user"
}
*/

async function loadUserRole() {
  const response = await fetch("/api/current_user");
  const user = await response.json();
  if (user.logged_in) {
    if (user.role === "admin") admin_setup();
    else if (user.role === "user") user_setup();
  } else {
    document.querySelector(".no-sign").hidden = false;
  }
}

function admin_setup(){
  document.querySelectorAll(".admin-nav").forEach(item =>
  item.hidden = false );
  loginBtn.hidden = true;
}

function user_setup(){
  document.querySelectorAll(".user-nav").forEach(item =>
  item.hidden = false);
  loginBtn.hidden = true;
}


loadUserRole();