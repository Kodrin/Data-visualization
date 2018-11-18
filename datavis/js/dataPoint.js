function myDataPoints(x,y,z,r,v){
  //data points look
  var gridDotGeo = new THREE.SphereGeometry( r, 32, 32 );
  var gridDotMat = new THREE.MeshBasicMaterial( { color: 0xffffff } )

  //member variables
  var datapoint = new THREE.Mesh (gridDotGeo, gridDotMat);
  datapoint.position.x = x;
  datapoint.position.y = y;
  datapoint.position.z = z;
  datapoint.v = v;
//member function
  this.animate =function(){

  }


  this.text =function(title,scene){
    var dataDiv = document.createElement( 'div' );
    dataDiv.className = 'label';
    dataDiv.textContent =  title;
    dataDiv.style.left = '2em';
    dataDiv.style.top = '-1.6em';
    dataDiv.style.padding = '0';
    dataDiv.style.margin = '0';
    dataDiv.style.paddingLeft = '1em';
    dataDiv.style.paddingBottom = '1.6em';
    dataDiv.style.borderLeft = 'white solid 1.5px';
    var dataLabel = new THREE.CSS2DObject( dataDiv );
    dataLabel.position.set(x,y,z );
    scene.add( dataLabel );
  }

  this.render =function(scene){
    scene.add( datapoint );
    }
  } //end myRunningEllipse
//end window onload
