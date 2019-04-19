/*
THIS SCRIPT POPULATES EVERYTHING ELSE ASIDE FROM THE DATA POINTS
- BACKGROUND STARS
- GRID HELPERS
- PLANE
- ENVIRONMENT
*/

// var starCount = 100; //
// var gridSpacing = 100;
// var gridHelperSize = 120;
// var gridHelperDivisions = 8;
// var axisBounds = 500; //bounds of x,y,z axis

//sample cube from example
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var cube = new THREE.Mesh( geometry, material );

//environment limits
var lineMat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
var envGeo = new THREE.SphereBufferGeometry( 100, 100, 100 );
var envWire = new THREE.WireframeGeometry( envGeo );
var envLine = new THREE.LineSegments( envWire );
envLine.material.depthTest = false;
envLine.material.opacity = 0.19;
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


//data points look
var gridDotGeo = new THREE.SphereGeometry( 0.5, 32, 32 );
var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

//defines the grid
var gridHelper = new THREE.GridHelper( gridHelperSize, gridHelperDivisions );

//plane helper
var plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
var planeMat = new THREE.MeshBasicMaterial( { color: 0xffffff} )
var helper = new THREE.PlaneHelper( plane, 1, planeMat );

//POPULATE THE BACKGROUND WITH DOTS
for (var i = 0; i < starCount; i++) {
      var gridDot = new THREE.Mesh (gridDotGeo, gridDotMat);
      gridDot.position.x = Math.random() * 800 - 400;
      gridDot.position.y = Math.random() * 800 - 400;
      gridDot.position.z = Math.random() * 800 - 400;
      scene.add( gridDot );
}

//adding env objects
scene.add( cube );
scene.add(envLine);
scene.add(lineX);
scene.add(lineY);
scene.add(lineZ);
scene.add( gridHelper );
scene.add( helper );
