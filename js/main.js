/*
THIS SCRIPT IS THE MAIN SCRIPT WHERE THE PROGRAM EXECUTES
- environment.js
- dataPoint.js
- date.js
- sharedVariable.js
- weather_file.json
*/

var canvas = document.getElementById("canvas"); //canvas
var context = canvas.getContext("2d"); //context

var scene = new THREE.Scene(); //scene
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); //camera
var controls = new THREE.OrbitControls( camera ); //controls
var renderer = new THREE.WebGLRenderer(); //renderer

var starCount = 100;
var gridSpacing = 100;
var gridHelperSize = 120;
var gridHelperDivisions = 8;
var axisBounds = 500; //bounds of x,y,z axis

var myDataDots = []; //array to hold my dots


//SETS THE PIXEL RATIO
//set pixel ratio
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );
//call visual view on click
document.getElementById("visualView").appendChild(renderer.domElement);
//initialize the 2D renderer for UI
var labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );
//renderer styling
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = 0;
labelRenderer.domElement.style.zIndex = 0;
document.getElementById("visualView").appendChild(labelRenderer.domElement);

//orbit
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var centerOrbit = new THREE.Mesh( geometry, material );
scene.add(centerOrbit);

var pivotPoints = [];
// function InsertPivotPoints(){
//   // for (var i = 0; i < myDataDots.length; i++) {
//     pivotPoints[i] = new THREE.Object3D();
//     centerOrbit.add(pivotPoints[i]);
//     console.log(pivotPoints[i]);
//   // }
// }

//pivot point
// var pivotPoint = new THREE.Object3D();
// centerOrbit.add(pivotPoint);


//DATA LOADING AND SPAWNING OF DATA POINTS
window.onload = function(){ //wait for it to load
//GET API FOR EACH COUNTRY AND DISPLAY
// http://api.airvisual.com/v2/countries?key=nmscM5TEYNutrJ2LN
//weatherbit api = 8f5319982b934d1e8bca2839ce4a722f
$.getJSON( "js/weather_file.json", function( data ) {
  var items = [];
  // console.log(data); //debug
  //for each data entry in our json file
  $.each( data, function( i, val ) {
    let tempInKelvin = Math.round(data[i].main.temp - 273.15); //convert the temperature to kelvin

    myDataDots.push(new myDataPoints(Math.random() * 100 -gridHelperSize/2,tempInKelvin*4 -60,Math.random() * 100 -gridHelperSize/2,data[i].clouds.all *0.05,data[i].wind.speed * 0.005,0.01));
    pivotPoints[i] = new THREE.Object3D();
    centerOrbit.add(pivotPoints[i]); //parent it to center orbit
    myDataDots[i].render(pivotPoints[i]); //parent the dots to those pivots
    myDataDots[i].text(data[i].city.findname,data[i].city.country,data[i].wind.speed,tempInKelvin,data[i].weather[0].main,data[i].clouds.all,pivotPoints[i]);

    //custom object to insert our data into a structure
    let customObject ={
      "cityname":data[i].city.findname,
      "countryname":data[i].city.country,
      "countrywind":data[i].wind.speed,
      "countrytemp":tempInKelvin,
      "clouds":data[i].weather[0].main,
      "cloudSize":data[i].clouds.all
    }

    //insert that custom object in the countrynames array
    countryNames.push(customObject); // duplicate and update data

    //appending datatodiv
    let listView = $("<li>");
    $(listView).text(data[i].city.findname);
  });
});
}

//POST PROCESSING
composer = new THREE.EffectComposer( renderer );
composer.addPass( new THREE.RenderPass( scene, camera ) );
var effect = new THREE.ShaderPass( THREE.DotScreenShader );
effect.uniforms[ 'scale' ].value = 6;
composer.addPass( effect );
var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
effect.uniforms[ 'amount' ].value = 0.0015;
effect.renderToScreen = true;
composer.addPass( effect );

//DYNAMIC WINDOW RESIZING
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;

  camera.updateProjectionMatrix();
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // composer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );
  composer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );

}
//SET THE CAMERA POSITION
camera.position.set( 0, 20, 100 );

//ANIMATION LOOP
var animate = function () {
  requestAnimationFrame( animate );
  controls.update(); //orbit controls
  renderer.render( scene, camera ); //regular render to render scene
  composer.render(); //compositing render
  labelRenderer.render( scene, camera ); //laber render
  // pivotPoint.rotation.y += 0.005;
  for (var i = 0; i < myDataDots.length; i++) {
    // pivotPoints[i].rotation.y += 0.001;
    myDataDots[i].animate(pivotPoints[i]);
  }
}

//FUNCTIONS TO INIT
startTime(); //starts the timer from date.js
animate();  //initialize the animation
