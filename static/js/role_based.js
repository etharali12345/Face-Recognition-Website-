const loginBtn = document.getElementById("login-mainBtn");

function setupUI(user){
  if(user.role === "admin"){
    document.querySelectorAll(".admin-nav").forEach(item => item.hidden = false );
  } else if(user.role === "user"){
    document.querySelectorAll(".user-nav").forEach(item => item.hidden = false);
  } 
}

document.addEventListener("DOMContentLoaded", () => {
  const userData = sessionStorage.getItem("user");

  if(userData){
    const user = JSON.parse(userData);
    setupUI(user);
  } else {
    loginBtn.hidden = false;
  }
});