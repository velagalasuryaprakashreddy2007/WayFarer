
    // Configure your API key
    maptilersdk.config.apiKey = mapToken;

    // Initialize the map
    const map = new maptilersdk.Map({
      container: 'map', // container ID in HTML
      style: maptilersdk.MapStyle.STREETS, // Map style
      center: listing.geometry.coordinates, // [Longitude, Latitude]
      zoom: 10
    });

    // Keep track of active markers so you can clear/update them

    

// 3. Function to geocode an address and place a marker
      // Create and add the marker to the map
     const currentMarker = new maptilersdk.Marker({ color: "#ce0e0e" }) // Customizable marker color
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new maptilersdk.Popup().setHTML(`<h4> ${listing.location} </h4> <p> this is the exact location </p>`))
        .addTo(map);