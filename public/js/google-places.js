function initGooglePlaces() {
    
    const inputLocationEstablishment = document.querySelector('.google-places-finder-establishments');
    const inputLocationOrder = document.querySelector('.google-places-finder')
    const options = {
        componentRestrictions: {country: 'es'},
        fields: ['address_components', 'geometry', 'icon', 'name'],
        strictBounds: false
    }

    if (inputLocationEstablishment) {
        const autocomplete = new google.maps.places.Autocomplete(inputLocationEstablishment, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function(){
            let place = autocomplete.getPlace();
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
    
            document.querySelector('[name="latitude"]').value = latitude;
            document.querySelector('[name="longitude"]').value = longitude;
        });
    }

    if (inputLocationOrder) {
        const autocomplete = new google.maps.places.Autocomplete(inputLocationOrder, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function(){
            let place = autocomplete.getPlace();
            const address = document.querySelector('.google-places-finder').value;
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();

            document.querySelector('[name="latitudeOrder"]').value = latitude;
            document.querySelector('[name="longitudeOrder"]').value = longitude;

        });
    }
}