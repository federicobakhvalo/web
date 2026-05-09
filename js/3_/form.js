document.addEventListener("DOMContentLoaded", () => {
  const showDate = document.getElementById("showDate");
  const showList = document.getElementById("showList");
  const showPara = document.getElementById("showPara");
  const showBtn = document.getElementById("showBtn");
  const clearBtn = document.getElementById("clearBtn");
  const output = document.getElementById("output");

  function nowString() {
    return new Date().toLocaleString("ru-RU");
  }

  function render() {
    output.innerHTML = "";
    if (showDate.checked) {
      const d = document.createElement("div");
      d.className = "date";
      d.textContent = nowString();
      output.appendChild(d);
    }
    if (showList.checked) {
      const ul = document.createElement("ul");
      const items = ["Математика", "Физика", "Программирование"];
      items.slice(0, 3).forEach((it) => {
        const li = document.createElement("li");
        li.textContent = it;
        ul.appendChild(li);
      });
      output.appendChild(ul);
    }
    if (showPara.checked) {
      const p = document.createElement("p");
      p.className = "red";
      p.textContent = "Это красный абзац текста.";
      output.appendChild(p);
    }
    if (!showDate.checked && !showList.checked && !showPara.checked) {
      alert("Пожалуйста, выберите хотя бы один элемент для отображения.");
      output.textContent = "Ничего не выбрано.";
    }
  }

  showBtn.addEventListener("click", render);
  clearBtn.addEventListener("click", () => {
    showDate.checked = false;
    showList.checked = false;
    showPara.checked = false;
    output.innerHTML = "";
  });
});
