var button = document.getElementById('getCons');

// preflight check: Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');

  button.onclick = function() {
    var startPos;
    var nudge = document.getElementById("nudge");

    var showNudgeBanner = function() {
      nudge.style.display = "block";
    };

    var hideNudgeBanner = function() {
      nudge.style.display = "none";
    };

    var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

    var geoSuccess = function(position) {
      hideNudgeBanner();
      // We have the location, don't display banner
      clearTimeout(nudgeTimeoutId); 

      // Do magic with location
      startPos = position;
      document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    };
    var geoError = function(error) {
      switch(error.code) {
        case error.TIMEOUT:
          // The user didn't accept the callout
          showNudgeBanner();
          break;
      }
      console.log('Error occurred. Error code: ' + error.code);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);


    // now look for BT devices:
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service']
    })
    .then(device => { /* ... */ })
    .catch(error => { console.log(error); });


    
  };

}
else {
  console.log('Geolocation is not supported for this Browser/OS.');
}