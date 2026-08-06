document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".filters");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (!scrollContainer) return;

  const updateButtons = () => {
    if (!leftBtn || !rightBtn) return;

    // Show/Hide scroll buttons based on scroll position
    leftBtn.style.visibility =
      scrollContainer.scrollLeft <= 5 ? "hidden" : "visible";

    rightBtn.style.visibility =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth - 5
        ? "hidden"
        : "visible";
  };

  if (leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  updateButtons();
  scrollContainer.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
});