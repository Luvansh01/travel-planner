// Initialize the map
const map = L.map('map').setView([22.5726, 88.3639], 12); // Centered on Kolkata

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker for the center location
L.marker([22.5726, 88.3639]).addTo(map)
  .bindPopup('Welcome to Kolkata!')
  .openPopup();
