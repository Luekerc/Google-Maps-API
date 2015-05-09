$(document).ready(onReady);
function onReady() {

console.log("Look for consoled coords");

function initialize(){
    var myLat;
    var marker;
    var myLong;
        var mapContainer = $("#map-canvas");

        map = new google.maps.Map(
            mapContainer[ 0 ],
            {
                zoom: 11,
                center: new google.maps.LatLng(
                   30.2178882,
                    -97.7963355
                ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        );

        // Check to see if this browser supports geolocation.
        if (navigator.geolocation) {

            // Get the location of the user's browser using the
            // native geolocation service. When we invoke this method
            // only the first callback is requied. The second
            // callback - the error handler - and the third
            // argument - our configuration options - are optional.
            navigator.geolocation.getCurrentPosition(
                function( position ){

                    // Check to see if there is already a location.
                    // There is a bug in FireFox where this gets
                    // invoked more than once with a cahced result.
                    // Log that this is the initial position.
                    console.log( "Initial Position Found" );
                    // Add a marker to the map using the position.
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    myLat = position.coords.latitude;
                    myLong = position.coords.longitude;

                    map = new google.maps.Map(
                        mapContainer[ 0 ],
                        {
                            zoom: 14,
                            center: new google.maps.LatLng(
                                myLat,
                                myLong
                            ),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }
                    );

                },

                function( error ){
                    console.log( "Something went wrong: ", error );
                },
                
                {
                    timeout: (5 * 1000),
                    maximumAge: (1000 * 60 * 15),
                    enableHighAccuracy: true
                }
            );


            // Now tha twe have asked for the position of the user,
            // let's watch the position to see if it updates. This
            // can happen if the user physically moves, of if more
            // accurate location information has been found (ex.
            // GPS vs. IP address).
            //
            // NOTE: This acts much like the native setInterval(),
            // invoking the given callback a number of times to
            // monitor the position. As such, it returns a "timer ID"
            // that can be used to later stop the monitoring.
            var positionTimer = navigator.geolocation.watchPosition(
                function( position ){

                    // Log that a newer, perhaps more accurate
                    // position has been found.
                    console.log( "Newer Position Found" );

                    // Set the new position of the existing marker.
                    updateMarker(
                        locationMarker,
                        position.coords.latitude,
                        position.coords.longitude,
                        "Updated / Accurate Position"
                    );
                    // myLat = position.coords.latitude;
                    // myLong = position.coords.longitude;
                }
            );


            // If the position hasn't updated within 5 minutes, stop
            // monitoring the position for changes.
            setTimeout(
                function(){
                    // Clear the position watcher.
                    navigator.geolocation.clearWatch( positionTimer );
                },
                (1000 * 60 * 5)
            );

        }

}

$("#button").click(function(){
    initialize();
})
      // google.maps.event.addDomListener(window, 'load', initialize);


}