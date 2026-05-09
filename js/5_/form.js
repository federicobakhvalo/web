document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.getElementById("showBtn");
  const openDefault = document.getElementById("openDefault");
  const note = document.getElementById("note");
  const frame = document.getElementById("contentFrame");

  function openTask(folder) {
    // expect folder like "1_" or "2_" etc.
    // folders are siblings of the current folder -> go up one level

    if (!folder) {
      note.textContent = "Некорректная папка задания.";
      return;
    }

    const filename = folder === "1_" ? "login.html" : "index.html";
    const path = `../${folder}/${filename}`;
    frame.src = path;
    // window.location.href = path;
    note.textContent = `Открыто: ${path}`;
  }

  showBtn.addEventListener("click", () => {
    const radios = document.getElementsByName("task");
    let sel = null;
    for (const r of radios)
      if (r.checked) {
        sel = r.value;
        break;
      }
    if (!sel) {
      note.textContent = "Выберите задание слева.";
      return;
    }
    openTask(sel);
  });

  openDefault.addEventListener("click", () => {
    // open first by default (1_)
    openTask("1_");
  });
});
