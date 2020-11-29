document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    startDeviceMotion();
    useGeolocation();
}



function startDeviceMotion(){
if (!!window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotion, true);
    self.supported = true;
}
if (!!window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation, true);
    self.supported = true;
}


function handleOrientation(event) {

    absolute = event.absolute;
    document.getElementById('absolute').innerHTML =  event.absolute;
    alpha = event.alpha;
    document.getElementById('alpha').innerHTML =  event.alpha;
    beta = event.beta;
    document.getElementById('betta').innerHTML =  event.beta;
    gamma = event.gamma;
    document.getElementById('gamma').innerHTML =  event.gamma;
}


function handleMotion(event) {
    acceleration = accelerationIncludingGravity = rotationRate = {};

    acceleration.x = event.acceleration.x;
    acceleration.y = event.acceleration.y;
    acceleration.z = event.acceleration.z;
    accelerationIncludingGravity.x = event.accelerationIncludingGravity.x;
    accelerationIncludingGravity.y = event.accelerationIncludingGravity.y;
    accelerationIncludingGravity.z = event.accelerationIncludingGravity.z;

    rotationRate.alpha = event.rotationRate.alpha;
    rotationRate.beta = event.rotationRate.beta;
    rotationRate.gamma = event.rotationRate.gamma;
    interval = event.interval;

    console.log(acceleration);
    console.log(accelerationIncludingGravity);
    console.log(rotationRate);
    console.log(interval);

     document.getElementById('acceleration').innerHTML = '<p>' + JSON.stringify(accelerationIncludingGravity) + '</p>';

 }
}




function useGeolocation() {
    var getGeolocationButton = document.getElementById("get-geo-button");
    getGeolocationButton.addEventListener("click", getGeolocation, false);

    var startGeoWatchButton = document.getElementById("start-geo-watch-button");
    startGeoWatchButton.addEventListener("click", startGeoWatch, false);

    var endGeoWatchButton = document.getElementById("end-geo-watch-button");
    endGeoWatchButton.addEventListener("click", endGeoWatch, false);

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };


    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


    function getGeolocation() {
        var options = { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }


    var watchID = null;


    function startGeoWatch() {
        startGeoWatchButton.setAttribute("disabled","disabled");

        watchID = navigator.geolocation.watchPosition(
            (position) => {
                var element = document.getElementById('geolocation');
                element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                                    'Longitude: ' + position.coords.longitude;
            }, 
            onError, 
            { timeout: 30000, enableHighAccuracy: true }
    );
    }


    function endGeoWatch() {
      
        if(watchID !== null) {
            navigator.geolocation.clearWatch(watchID);
            startGeoWatchButton.removeAttribute("disabled");
            watchID = null;
            var element = document.getElementById('geolocation');
            element.innerHTML = '';
        }
    }
}