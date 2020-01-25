var button = document.getElementById('getCons');
var startPos;
var nudge = document.getElementById("nudge");

var showNudgeBanner = function() { nudge.style.display = "block"; };
var hideNudgeBanner = function() { nudge.style.display = "none"; };

var geoSuccess = function(position) {
  // Do magic with location
  startPos = position;
  // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
  // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  nudge.innerHTML = nudge.innerHTML+ '<br>Position acquired: '+startPos.coords.latitude+', '+startPos.coords.longitude;
};
var geoError = function(error) {
  switch(error.code) {
    case error.TIMEOUT:
      // The user didn't accept the callout
      showNudgeBanner();
      break;
  }
  nudge.innerHTML = nudge.innerHTML+ '<br>Error occurred. Error code: ' + error.code;
};

// preflight check: Geolocation support & BT capabilities
if (navigator.geolocation && navigator.bluetooth) {
  nudge.innerHTML = 'Cool, geolocation is supported!';

  button.onclick = function() {

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    // now look for BT devices:
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service']
    })
    .then(device => {       
      nudge.innerHTML = nudge.innerHTML+ '<br>device found: '+device;
      /* ... */ 
    })
    .catch(error => { 
      console.log(error);
      nudge.innerHTML = nudge.innerHTML+ '<br>Error occurred: '+error;
    });
  };

}
else {
  if (!navigator.geolocation)
    nudge.innerHTML = 'Geolocation is not supported for this Browser.';
  if (!navigator.bluetooth)
    nudge.innerHTML = 'BT is not supported for this Browser.';

}