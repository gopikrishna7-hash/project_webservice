

    mapboxgl.accessToken = mapToken;
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12",
        center:listing.geometry.coordinates,
        zoom: 9, // starting zoom
    });

 const marker=new mapboxgl.Marker({color:"red"})
 .setLngLat(listing.geometry.coordinates)
 .setPopup(new mapboxgl.Popup({offset: 35})
 .setHTML(`${listing.title}<p>Exact location will be given after booking<p>`))  
 .addTo(map);

 