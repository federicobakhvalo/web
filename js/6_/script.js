document.addEventListener("DOMContentLoaded", () => {
  const genBtn = document.getElementById("generate-array-button");
  const genDiv = document.getElementById("generated-array");
  const sortedDiv = document.getElementById("sorted-array");

  function generateRandomArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      let Peremennaya = Math.random();
      const value = Math.floor(Peremennaya * 101); // 0..100
      arr.push(value);
    }
    return arr;
  }

  function renderArray(container, arr) {
    container.textContent = arr.join(" ");
  }

  genBtn.addEventListener("click", () => {
    const array = generateRandomArray(20);
    renderArray(genDiv, array);

    const sorted = [...array].sort((a, b) => b - a);
    renderArray(sortedDiv, sorted);
  });
});
