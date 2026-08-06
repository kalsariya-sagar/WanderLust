document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");

  if (!mapElement || typeof L === "undefined") return;

  try {
    const rawCoordinates = mapElement.dataset.coordinates;
    const coordinates = rawCoordinates ? JSON.parse(rawCoordinates) : [72.8777, 19.076];

    const listingData = {
      title: mapElement.dataset.title || "Listing Location",
      location: mapElement.dataset.location || "",
      country: mapElement.dataset.country || "",
    };

    // Initialize Map [Latitude, Longitude]
    const map = L.map("map").setView([coordinates[1], coordinates[0]], 14);

    // OpenStreetMap Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Marker
    const marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);

    // Popup Box
    marker
      .bindPopup(
        `<div style="min-width:180px">
          <h6 style="margin-bottom:6px; font-weight:600;">${listingData.title}</h6>
          <p style="margin:0; font-size:0.85rem; color:#555;">📍 ${listingData.location}, ${listingData.country}</p>
        </div>`
      )
      .openPopup();
  } catch (err) {
    console.error("Error initializing Leaflet map:", err);
  }
});