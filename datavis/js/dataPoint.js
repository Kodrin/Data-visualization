function myDataPoints(x,y,z,r,v,t){
  //positions
  const position = new THREE.Vector3();

  //data points look
  var gridDotGeo = new THREE.SphereGeometry( r, 32, 32 );
  var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

  var dataDiv = document.createElement( 'div' );

  //member variables
  var datapoint = new THREE.Mesh (gridDotGeo, gridDotMat);
  var dataLabel = new THREE.CSS2DObject( dataDiv );

  //position information
  var xPosInfo;
  var yPosInfo;

  datapoint.position.x = x;
  datapoint.position.y = y;
  datapoint.position.z = z;
  position.x = x;
  position.y = y;
  position.z = z;
  datapoint.v = v;
  datapoint.t = t;

  //trailLine
  this.startPosition = new THREE.Vector3().copy(position);
  this.position = new THREE.Vector3().copy(this.startPosition)
  this.lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff, transparent: false});
  const geometry = new THREE.Geometry();
  this.trailLine = new THREE.Line(geometry, this.lineMaterial);

  //member function
  this.animate =function(){
    // datapoint.position.x +=  v;
    // datapoint.rotation.x +=  t;

    datapoint.position.x -=  Math.sin(datapoint.position.y) * v;
    datapoint.position.z -=  -Math.cos(datapoint.position.y) * v;
    if (datapoint.position.x > 100) {
      datapoint.position.x +=  Math.sin(datapoint.position.y + Math.PI/2) * v *2;
      datapoint.position.z +=  -Math.cos(datapoint.position.y + Math.PI/2) * v *2;
      datapoint.position.x -=  Math.sin(datapoint.position.y) * v;
      datapoint.position.z -=  -Math.cos(datapoint.position.y) * v;
    }

    // datapoint.rotation.x +=  t;

    //update the labels
    dataLabel.position.x = datapoint.position.x;
    dataLabel.position.y = datapoint.position.y;
    dataLabel.position.z = datapoint.position.z;

    position.x = x;
    position.y = y;
    position.z = z;

    var xPosInfo = Math.round(position.x);
    var yPosInfo = Math.round(position.y);
  }


    this.initTrail=function (scene) {
    this.trail = true;

    this.positionsCount = 10000;
    this.oldPositions = [];
    for (let i = 0; i < this.positionsCount; i++) {
      this.oldPositions[i] = this.startPosition.clone();
    }

    // const geometry = new THREE.Geometry();
    geometry.vertices = this.oldPositions;
    // this.trailLine = new THREE.Line(geometry, this.lineMaterial);

    scene.add(this.trailLine);

    // Press T to show/hide trail
    // document.body.addEventListener('keyup', (e) => {
    //   if (e.key === 't' || e.key === 'T') {
    //     this.trail = !this.trail
    //   }
    //
    //   this.trailLine.visible = this.trail
    // })
  }

  this.updateTrail=function () {
    this.trailLine.geometry.vertices.push(this.position.clone());
    this.trailLine.geometry.vertices.shift();
    this.trailLine.geometry.verticesNeedUpdate = true;
  }

  this.resetTrail=function () {
    for (let i = 0; i < this.positionsCount; i++) {
      this.oldPositions[i].copy(this.position);
    }
  }



  this.text =function(title,wind,temperature,scene){
    // var dataDiv = document.createElement( 'div' );
    dataDiv.className = 'label';
    dataDiv.textContent =  title + "---" + "Wind Speed:" + wind +"  " + "Temp:" + temperature;
    dataDiv.style.left = '2em';
    dataDiv.style.top = '-1.6em';
    dataDiv.style.padding = '0';
    dataDiv.style.margin = '0';
    dataDiv.style.paddingLeft = '1em';
    dataDiv.style.paddingBottom = '1.6em';
    dataDiv.style.borderLeft = 'white solid 1.5px';
    // var dataLabel = new THREE.CSS2DObject( dataDiv );
    var widthTest = title.length*48;
    dataLabel.element.style.width = widthTest +"px";
    dataLabel.element.style.left = widthTest/2.3 +"px";
    dataLabel.position.set(x,y,z );
    scene.add( dataLabel );
  }

  this.render =function(scene){
    scene.add( datapoint );
    }
  } //end myRunningEllipse
//end window onload
