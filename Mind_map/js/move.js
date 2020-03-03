var container;

var renderer, camera, controls, scene, axesHelper;
var geometry, material, mesh, lumiere;

init();
animate();
onWindowResize();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);
    
   // on créé la sphère et on lui applique une texture sous forme d’image
    geometry = new THREE.SphereGeometry( 200, 32, 32 );
    material = new THREE.MeshPhongMaterial({color: 0x44aa88});//Colorer la sphère (phongmaterial --> on voit mieux la 3D, jeu de lumières)
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    // on ajoute une lumière blanche
    lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
	scene.add( lumiere );
	
	/*
	var raycaster = new THREE.Raycaster();
	raycaster.set(sphere.position, new THREE.Vector3(0, -1, 0));
	sphere.position.y = intersects[0].point.y + 0.1;//radius of sphere
	*/
}


function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
    // on fait tourner le cube sur ses axes x et y
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    // on effectue le rendu de la scène
    
    renderer.render( scene, camera ) ;
}
/*

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);
*/