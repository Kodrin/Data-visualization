window.onload = function(){
  //grid var
  var gridX = 100;
  var gridY = 100;
  var gridZ = 100;
  var gridSpacing = 5;

  var size = 50;
  var divisions = 50;

  //object storage
  // var gridDot = [];

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  var gridDotGeo = new THREE.SphereGeometry( 0.1, 32, 32 );
  var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

  var gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

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
        gridDot.position.x = Math.random() * size -25;
        gridDot.position.y = Math.random() * size -25;
        gridDot.position.z = Math.random() * size -25;
        scene.add( gridDot );
  }

  camera.position.set( 0, 20, 100 );
  controls.update();

  var animate = function () {
    requestAnimationFrame( animate );
    controls.update();

    renderer.render( scene, camera );
  };

  animate();
  // renderer.render( scene, camera );

}
