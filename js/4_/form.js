function randInt(max = 100) {
  return Math.floor(Math.random() * (max + 1));
}

document.addEventListener("DOMContentLoaded", () => {
  const rowsIn = document.getElementById("rows");
  const colsIn = document.getElementById("cols");
  const createBtn = document.getElementById("createBtn");
  const clearBtn = document.getElementById("clearBtn");
  const tableWrap = document.getElementById("tableWrap");

  function buildTable(r, c) {
    const data = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => randInt(100)),
    );

    for (let col = 0; col < c; col++) {
      const colArr = [];
      for (let row = 0; row < r; row++) colArr.push(data[row][col]);
      colArr.sort((a, b) => a - b);
      for (let row = 0; row < r; row++) data[row][col] = colArr[row];
    }

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    for (let i = 0; i < r; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < c; j++) {
        const td = document.createElement("td");
        td.textContent = data[i][j];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
  }

  createBtn.addEventListener("click", () => {
    const r = parseInt(rowsIn.value, 10);
    const c = parseInt(colsIn.value, 10);
    if (!Number.isInteger(r) || r <= 0 || !Number.isInteger(c) || c <= 0) {
      tableWrap.innerHTML =
        '<div class="msg">Введите корректные положительные числа строк и столбцов.</div>';
      return;
    }
    const table = buildTable(r, c);
    tableWrap.innerHTML = "";
    tableWrap.appendChild(table);
  });

  clearBtn.addEventListener("click", () => {
    rowsIn.value = "";
    colsIn.value = "";
    tableWrap.innerHTML = "";
  });
});
