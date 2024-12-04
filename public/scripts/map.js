// Initialize the map centered at Kolkata
const map = L.map('map').setView([22.5726, 88.3639], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker at Kolkata by default
L.marker([22.5726, 88.3639]).addTo(map).bindPopup("Kolkata").openPopup();

// Routing control variable
let routeLayer = null;

// Function to validate inputs
function validateInputs(start, end) {
    if (!start || !end) {
        alert("Please enter both start and end locations.");
        return false;
    }
    return true;
}

// Function to add route to the map
function getRoute(start, end) {
    if (!validateInputs(start, end)) return;

    document.getElementById('spinner').style.display = 'block';

    fetch(`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`)
        .then((response) => response.json())
        .then((data) => {
            if (data.routes.length > 0) {
                const route = data.routes[0];
                const distance = (route.distance / 1000).toFixed(2); // in km
                const duration = (route.duration / 60).toFixed(2); // in minutes

                // Remove previous route if exists
                if (routeLayer) {
                    map.removeLayer(routeLayer);
                }

                // Display route on the map with a red line
                routeLayer = L.geoJSON(route.geometry, {
                    style: {
                        color: 'red',
                        weight: 5,
                        opacity: 0.8
                    }
                }).addTo(map);

                // Update route details
                document.getElementById('routeDetails').innerHTML = `
                    <p><strong>Distance:</strong> ${distance} km</p>
                    <p><strong>Estimated Time:</strong> ${duration} minutes</p>
                `;

                // Adjust the map to fit the route
                map.fitBounds(routeLayer.getBounds());
            } else {
                alert('No route found. Please check the locations.');
            }
        })
        .catch((error) => {
            console.error('Error fetching route:', error);
            alert('An error occurred while fetching the route.');
        })
        .finally(() => {
            document.getElementById('spinner').style.display = 'none';
        });
}

// Handle form submission
document.getElementById('routeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    getRoute(start, end); // Call getRoute function
});
