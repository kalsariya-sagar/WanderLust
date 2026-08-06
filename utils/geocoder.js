const axios = require("axios");

async function getCoordinates(location) {
  const url = "https://nominatim.openstreetmap.org/search";

  try {
    const { data } = await axios.get(url, {
      params: {
        q: location,
        format: "jsonv2",
        limit: 1,
      },
      headers: {
        "User-Agent": "WanderLust/1.0",
      },
    });

    if (!data || data.length === 0) {
      return null;
    }

    return {
      latitude: Number.parseFloat(data[0].lat),
      longitude: Number.parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return null;
  }
}

module.exports = getCoordinates;