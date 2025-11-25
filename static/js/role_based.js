const loginBtn = document.getElementById("login-mainBtn");

/*async function loadUserRole() {
  const res = await fetch("/api/current_user");
  const user = await res.json();
}*/

let user = {
  logged_in: true,
  role: "user"
}

if (user.logged_in) {
  if (user.role === "admin") admin_setup();
  else if (user.role === "user") user_setup();
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
