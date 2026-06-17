const API_BASE = "http://localhost:3000/api/files";

async function fetchFiles() {
  const res = await fetch(API_BASE);
  if (!res.ok) return [];
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

async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);
  await fetch(API_BASE, { method: "POST", body: form });
}

async function handleFiles(files) {
  if (!files || !files.length) return;
  // show previews for image files
  for (const file of Array.from(files)) {
    createPreview(file);
    try {
      await uploadFile(file);
    } catch (err) {
      console.error("Upload failed", err);
    }
  }
  document.getElementById("fileInput").value = "";
  document.getElementById("previews").innerHTML = "";
  loadAndRender();
}

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("fileInput");
  if (!input.files.length) return;
  await handleFiles(input.files);
});

// Drag-and-drop
const dropZone = document.getElementById("uploadForm");
["dragenter", "dragover"].forEach((ev) => {
  dropZone.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add("drag-over");
  });
});
["dragleave", "drop"].forEach((ev) => {
  dropZone.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", (e) => {
  const dt = e.dataTransfer;
  if (!dt) return;
  const files = dt.files;
  handleFiles(files);
});

// Image preview thumbnail creation using FileReader
function createPreview(file) {
  const previews = document.getElementById("previews");
  const wrapper = document.createElement("div");
  wrapper.className = "preview-item";
  const info = document.createElement("div");
  info.textContent = file.name;
  wrapper.appendChild(info);

  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.alt = file.name;
    wrapper.appendChild(img);
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  previews.appendChild(wrapper);
}

document.getElementById("fileInput").addEventListener("change", (e) => {
  const files = e.target.files;
  for (const file of Array.from(files)) {
    createPreview(file);
  }
});

// Export files list as JSON using Fetch + Blob + URL.createObjectURL
document.getElementById("exportBtn").addEventListener("click", async () => {
  try {
    const data = await fetchFiles();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "files.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed", err);
  }
});

window.addEventListener("DOMContentLoaded", loadAndRender);
