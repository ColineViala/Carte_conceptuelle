var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
/*
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

var geometry = new THREE.SphereGeometry(1, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshBasicMaterial( {color: 0x94C0BE} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );



camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    //sphere.rotation.x += 0.01;
   sphere.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

