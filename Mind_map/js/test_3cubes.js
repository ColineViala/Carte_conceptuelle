var renderer, scene, camera, mesh;

main();
//animate();


  
function main(){
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
    var geometry = new THREE.SphereGeometry( 200, 32, 32 );
    var material = new THREE.MeshPhongMaterial({color: 0x44aa88});//Colorer la sphère (phongmaterial --> on voit mieux la 3D, jeu de lumières)
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
    
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    
        sphere.position.x = x;
    
        return sphere;
      }
    
      const spheres = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];
    
      function render(time) {
        time *= 0.001;  // convert time to seconds
    
        spheres.forEach((cube, ndx) => {
          const speed = 1 + ndx * .1;
          const rot = time * speed;
          sphere.rotation.x = rot;
          sphere.rotation.y = rot;
        });
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    
    }
    




/*function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
    // on fait tourner le cube sur ses axes x et y
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}*/

