$(document).ready(onReady);
function onReady() {

console.log("Look for consoled coords");

function initialize(){
    var myLat;
    var myLong;
        var mapContainer = $("#map-canvas");

        map = new google.maps.Map(
            mapContainer[ 0 ],
            {
                zoom: 11,
                center: new google.maps.LatLng(
                    myLat,
                    myLong
                ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        );


        // I add a marker to the map using the given latitude
        // and longitude location.
        function addMarker( latitude, longitude, label ){
            // Create the marker - this will automatically place it
            // on the existing Google map (that we pass-in).
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(
                    latitude,
                    longitude
                ),
                title: (label || "")
            });

            // Return the new marker reference.
            return( marker );
        }


        // I update the marker's position and label.
        function updateMarker( marker, latitude, longitude, label ){
            // Update the position.
            marker.setPosition(
                new google.maps.LatLng(
                    latitude,
                    longitude
                )
            );

            // Update the title if it was provided.
            if (label){

                marker.setTitle( label );

            }
        }


        // -------------------------------------------------- //
        // -------------------------------------------------- //
        // -------------------------------------------------- //
        // -------------------------------------------------- //


        // Check to see if this browser supports geolocation.
        if (navigator.geolocation) {

            // This is the location marker that we will be using
            // on the map. Let's store a reference to it here so
            // that it can be updated in several places.
            var locationMarker = null;


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
                    if (locationMarker){
                        return;
                    }

                    // Log that this is the initial position.
                    console.log( "Initial Position Found" );

                    // Add a marker to the map using the position.
                    locationMarker = addMarker(
                        position.coords.latitude,
                        position.coords.longitude,
                        "Initial Position"
                    );
                     console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                     myLat = position.coords.latitude;
                     myLong = position.coords.longitude;

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