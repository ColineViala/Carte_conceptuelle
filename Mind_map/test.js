var container, stats;

var camera, controls, scene, renderer;
var mouse = new THREE.Vector2(),
    INTERSECTED;


var sphereTab = [];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1000;

    controls = new THREE.OrbitControls(camera);


    scene = new THREE.Scene();




    var geoSphere = new THREE.SphereGeometry(Math.random() * 30 + 10, 20, 20);
    for (var i = 0; i < 100; i++) {
        // randRadius = Math.random()*30+10;
        lumiereS = new THREE.MeshPhongMaterial({
            emissive: '#fff'

        });
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 30 + 10, 20, 20), lumiereS));

    }
    var posX = -350;
    var posY = -350;
    for (var i = 0; i < sphereTab.length; i++) {
        sphereTab[i].position.set(posX, posY, Math.random() * 800 - 200);

        posX += Math.random() * 4 + 75;
        if (posX >= 350) {
            posX = -350;
            posY += Math.random() * 7 + 75;
        }
        scene.add(sphereTab[i]);
    }

    // lights

    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(4, 4, 4);
    scene.add(light);

    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(-4, -4, -4);
    scene.add(light);




    //render
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.sortObjects = false;
    renderer.setClearColor(0x3AC7FB, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    stats = new Stats();

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    document.addEventListener('mouseup', onDocumentMouseClick, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onmousemove, false);
    document.getElementById('div').addEventListener('click', changeTexture, false);
    document.getElementById('div2').addEventListener('click', changeTexture2, false);
    document.getElementById('div3').addEventListener('click', changeTexture3, false);
    document.getElementById('div4').addEventListener('click', changeTexture4, false);
    window.addEventListener('resize', onWindowResize, false);

    var info = document.getElementById('div');
    info.style.position = 'absolute';
    info.style.bottom = '190px';
    info.style.left = '20px';
  
    

    var info = document.getElementById('div2');
    info.style.position = 'absolute';
    info.style.bottom = '130px';
    info.style.left = '20px';
    

    var info = document.getElementById('div3');
    info.style.position = 'absolute';
    info.style.bottom = '70px';
    info.style.left = '20px';
    
    var info = document.getElementById('div4');
    info.style.position = 'absolute';
    info.style.bottom = '10px';
    info.style.left = '20px';
    

    var info = document.getElementById('title');
    info.style.position = 'absolute';
    info.style.left = '40%';
    info.style.top = '15px';
    info.innerHTML = 'Chose a color  :  Click on the Bubbles';
  var info = document.getElementById('couleur');
  info.style.position='absolute';
  info.style.bottom='50%';
  info.style.left='160px';
  info.style.margin='-125px';
  
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function changeTexture() {
    textureOn = 1;
    couleur = '0xffc12d';
}

function changeTexture2() {
    textureOn = 1;
    couleur = '0x3e3e3e';

}

function changeTexture3() {
    textureOn = 1;
    couleur = '0x19b152';

}

function changeTexture4() {
    textureOn = 1;
    couleur = '0xb1192b';

}

function onDocumentMouseClick(event) {
    mouse.x = -10000000;
    mouse.y =-10000000;
}

function onDocumentMouseDown(event) {
    
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
}

function onmousemove(event) {
    mouse.x = -10000000;
    mouse.y = -10000000;
}

function animate() {
    var timer = 0.0001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sphereObjet = sphereTab[i];
        sphereObjet.position.x = 500 * Math.cos(timer + i);
        // sfere.position.y = 500 * Math.sin( timer + i * 1.1 );
        sphereObjet.position.z = 500 * Math.sin(timer + i * 1.1);
    }
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[0].object;
            // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            if (textureOn == 1) {
               
                INTERSECTED.material.emissive.setHex(couleur);
                         
              
            }
        }
    }
    renderer.render(scene, camera)
}