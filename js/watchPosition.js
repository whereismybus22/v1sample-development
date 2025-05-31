if (localStorage.getItem('userDeviceLocation')) {
    let updatedLocation;

    navigator.geolocation.watchPosition(
        (position) => {
            updatedLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            localStorage.setItem('userDeviceLocation', JSON.stringify(updatedLocation));
        },
        (error) => {
            console.error('Geolocation error:', error.message);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
        }
    );

}