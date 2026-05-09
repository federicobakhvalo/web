document.addEventListener("DOMContentLoaded", () => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthSelect = document.getElementById("month");
  const dayInput = document.getElementById("day");
  const yearInput = document.getElementById("year");
  const calcBtn = document.getElementById("calculate-btn");
  const resultBox = document.querySelector(".result-box");
  const errorBox = document.getElementById("error");

  function populateMonths() {
    months.forEach((m, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = m;
      monthSelect.appendChild(opt);
    });
  }

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function updateDayLimits() {
    const year = parseInt(yearInput.value, 10) || new Date().getFullYear();
    const month = parseInt(monthSelect.value, 10) || new Date().getMonth();
    const max = daysInMonth(year, month);
    dayInput.min = 1;
    dayInput.max = max;
    if (parseInt(dayInput.value, 10) > max) dayInput.value = max;
  }

  function showError(msg) {
    errorBox.textContent = msg;
  }

  function clearError() {
    errorBox.textContent = "";
  }

  function pad(n) {
    return n.toString();
  }

  function calcDifference(from, to) {
    // from <= to expected; returns object {years, months, days, hours, minutes, seconds}
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    let hours = to.getHours() - from.getHours();
    let minutes = to.getMinutes() - from.getMinutes();
    let seconds = to.getSeconds() - from.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      // borrow days from previous month of `to`
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  function formatDiff(obj) {
    const parts = [];
    if (obj.years)
      parts.push(`${obj.years} ${pluralize(obj.years, "год", "года", "лет")}`);
    if (obj.months)
      parts.push(
        `${obj.months} ${pluralize(obj.months, "месяц", "месяца", "месяцев")}`,
      );
    if (obj.days)
      parts.push(`${obj.days} ${pluralize(obj.days, "день", "дня", "дней")}`);
    if (obj.hours)
      parts.push(
        `${obj.hours} ${pluralize(obj.hours, "час", "часа", "часов")}`,
      );
    if (obj.minutes)
      parts.push(
        `${obj.minutes} ${pluralize(obj.minutes, "минута", "минуты", "минут")}`,
      );
    if (obj.seconds)
      parts.push(
        `${obj.seconds} ${pluralize(obj.seconds, "секунда", "секунды", "секунд")}`,
      );
    return parts.length ? parts.join(", ") : "0 секунд";
  }

  function pluralize(n, one, twoToFour, many) {
    const mod10 = Math.abs(n) % 10;
    const mod100 = Math.abs(n) % 100;
    if (mod100 >= 11 && mod100 <= 14) return many;
    if (mod10 === 1) return one;
    if (mod10 >= 2 && mod10 <= 4) return twoToFour;
    return many;
  }

  function onCalculate() {
    clearError();
    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthSelect.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (!day || isNaN(month) || !year) {
      showError("Пожалуйста, заполните все поля (день, месяц, год).");
      return;
    }

    const maxDay = daysInMonth(year, month);
    if (day < 1 || day > maxDay) {
      showError(
        `Некорректный день для выбранного месяца. Допустимо: 1-${maxDay}.`,
      );
      return;
    }

    // build selected date at start of day (local time)
    const selected = new Date(year, month, day, 0, 0, 0);
    const now = new Date();

    let earlier = selected;
    let later = now;
    let dir = "прошло";
    if (selected > now) {
      earlier = now;
      later = selected;
      dir = "осталось";
    }

    const diff = calcDifference(earlier, later);
    const totalMs = Math.abs(later - earlier);
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

    resultBox.innerHTML = `
			<div>
				<strong>От выбранной даты:</strong>
				<div style="margin-top:8px">${dir}: ${formatDiff(diff)}</div>
				<div style="margin-top:8px; font-size:0.95em; color:#222">Всего: ${totalDays} ${pluralize(totalDays, "день", "дня", "дней")} (${totalMs.toLocaleString()} мс)</div>
			</div>
		`;
  }

  // Initialize
  populateMonths();
  const today = new Date();
  monthSelect.value = today.getMonth();
  dayInput.value = today.getDate();
  yearInput.value = today.getFullYear();
  updateDayLimits();

  monthSelect.addEventListener("change", updateDayLimits);
  yearInput.addEventListener("input", updateDayLimits);
  calcBtn.addEventListener("click", onCalculate);
})();
