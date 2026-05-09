document.addEventListener("DOMContentLoaded", () => {
  const topic = document.getElementById("topic");
  const message = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");
  const form = document.getElementById("feedbackForm");
  const defaultText = "Текст сообщения…";

  function nowString() {
    return new Date().toLocaleString("ru-RU");
  }

  const valueOptions = {
    thanks: `${nowString()} — Вы великолепны! Ваш код работает без ошибок!`,
    review: `${nowString()} — Вы все еще великолепны, но у меня есть пара конструктивных замечаний.`,
    complaint: `${nowString()} — К сожаленью, День Рожденья только раз в году`,
  };

  topic.addEventListener("change", () => {
    const idx = topic.selectedIndex;
    const val = topic.options[idx].value;
    if (!val) {
      message.value = defaultText;
      return;
    }
    message.value = valueOptions[val] || defaultText;
    message.readOnly = !!valueOptions[val];
  });

  resetBtn.addEventListener("click", () => {
    topic.selectedIndex = 0;
    message.value = defaultText;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Форма отправлена:\n" + message.value);
  });
});
