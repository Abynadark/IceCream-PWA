document.addEventListener("DOMContentLoaded", () => {
    const getLocationButton = document.getElementById("getLocation");
    const userLocationSpan = document.getElementById("userLocation");
    const distanceSpan = document.getElementById("distance");
    const arrivalTimeSpan = document.getElementById("arrivalTime");

    getLocationButton.addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Exemplo de coordenadas do restaurante em Recife (substitua pelas coordenadas reais)8.0521901,-34.9172199
                const restaurantLat = -8.052305;
                const restaurantLng = -34.917291;

                // Calculando a distância e tempo de chegada (usando distância euclidiana)
                const distance = calculateDistance(userLat, userLng, restaurantLat, restaurantLng);
                const arrivalTime = calculateArrivalTime(distance);

                userLocationSpan.textContent = `${userLat.toFixed(6)}, ${userLng.toFixed(6)}`;
                distanceSpan.textContent = distance.toFixed(2);
                arrivalTimeSpan.textContent = arrivalTime.toFixed(0);
            });
        } else {
            alert("Geolocalização não está disponível no seu navegador.");
        }
    });

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function calculateArrivalTime(distance) {
        // Suponha uma velocidade média de 40 km/h (substitua pela velocidade real)
        const averageSpeed = 40;
        const time = (distance / averageSpeed) * 60; // Tempo em minutos
        return time;
    }
});