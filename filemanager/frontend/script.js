const API_BASE = "http://localhost:3000/api/files";

async function fetchFiles() {
  const res = await fetch(API_BASE);
  return res.json();
}
async function renameFile(id, currentName) {
  const newName = prompt("Новое имя файла", currentName);
  if (!newName) return;
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: newName }),
  });
  loadAndRender();
}

async function deleteFile(id) {
  if (!confirm("Удалить файл?")) return;
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  loadAndRender();
}

function renderFiles(list) {
  const tbody = document.querySelector("#filesTable tbody");
  tbody.innerHTML = "";
  list.forEach((f) => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = f.filename;
    const actionsTd = document.createElement("td");

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Переименовать";
    renameBtn.addEventListener("click", () => renameFile(f.id, f.filename));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => deleteFile(f.id));

    actionsTd.appendChild(renameBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(nameTd);
    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });
}

async function loadAndRender() {
  const files = await fetchFiles();
  renderFiles(files);
}

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("fileInput");
  if (!input.files.length) return;
  const form = new FormData();
  form.append("file", input.files[0]);
  await fetch(API_BASE, { method: "POST", body: form });
  input.value = "";
  loadAndRender();
});

window.addEventListener("DOMContentLoaded", loadAndRender);
