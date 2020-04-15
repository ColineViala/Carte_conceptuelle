var numSphere = 0
var numLink=100;
var canvas, scene, renderer, camera;
var SphereDraggedNum;
var raycaster;  // A THREE.Raycaster for user mouse input.
var indexSphereDeleted;
var indexSphere;
var deleteSphere=0;
var gridHelper; 
let angle=0;
var sphere;  // A sphere = 3D representation of a concept
var label;
var link;//A line = a link (entity) between two concepts 
var world;  // An Object3D that contains all the mesh objects in the scene.
// Rotation of the scene is done by rotating the world about its
// y-axis.  (I couldn't rotate the camera about the scene since
// the Raycaster wouldn't work with a camera that was a child
// of a rotated object.)
var treeOfLinks= [];//list which contain all information about all the link of the mind map
var listSpheres2= [];
var listLink = []; 
var fruits = [ ["Fruits", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"]];  //this list is a example of name that the users can give to his sphere
//var listLinks = [];
var ROTATE = 1, DRAG = 2, RENAME=3, DELETE = 4;  // Possible mouse actions
var mouseAction;  // currently selected mouse action
var dragItem;  // the sphere that is being dragged, during a drag operation
var intersects; //the objects intersected	
var targetForDragging;  // An invisible object that is used as the target for raycasting while
// dragging a sphere.  I use it to find the new location of the
// sphere.  I tried using the ground for this purpose, but to get
// the motion right, I needed a target that is at the same height
// above the ground as the point where the user clicked the sphere.
var preexistinglinks = ["red","blue","green"]; //this list conntains all the link's label preexisting when the user load the page
//let nbCreatedLinks =0; //this  
//let numLinklabel=0;


function render() { 
    renderer.render(scene,camera);
}

function createWorld() {
        scene = new THREE.Scene();
        renderer.setClearColor(0x333333);
        camera = new THREE.PerspectiveCamera(27,canvas.width/canvas.height,10,100);
        camera.position.z = 60;
        camera.position.y = 30;
        camera.position.x = 20;
        camera.lookAt( new THREE.Vector3(0,0,0) );
        camera.add(new THREE.PointLight(0xffffff,0.7)); // point light at camera position
        scene.add(camera);
        scene.add(new THREE.DirectionalLight(0xffffff,0.5)); // light shining from above.
        
        world = new THREE.Object3D();
        scene.add(world);
        var size = 40;
        var divisions = 40;
        gridHelper =new THREE.GridHelper( size, divisions,0xb66bb0,0xa6a6a6 );
        gridHelper.position.y=0; 
        scene.add(gridHelper);
        document.getElementById("myCheck").checked = false; //checkbox not checked in the beginning, the user will be able to check it if he want the show the gridHelper
        gridHelper.visible = false; //gridHelper not visible in the beginning 
        document.getElementById("label").checked = true;
     
        targetForDragging = new THREE.Mesh(
            new THREE.BoxGeometry(100,0.01,100),
            new THREE.MeshBasicMaterial()
        );
        targetForDragging.material.visible = false;
        addExemple("beginning");
        render();
     
        
    }
     
    function addExemple(arg){
        
        if(listSpheres2.length==0){
            var canvasIsEmpty="true";
        }else{ 
            var canvasIsEmpty="false";
        }
        //console.log(listSpheres2.length);
        if(canvasIsEmpty=="true" | arg=="beginning"){
            canvasIsEmpty="false";            
            fruits = [ ["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"]];  //this list is a example of name that the users can give to his sphere
            numSphere = 0
            numLink=100;
            angle=0;
            addSphere(0,0,0);
            addSphere(-7,4,5);
            addSphere(8,5,5);
            addSphere(4,6,-6);
            addLink(fruits[0][0],fruits[1][0],preexistinglinks[0]);
            listSpheres2[0].connectedSphere.push(1);
            listSpheres2[1].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[1].label[0].name);
            listSpheres2[1].connectedSphereName.push(listSpheres2[0].label[0].name);
            addLink(fruits[0][0],fruits[2][0],preexistinglinks[1]);
            listSpheres2[0].connectedSphere.push(2);
            listSpheres2[2].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[2].label[0].name);
            listSpheres2[2].connectedSphereName.push(listSpheres2[0].label[0].name);
            addLink(fruits[0][0],fruits[3][0],preexistinglinks[2]);
            listSpheres2[0].connectedSphere.push(3);
            listSpheres2[3].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[3].label[0].name);
            listSpheres2[3].connectedSphereName.push(listSpheres2[0].label[0].name); 


        }else {
            console.log("erreé",canvasIsEmpty);
            if (window.confirm('Do you want to empty your mind map ?') ){
                deleteObjects();
                canvasIsEmpty="false";
                fruits = [ ["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"]];  //this list is a example of name that the users can give to his sphere    
                numSphere = 0
                numLink=100;
                angle=0;
               addSphere(0,0,0);
                addSphere(-7,4,5);
                addSphere(8,5,5);
                addSphere(4,6,-6);
                addLink(fruits[0][0],fruits[1][0],preexistinglinks[0]);
                listSpheres2[0].connectedSphere.push(1);
                listSpheres2[1].connectedSphere.push(0);
                listSpheres2[0].connectedSphereName.push(listSpheres2[1].label[0].name);
                listSpheres2[1].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],preexistinglinks[1]);
                //console.log("ere",listSpheres2[0].connectedSphere);
                addLink(fruits[0][0],fruits[2][0],preexistinglinks[1]);
                listSpheres2[0].connectedSphere.push(2);
                listSpheres2[2].connectedSphere.push(0);
                listSpheres2[0].connectedSphereName.push(listSpheres2[2].label[0].name);
                listSpheres2[2].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],preexistinglinks[1]);
                addLink(fruits[0][0],fruits[3][0],preexistinglinks[2]);
                listSpheres2[0].connectedSphere.push(3);
                listSpheres2[3].connectedSphere.push(0);   
                listSpheres2[0].connectedSphereName.push(listSpheres2[3].label[0].name);
                listSpheres2[3].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],preexistinglinks[1]); 
            }else{
                //we do nothing 
            }
        }
    //document.getElementById("autoRotate").checked = true;
    rotateworld();
    }
     
    function deleteObjects(){
        for(let j=0;j<listLink.lentgh;j++){
            updateLink(listLink[j].name,0);
        }
        for(let i=0;i<listSpheres2.length;i++){
            removeLink(listSpheres2[i].label[0].name); 
            
            world.remove(listSpheres2[i].label[0]);
            world.remove(listSpheres2[i]);
            //listSpheres2.splice(listSpheres2[i].name, 1);
            
        }
        listSpheres2=[];
        listLink=[];
        render();
    }

//---------------------------------------ADD A SPHERE IN THE 3D POSITION------------------------------------------------------
function addSphere(x,y,z,noLabel=true,name_sphere){ // if a label already exist (when the addSphere is called in addNewSphere for example), noLabel=false and we doesn't need to call addLabel in this function .
    
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1,32,32),
        new THREE.MeshLambertMaterial( {color: fruits[numSphere][1]} )
    );
    //the sphere has coords in 3D : x,y and z
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    
    
    sphere.name = numSphere;
	sphere.link = [];
    sphere.label = [];
    sphere.connectedSphere =[];
    sphere.connectedSphereName =[];
    sphere.linkName =[];
    
    listSpheres2.push(sphere);//coords spheres's list
    numSphere+=1;//incr the sphere's number each time we make one
    var object = scene.getObjectByName( sphere.name, true );
    world.add(sphere);//add the new sphere to the world
    if(noLabel==false && name_sphere!="undefinied"){
        addSphereLabel(sphere,name_sphere);
    }
    else if(noLabel==true){ //the label of the sphere already exist
        addSphereLabel(sphere);
    }
}
//-------------------------------------------------------------------------------------------------------------------------

function addLinkedSphere(sphere1,sphere2){
    var indexSphere1 = findIndexSphere(sphere1);
    var indexSphere2 = findIndexSphere(sphere2);
    listSpheres2[indexSphere1].connectedSphere.push(listSpheres2[indexSphere1].name);
    listSpheres2[indexSphere2].connectedSphere.push(listSpheres2[indexSphere2].name);
    listSpheres2[indexSphere1].connectedSphereName.push(listSpheres2[indexSphere2].label[0].name);
    listSpheres2[indexSphere2].connectedSphereName.push(listSpheres2[indexSphere1].label[0].name);
   
    addLink(sphere1,sphere2,name_link.value);
    preexistinglinks.push("roller");
    console.log("preexistinglinks",preexistinglinks);
}

//---------------------------------------LINK CREATION BETWEEN 2 SPHERES------------------------------------------------------
function addLink(sphere1,sphere2,nameLabel){
    //3D creation of the link in the world
    /*
    if (sphere1 !== parseInt(sphere1, 10)){
        sphere1 = parseInt(sphere1);
    }
    if (sphere2 !== parseInt(sphere2, 10)){
        sphere2 = parseInt(sphere2);
    }*/

    //console.log(sphere1);
    var indexSphere1 = findIndexSphere(sphere1);
    var indexSphere2 = findIndexSphere(sphere2);
    
    //console.log("tg",listSpheres2[indexSphere1].position.x);
    //console.log("tg 2",listSpheres2[indexSphere2].position.x);

    var material = new THREE.LineBasicMaterial({color: 0xf1f2f6});
    var points = [];//list of points making the link/line (3D space coordinates)
    points.push( new THREE.Vector3( listSpheres2[indexSphere1].position.x, listSpheres2[indexSphere1].position.y, listSpheres2[indexSphere1].position.z ) );//first point
    points.push( new THREE.Vector3( listSpheres2[indexSphere2].position.x, listSpheres2[indexSphere2].position.y, listSpheres2[indexSphere2].position.z ) );//second point
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( geometry, material );//line is made from the material and the points coords
    world.add(line);//add the line to our world
    line.name = numLink;//give a name=number to the link we just have made
    line.label=[];
    line.middleposition= [ (listSpheres2[indexSphere1].position.x+listSpheres2[indexSphere2].position.x)/2, (listSpheres2[indexSphere1].position.y+listSpheres2[indexSphere2].position.y)/2, (listSpheres2[indexSphere1].position.z+listSpheres2[indexSphere2].position.z)/2]
    numLink+=1;//incr link's number each time we make one
    listLink.push(line);//add the links in the list after creation
    
    if(nameLabel != "undefined"){ //the label of the sphere already exist
        addLinkLabel(line, nameLabel);
    }
    /*
    else{
        addLinkLabel(line,name_link.value);
    }*/
    listSpheres2[indexSphere1].link.push(line.name);//add the link number/name to each sphere is connected with 
    listSpheres2[indexSphere2].link.push(line.name);//after the sphere coordinates
    listSpheres2[indexSphere1].linkName.push(nameLabel);
    listSpheres2[indexSphere2].linkName.push(nameLabel);
    render();
}
//-------------------------------------------------------------------------------------------------------------------------

//----------------------------LINK MODIFICATION : REMOVE AND ADD A NEW ONE WHEN AND WHERE THE SPHERE MOVE------------------
function updateLink(num,add){//if add=1 -> add ; add=0 -> just delete not add after
    var numinlist;
    var SphereList = [];
    var nom;
    for(let i=0;i<listLink.length;i++){//i varies in listLink array
        if(listLink[i].name == num){//if the number in the list equals the function parameter (the num of the link we want to remove)
            numinlist=i;//link number is the list = counter
        }
    }
    nom = listLink[numinlist].label[0].name;
    listLink[numinlist].geometry.dispose();//-----------------------
    listLink[numinlist].material.dispose();//-----------------------
    world.remove( listLink[numinlist] );//remove the link by his number
    world.remove(listLink[numinlist].label[0]);
    listLink.splice(numinlist,1);//remove the number of the link of the links list
    //console.log("here",numinlist);
    for(let i=0; i<listSpheres2.length; i++){
        if(listSpheres2[i].link.length>0){
            for(let j=0; j<listSpheres2[i].link.length; j++){
                if (listSpheres2[i].link[j] == num){
                    SphereList.push(listSpheres2[i].label[0].name);
                    listSpheres2[i].link.splice(j,1);
                    console.log("nom =",nom);//name link to delete 
                    var nameDeletedSphere=listSpheres2[i].label[0].name;
                }
            }
        }
    }
    if(add==0){
        for(let i=0; i<listSpheres2.length; i++){
            listSpheres2[i].connectedSphereName.splice(nameDeletedSphere,1);
            listSpheres2[i].linkName.splice(nom,1);
        }
        console.log("nom link dele",nom);
    }
    console.log("listSpheres2=",listSpheres2);//name link to delete 

    if(add==1){
        addLink(SphereList[0], SphereList[1], nom);
        var index = listSpheres2[1].linkName.indexOf(nom);
        if (index !== -1) {
            listSpheres2[1].linkName[index] = nom;
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------------

//-----------------------------SHOW INFORMATIONS ABOUT THE SPHERE WHEN THE USER TOUCH IT------------------------------------------
/*
function showInfoSphereOnClick(sphereObject) {
    let counter1=0;
    let nb_link=0;
    var link_Name="";
    var nameLinkedSphere = "";  //string with contain the name of all the sphere connected to the selected sphere
    
    
    nb_link=sphereObject.link.length;	
    while(counter1<nb_link){
        if(nb_link==1){
            link_Name=sphereObject.link[0]+ ".";
        }else if(counter1<nb_link-2){
            link_Name+= sphereObject.link[counter1]+", ";
        }else if(counter1<nb_link-1){
            link_Name+= sphereObject.link[counter1];
        }else{
            link_Name+= " and "+ sphereObject.link[counter1] +".";
        }
        counter1++;
    }
    console.log("nb_link",nb_link);
	console.log("link_name",link_Name);
    let counter2=0;
    //console.log("ere", sphereObject.connected);
    while(counter2<nb_link){
        if(nb_link==1){
            //sphereObject.connected[0];
            nameLinkedSphere= fruits[sphereObject.connected[0]][0]+ ".";
        }/*else if(counter2<nb_link-1){
            nameLinkedSphere+= fruits[sphereObject.connected[counter2]][0]+ ", ";
        }else{
            nameLinkedSphere+="and "+ fruits[sphereObject.connected[counter2]][0]+ ".";
        }
        counter2++;
    }
    
    console.log("link-name", link_Name);
    console.log("namelinkedsphere ", nameLinkedSphere);
    console.log("namelinkedspherelength ", treeOfLinks[4][1]);
    
    document.getElementById("name-sphere").innerHTML = "The name of the sphere is : " + fruits[name_sphere][0] + ".";
    if(nb_link>1){document.getElementById("nb-link").innerHTML = "The sphere '" + fruits[name_sphere][0] + "' is linked to "+ nb_link + " links which are : "+ link_Name+" Sphere '" + fruits[name_sphere][0] + "' is connected to the spheres : "+ nameLinkedSphere;}
    else if(nb_link==1){document.getElementById("nb-link").innerHTML = "The sphere '" + fruits[name_sphere][0] + "' is linked to "+ nb_link + " link which is : "+ link_Name+" Sphere '" + fruits[name_sphere][0] + "' is connected to the sphere "+ nameLinkedSphere;}
    else{document.getElementById("nb-link").innerHTML = "The sphere '" + fruits[name_sphere][0] + "' is not linked to any other sphere.";}
    //document.getElementById("info-link").innerHTML = "The sphere is linked to the sphere '+ name_linked_sphere + ' by the link '"+ link_Name;
    
    
}*/

//--------------------------------------INCR OF UPDATE LINK EACH TIME WE DRAG A SPHERE------------------------------------
//=AT ANY TIME
function dragLink(name){
    //console.log("name",name);
    var indexSphere2 = findIndexSphere(name);
    var listLinks=[];
    if(listSpheres2[name].link.length>0){//that's mean there is a line or more
        
        for(let k=0;k<listSpheres2[name].link.length;k++){
            listLinks.push(listSpheres2[name].link[k]);
        }
                    
    }
    for(let j=0; j<listLinks.length;j++){
        
        updateLink(listLinks[j],1);
    }

}
//-------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------INCR OF UPDATE LINK EACH TIME WE DRAG A SPHERE------------------------------------
//=AT ANY TIME
function removeLink(num){
    //!\ pb avec num = undefined (disparait de listSpheres après suppression)
    var listLinks=[];
    
    var indexSphere = findIndexSphere(num);
    if(listSpheres2[indexSphere].link.length>0){//that's mean there is a line or more
            
        for(let k=0;k<listSpheres2[indexSphere].link.length;k++){
                listLinks.push(listSpheres2[indexSphere].link[k]);
        }
                        
    }
    
    for(let j=0; j<listLinks.length;j++){
        
        updateLink(listLinks[j],0);
    }

}
//-------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------UPDATE SPHERE------------------------------------------------------
function addNewSphere(Zaxis){
    var sphereLabel;
    var same='false';
    for (let i=0;i<CreateLabelTab().length;i++){
        sphereLabel=CreateLabelTab()[i];
        console.log(sphereLabel);
        if(sphereLabel == name_sphere.value){
           same=true; 
        }
    }
   
    if(Zaxis>=-100 && Zaxis<=100 && same=='false'){
        // /!\ SI TEMPS FAIRE UN RANDOM ICI /!\
        var locationX = getRandomNumber(-20, 20);  // Gives the point of intersection in world coords
        var locationZ = getRandomNumber(-20, 20);
        var locationY;
        //var Zaxis = prompt("Please enter a number between 100 and -100 to choose the height of the object (relative to the grid) that you are moving:",40);
        if (Zaxis == null || Zaxis == "" || (isFloat(parseFloat(Zaxis))==false && isInteger(parseFloat(Zaxis))==false) ){
            locationY=10; //default value if the value entered is not correct
        } else {
            locationY = parseFloat(Zaxis/10);
        }
        var coords = new THREE.Vector3(locationX, locationY,locationZ);
        world.worldToLocal(coords);  // to add sphere in correct position, neew local coords for the world object
        addSphere(coords.x,coords.y,coords.z, false);//in 3D
        sphere = listSpheres2[listSpheres2.length-1]
        addSphereLabel(sphere,name_sphere.value);
        sphere.label[0].lookAt( camera.position );
        
    }
    else{
        alert("For a better vision of the map, the number chosen must be between -100 et 100 and choose a new name for your sphere");
    }
    render();
  
}

//-------------------------------------------------------------------------------------------------------------------------
