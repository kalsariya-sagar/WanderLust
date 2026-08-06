document.addEventListener("DOMContentLoaded", () => {
  const TAX_RATE = 0.18; // 18% GST/Tax
  const taxToggle = document.querySelector("#taxToggle");
  const listingPrices = document.querySelectorAll(".listing-price");

  if (!taxToggle || listingPrices.length === 0) return;

  const updatePriceDisplay = () => {
    const isTaxIncluded = taxToggle.checked;

    listingPrices.forEach((priceElement) => {
      const originalPrice = Number(priceElement.dataset.price);

      if (isNaN(originalPrice)) return;

      if (isTaxIncluded) {
        const totalPrice = Math.round(originalPrice * (1 + TAX_RATE));
        priceElement.innerText = `₹ ${totalPrice.toLocaleString("en-IN")}`;
      } else {
        priceElement.innerText = `₹ ${originalPrice.toLocaleString("en-IN")}`;
      }
    });
  };

  // Event Listeners for both Desktop Click & Mobile Touch/Change events
  taxToggle.addEventListener("change", updatePriceDisplay);
  taxToggle.addEventListener("click", updatePriceDisplay);
});