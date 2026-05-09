document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("message");
  const toggle = document.getElementById("togglePwd");
  const pwd = document.getElementById("password");

  toggle.addEventListener("click", () => {
    if (pwd.type === "password") {
      pwd.type = "text";
      toggle.textContent = "Hide";
    } else {
      pwd.type = "password";
      toggle.textContent = "Show";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";
    const username = document.getElementById("username").value.trim();
    const password = pwd.value;
    if (username === "student" && password === "student") {
      alert(`Добро пожаловать, ${username}!`);
      window.location.href = "main.html";
    } else {
      msg.textContent = "Неправильный логин или пароль!";
      msg.classList.add("error");
    }
  });
});
