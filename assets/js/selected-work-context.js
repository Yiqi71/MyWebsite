const selectedWorkBackLink = document.querySelector("[data-selected-work-back]");

if (selectedWorkBackLink) {
  selectedWorkBackLink.href = "index.html#portfolio";
  selectedWorkBackLink.textContent = "← Back";
  selectedWorkBackLink.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });
}
