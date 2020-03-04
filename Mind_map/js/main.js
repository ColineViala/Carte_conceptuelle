var container, loader;
var camera, fov = 50, scene, renderer;
var cameraCube, sceneCube;

var pointLight;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousewheel', onDocumentMouseWheel, false);

init();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild( container );

	// Création camera(s) et scène(s)
	camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 2000;
	cameraCube = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 100 );

	scene = new THREE.Scene();
	sceneCube = new THREE.Scene();

	// Eclairage de la scène 
	var ambient = new THREE.AmbientLight(0xFFFFFF);
	scene.add(ambient);

	pointLight = new THREE.PointLight(0xffffff, 2);
	scene.add(pointLight);

	// Chargement de notre objet
	var loader = new THREE.JSONLoader();
	loader.load("obj/android.json", function(geometry, mat) {
			var material = new THREE.MeshFaceMaterial(mat);
			var object = new THREE.Mesh(geometry, material);
			object.scale.set(50, 50, 50);
			object.position.set(0,0,0);
			scene.add(object);
	    }
	);


	// Chargement de la Skybox
	var path = "img/skybox/ocean/";
	var format = '.jpg';
	var urls = [
		path + 'right' + format,
		path + 'left' + format,
		path + 'top' + format,
		path + 'bottom' + format,
		path + 'back' + format,
		path + 'front' + format
	];

	var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = new THREE.CubeTexture( reflectionCube.image, THREE.CubeRefractionMapping );
	refractionCube.format = THREE.RGBFormat;

	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = reflectionCube;

	var material = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material);
	sceneCube.add(mesh);

	// Rendu de la scène
	renderer = new THREE.WebGLRenderer({
  		devicePixelRatio: window.devicePixelRatio || 1
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	container.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	cameraCube.aspect = window.innerWidth / window.innerHeight;
	cameraCube.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseMove(event) {
	mouseX = ( event.clientX - windowHalfX ) * 4;
	mouseY = ( event.clientY - windowHalfY ) * 4;
}

function onDocumentMouseWheel(event) {
	var wDelta = event.wheelDelta < 0 ? 'down' : 'up';
	if(wDelta == 'down') {
   		camera.fov += camera.fov * 0.05;
	} else {
	   	camera.fov -= camera.fov * 0.05;
	}
   	camera.updateProjectionMatrix();
}


function animate() {
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	requestAnimationFrame(animate);
	render();
}


function render() {
	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (- mouseY - camera.position.y) * 0.05;

	camera.lookAt(scene.position);
	cameraCube.rotation.copy(camera.rotation);

	renderer.render(sceneCube, cameraCube);
	renderer.render(scene, camera);
}

