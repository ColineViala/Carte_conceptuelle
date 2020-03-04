var renderer, scene, camera, mesh, container, mesh1;

init();
animate();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera); 

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    // Remove default OrbitControls event listeners
    controls.dispose();
    controls.update();

   // on créé la sphère et on lui applique une texture sous forme d’image
    var geometry = new THREE.SphereGeometry( 200, 32, 32 );
    var material = new THREE.MeshPhongMaterial({color: 0x44aa88});//Colorer la sphère (phongmaterial --> on voit mieux la 3D, jeu de lumières)
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(-500, 0, 0);
    scene.add( mesh );

    var geometry1 = new THREE.SphereGeometry( 200, 32, 32 );
    var material1 = new THREE.MeshPhongMaterial({color: 0xE82759});//Colorer la sphère (phongmaterial --> on voit mieux la 3D, jeu de lumières)
    mesh1 = new THREE.Mesh( geometry1, material1 );
    mesh1.position.set(0, 0, 0);
    scene.add( mesh1 );

    var cylinder = new THREE.CylinderBufferGeometry( 50, 50, 13, 42,34,0,6,6.3);
    var material3 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var link = new THREE.Mesh( cylinder, material3 );
    link.position.set(-250, 0, 0);
    scene.add( link );

    /*var material2 = new THREE.LineBasicMaterial({
        color: 0x00A0ff
    });
    
    var geometry2 = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( -10, 0, 0 ),
        new THREE.Vector3( 0, 10, 0 ),
        new THREE.Vector3( 10, 0, 0 )
    );
    
    var line = new THREE.Line( geometry, material );
    scene.add( line );*/

    // basic moon
    /*
	var moonTexture = THREE.ImageUtils.loadTexture( './Pitures/space3.png' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
	var moon = new THREE.Mesh( sphereGeom.clone(), moonmaterial );
	moon.position.set(-100, 50, 0);
    scene.add( moon );*/
    
    

    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

    document.addEventListener('mousemove', onDocumentMouseMove, false);


}

function onDocumentMouseMove( event ) {
    // Manually fire the event in OrbitControls
    controls.handleMouseMoveRotate(event);
}

function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
    // on fait tourner le cube sur ses axes x et y
    mesh1.rotation.x += 0.01;
    mesh1.rotation.y += 0.02;
    // on effectue le rendu de la scène
    
    renderer.render( scene, camera ) ;
}

function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

