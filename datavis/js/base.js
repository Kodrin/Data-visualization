
window.onload = function(){
  //size of canvas
  // var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
  // var c = document.getElementById("canvas");
  // c.width = dimension[0];
  // c.height = dimension[1];
  //
  let canvas = document.getElementById("canvas");

  //get the context
  let context = canvas.getContext("2d");

  startTime();

  //grid var
  var gridX = 100;
  var gridY = 100;
  var gridZ = 100;
  var gridSpacing = 5;

  var gridHelperSize = 100;
  var gridHelperDivisions = 100;

  //array to hold objects
  var myDataDots = [];

  //Axis variables
  var axisBounds = 500;

  //object storage
  // var gridDot = [];

  //labels
  var labelRenderer;

  //three.js essemtials
  var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );
  var renderer = new THREE.WebGLRenderer();
  //set pixel ratio
  renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );

  //document.body.appendChild( renderer.domElement );
  document.getElementById("visualView").appendChild(renderer.domElement);
  //initialize the 2D renderer for UI
  labelRenderer = new THREE.CSS2DRenderer();
  // labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight );

  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = 0;
  labelRenderer.domElement.style.zIndex = 0;
  //  document.body.appendChild( labelRenderer.domElement );
  document.getElementById("visualView").appendChild(labelRenderer.domElement);

  //sample cube from example
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  //environment limits
  var lineMat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  var envGeo = new THREE.SphereBufferGeometry( 100, 100, 100 );
  var envWire = new THREE.WireframeGeometry( envGeo );
  var envLine = new THREE.LineSegments( envWire );
  envLine.material.depthTest = false;
  envLine.material.opacity = 0.15;
  envLine.material.transparent = true;

  //environment axis
  var lineAxisX = new THREE.Geometry();
  lineAxisX.vertices.push(new THREE.Vector3( -axisBounds, 0, 0) );
  lineAxisX.vertices.push(new THREE.Vector3( axisBounds, 0, 0) );
  var lineAxisY = new THREE.Geometry();
  lineAxisY.vertices.push(new THREE.Vector3( 0, -axisBounds, 0) );
  lineAxisY.vertices.push(new THREE.Vector3( 0, axisBounds, 0) );
  var lineAxisZ = new THREE.Geometry();
  lineAxisZ.vertices.push(new THREE.Vector3( 0, 0, -axisBounds) );
  lineAxisZ.vertices.push(new THREE.Vector3( 0, 0, axisBounds) );

  var lineX = new THREE.Line( lineAxisX, lineMat );
  var lineY = new THREE.Line( lineAxisY, lineMat );
  var lineZ = new THREE.Line( lineAxisZ, lineMat );

  //adding env objects
  scene.add(envLine);
  scene.add(lineX);
  scene.add(lineY);
  scene.add(lineZ);

  //data points look
  var gridDotGeo = new THREE.SphereGeometry( 0.5, 32, 32 );
  var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

  //defines the grid
  var gridHelper = new THREE.GridHelper( gridHelperSize, gridHelperSize );
  scene.add( gridHelper );

  //plane helper
  var plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
  var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
  scene.add( helper );

  //background dots
  for (var i = 0; i < gridX; i++) {
        var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
        gridDot.position.x = Math.random() * 800 - 400;
        gridDot.position.y = Math.random() * 800 - 400;
        gridDot.position.z = Math.random() * 800 - 400;
        scene.add( gridDot );
  }

  //get api for each country name and assign a data point based on dataPOint.js construct
  // http://api.airvisual.com/v2/countries?key=nmscM5TEYNutrJ2LN
  //weatherbit api = 8f5319982b934d1e8bca2839ce4a722f
  $.getJSON( "js/weather_file.json", function( data ) {
    var items = [];
    console.log(data);
    $.each( data, function( i, val ) {
      // console.log(data.wind);
      // for (var i = 0; i < 10; i++) { //TO EDIT VAL
      let tempInKelvin = Math.round(data[i].main.temp - 273.15);

      myDataDots.push(new myDataPoints(Math.random() * gridHelperSize -gridHelperSize/2,Math.random() * gridHelperSize -gridHelperSize/2,Math.random() * gridHelperSize -gridHelperSize/2,1,0.1,0.01));
      myDataDots[i].render(scene);
      myDataDots[i].text(data[i].city.findname,data[i].wind.speed,tempInKelvin,scene);
      // myDataDots[i].initTrail(scene);
            // myDataDots[i].updateTrail();



      let customObject ={
        "cityname":data[i].city.findname,
        "countryname":data[i].city.country,
        "countrywind":data[i].wind.speed,
        "countrytemp":tempInKelvin

      }
      countryNames.push(customObject); // DUPLICATE AND UPDATE TO ADD DATA

      //appending datatodiv
      let listView = $("<li>");
      $(listView).text(data[i].city.findname);
    // }


    });

  });
  //post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );
  var effect = new THREE.ShaderPass( THREE.DotScreenShader );
  effect.uniforms[ 'scale' ].value = 6;
  composer.addPass( effect );
  var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
  effect.uniforms[ 'amount' ].value = 0.0001;
  effect.renderToScreen = true;
  composer.addPass( effect );

  //dynamic window resizing
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

  //cam and orbit initiate
  //x y z
  camera.position.set( 0, 20, 100 );
  controls.update();

  var animate = function () {
    requestAnimationFrame( animate );
    //orbit controls
    controls.update();
    //regular render
    renderer.render( scene, camera );
    //compositing render
    composer.render();
    //laber render
    labelRenderer.render( scene, camera );
    //animate each data point in the array
    for (var i = 0; i < myDataDots.length; i++) {
      myDataDots[i].animate();
      // myDataDots[i].updateTrail();
    }

  };

  animate();

  // renderer.render( scene, camera );

}
