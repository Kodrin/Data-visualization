window.onload = function(){
  // let canvas = document.getElementById("canvas");

  //get the context
  // let context = canvas.getContext("2d");

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

  //labels
  var labelRenderer;

  //three.js essemtials
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );
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

  //data point
  // for (var i = 0; i < gridX; i++) {
  //       var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
  //       gridDot.position.x = Math.random() * gridHelperSize -gridHelperSize/2;
  //       gridDot.position.y = Math.random() * gridHelperSize -gridHelperSize/2;
  //       gridDot.position.z = Math.random() * gridHelperSize -gridHelperSize/2;
  //       scene.add( gridDot );
  // }

  //get api
  (function() {
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON( flickerAPI, {
      tags: "cat",
      tagmode: "any",
      format: "json"
    })
      .done(function( data ) {
        $.each( data.items, function( i, item ) {
          var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
          gridDot.position.x = Math.random() * gridHelperSize -gridHelperSize/2;
          gridDot.position.y = Math.random() * gridHelperSize -gridHelperSize/2;
          gridDot.position.z = Math.random() * gridHelperSize -gridHelperSize/2;

          //label for the data (text next to each dot!)
          var dataDiv = document.createElement( 'div' );
  				dataDiv.className = 'label';
  				dataDiv.textContent = 'entry';
          dataDiv.style.left = '2em';
          dataDiv.style.top = '-1.6em';
  				dataDiv.style.padding = '0';
          dataDiv.style.margin = '0';
          dataDiv.style.paddingLeft = '1em';
          dataDiv.style.paddingBottom = '1.6em';
          dataDiv.style.borderLeft = 'white solid 1.5px';
  				var dataLabel = new THREE.CSS2DObject( dataDiv );
  				dataLabel.position.set( gridDot.position.x, gridDot.position.y, gridDot.position.z );
  				scene.add( dataLabel );

          scene.add( gridDot );
          if ( i === 10 ) {
            return false;
          }
        });
      });
  })();

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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
  }

  //cam and orbit initiate
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

  };

  animate();
  // renderer.render( scene, camera );

}
