var scene = new THREE.Scene();//Creation scene
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );//Creation perspective

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

//var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);//Objet contenant tous les points et faces de la sphere
var geometry = new THREE.SphereGeometry(3, 10, 50, 0, Math.PI * 2, 0, Math.PI * 2);//Objet contenant tous les points et faces de la sphere

var material = new THREE.MeshNormalMaterial();//Colorer la sphère
var sphere = new THREE.Mesh(geometry, material);//Appliquer la couleur a la sphere
scene.add(sphere);//on ajoute notre sphere a la scene


camera.position.z = 10;
// appel boucle de rendu ou d'animation : créera une boucle qui amènera 
// le moteur de rendu à dessiner la scène à chaque rafraîchissement de l'écran

// Cela sera exécuté à chaque image (normalement 60 fois par seconde) et donnera au cube 
// une belle animation de rotation. 
var render = function () {
    requestAnimationFrame(render);

    sphere.rotation.y += 0.03;

    renderer.render(scene, camera);
};

render();