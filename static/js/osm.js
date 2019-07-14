var map = L.map('map').setView([-3.71839, -38.5434], 13)

mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; ' + mapLink,
        maxZoom: 20,
    }).addTo(map);