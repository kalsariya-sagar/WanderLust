document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search-input");
  const clearBtn = document.getElementById("clearSearch");

  if (!input || !clearBtn) return;

  const toggleButton = () => {
    clearBtn.style.display =
      input.value.trim() === "" ? "none" : "block";
  };

  toggleButton();

  input.addEventListener("input", toggleButton);

  clearBtn.addEventListener("click", () => {
    input.value = "";
    toggleButton();
    input.focus();
  });
});