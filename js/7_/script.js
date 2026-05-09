document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-x");
  const resultBox = document.getElementById("result");
  const btn = document.getElementById("calculate-button");
  const error = document.getElementById("error");

  function calculate(x) {
    return Math.log(Math.abs((x + Math.sqrt(x * x + 1)) / (2 * x)));
  }

  btn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      error.textContent = "Введите число.";
      resultBox.textContent = "";
      return;
    }
    const x = parseFloat(value);
    if (isNaN(x)) {
      error.textContent = "Некорректный ввод. Введите число.";
      resultBox.textContent = "";
      return;
    }
    error.textContent = "";
    const result = calculate(x);
    resultBox.innerHTML = `
	<p>X = ${x}</p>
	<p>f(X) = ${result}</p>
	`;
  });
});
