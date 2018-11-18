window.onload = function(){
  // let canvas = document.getElementById("canvas");

  //get the context
  // let context = canvas.getContext("2d");

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


  var mouse = new THREE.Vector2(), INTERSECTED;
  var radius = 100, theta = 0;

  //three.js essemtials
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );
  var raycaster = new THREE.Raycaster();
  var stats = new Stats();
  var renderer = new THREE.WebGLRenderer();
  //set pixel ratio
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  //initialize the 2D renderer for UI
  labelRenderer = new THREE.CSS2DRenderer();
  labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = 0;
  document.body.appendChild( labelRenderer.domElement );
  document.body.appendChild( stats.dom );


  //sample cube from example
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  //interaction sphereInter
  var sphereInterGeo = new THREE.SphereBufferGeometry( 5 );
  var sphereInterMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  sphereInter = new THREE.Mesh( sphereInterGeo, sphereInterMat );
  sphereInter.visible = false;
  scene.add( sphereInter );

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


  $.getJSON( "http://api.airvisual.com/v2/countries?key=nmscM5TEYNutrJ2LN", function( data ) {
    var items = [];
    $.each( data, function( i, val ) {
      console.log(data.data);
      for (var i = 0; i < data.data.length; i++) {

      myDataDots.push(new myDataPoints(Math.random() * gridHelperSize -gridHelperSize/2,Math.random() * gridHelperSize -gridHelperSize/2,Math.random() * gridHelperSize -gridHelperSize/2,1,0.01,0.01));
      myDataDots[i].render(scene);
      myDataDots[i].text(data.data[i].country,scene);

      //appending datatodiv
      let listView = $("<li>");
      $(listView).text(data.data[i].country);

    }

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

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //dynamic window resizing
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
  }

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  }

  //cam and orbit initiate
  camera.position.set( 0, 20, 100 );
  controls.update();

  function animate() {
    requestAnimationFrame( animate );
    //orbit controls
    controls.update();
    //render function
    interaction();
    //update stats
    stats.update();
    //regular render
    renderer.render( scene, camera );
    //compositing render
    composer.render();
    //laber render
    labelRenderer.render( scene, camera );

    for (var i = 0; i < myDataDots.length; i++) {
      myDataDots[i].animate();

    }
  };

  function interaction() {

    // find intersections
    // camera.updateMatrixWorld();
    //
    // raycaster.setFromCamera( mouse, camera );
    //
    // var intersects = raycaster.intersectObjects( scene.children );
    //
    // if ( intersects.length > 0 ) {
    //
    //   if ( INTERSECTED != intersects[ 0 ].object ) {
    //     if ( INTERSECTED ) INTERSECTED.material.setHex( INTERSECTED.currentHex );
    //     INTERSECTED = intersects[ 0 ].object;
    //     INTERSECTED.currentHex = INTERSECTED.material.getHex();
    //     INTERSECTED.material.setHex( 0xff0000 );
    //   }
    // } else {
    //   if ( INTERSECTED ) INTERSECTED.material.setHex( INTERSECTED.currentHex );
    //   INTERSECTED = null;
    // }


  }

  animate();
  // renderer.render( scene, camera );

}
