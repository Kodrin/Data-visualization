window.onload = function(){
  //get api
  var sceneAPI = "json/city.list.json";
  var sceneAPIKey = "114468b15ec16bed1684039fe3b561d8";
  //get JSON
  // $.getJSON(sceneAPI,displayResults)
  //     //fail
  //     .fail(function() {
  //       console.log( "error" );
  //     });





  //grid var
  var gridX = 100;
  var gridY = 100;
  var gridZ = 100;
  var gridSpacing = 5;

  var gridHelperSize = 50;
  var gridHelperDivisions = 50;

  //Axis variables
  var axisBounds = 500;

  //object storage
  // var gridDot = [];

  //three.js essemtials
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );

  var renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //sample cube from example
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  //environment limits
  var lineMat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  var envGeo = new THREE.SphereBufferGeometry( 100, 100, 100 );
  var envWire = new THREE.WireframeGeometry( envGeo );
  var envLine = new THREE.LineSegments( envWire );
  envLine.material.depthTest = false;
  envLine.material.opacity = 0.25;
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
  var gridDotGeo = new THREE.SphereGeometry( 0.1, 32, 32 );
  var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

  //defines the grid
  var gridHelper = new THREE.GridHelper( gridHelperSize, gridHelperSize );
  scene.add( gridHelper );

  //plane helper
  var plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
  var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
  scene.add( helper );

  //background
  for (var i = 0; i < gridX; i++) {
        var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
        gridDot.position.x = Math.random() * 800 - 400;
        gridDot.position.y = Math.random() * 800 - 400;
        gridDot.position.z = Math.random() * 800 - 400;
        scene.add( gridDot );
  }

  //data point
  for (var i = 0; i < gridX; i++) {
        var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
        gridDot.position.x = Math.random() * gridHelperSize -gridHelperSize/2;
        gridDot.position.y = Math.random() * gridHelperSize -gridHelperSize/2;
        gridDot.position.z = Math.random() * gridHelperSize -gridHelperSize/2;
        scene.add( gridDot );
  }

  //post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );
  var effect = new THREE.ShaderPass( THREE.DotScreenShader );
  effect.uniforms[ 'scale' ].value = 6;
  composer.addPass( effect );
  var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
  effect.uniforms[ 'amount' ].value = 0.0015;
  effect.renderToScreen = true;
  composer.addPass( effect );
  //
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
  }

  camera.position.set( 0, 20, 100 );
  controls.update();

  var animate = function () {
    requestAnimationFrame( animate );
    controls.update();

    renderer.render( scene, camera );
    composer.render();
  };

  animate();
  // renderer.render( scene, camera );

}
