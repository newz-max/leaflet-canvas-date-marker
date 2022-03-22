export const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2,
    renderer: L.canvas()
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieGlhb3poaTAiLCJhIjoiY2twNjV3cHg5MDJwNjJ2cGVrcXJkd2ZudCJ9.dU0VZtUqb7SKNkkkpdW0-w'
}).addTo(map);