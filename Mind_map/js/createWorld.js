//-------------------------------------------GLOBAL VARIABLES DECLARATION----------------------
var numSphere = 0
var numLink=100;
var canvas, scene, renderer, camera;
var raycaster;  // A THREE.Raycaster for user mouse input.
var indexSphere;//sphere's number in listSpheres2
var gridHelper; //a grid
let angle=0;
var sphere;  // A sphere = 3D representation of a concept
//var label;
//var link;//A line = a link (entity) between two concepts 
var SphereDraggedNum;
var world;  // An Object3D that contains all the mesh objects in the scene.
// Rotation of the scene is done by rotating the world about its
// y-axis.  (I couldn't rotate the camera about the scene since
// the Raycaster wouldn't work with a camera that was a child
// of a rotated object.)
//var treeOfLinks= [];//list which contain all information about all the link of the mind map
var listSpheres2= [];//list of spheres objects, which contains her properties
var listLink = []; 
var fruits = [ ["Fruits", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"]];  //this list is a example of name that the users can give to his sphere
var ROTATE = 1, DRAG = 2, RENAME=3, DELETE = 4;  // Possible mouse actions
var mouseAction;  // currently selected mouse action
var dragItem;  // the sphere that is being dragged, during a drag operation
var intersects; //the objects intersected	
var targetForDragging;  // An invisible object that is used as the target for raycasting while
// dragging a sphere.  Find the new location of the sphere
var preexistinglinks = ["red","blue","green"]; //this list conntains all the link's label preexisting when the user load the page
//----------------------------------------------------------------------------------------------


//---------------------------------------------FUNCTIONS----------------------------------------
//------------------- view the object in the three-dimensional concept map editor---------------

function render() { 
    
    renderer.render(scene,camera);
}
//----------------------------------------------------------------------------------------------
//---------------------------------------------WORLD CREATION-----------------------------------
//this function is necessary, before creating object, canvas, scene and camera are needed
//it is the basis of the 3D scene 
function createWorld() {
        canvas = document.querySelector('#maincanvas');//canvas is the drawing area
        scene = new THREE.Scene();//creating the scene : limited space for the objects
        renderer = new THREE.WebGLRenderer({canvas});//add the rendering engine
        renderer.setClearColor(0x333333);
        camera = new THREE.PerspectiveCamera(27,canvas.width/canvas.height,10,100);//the user's viewing angle to the scene. 
        camera.position.z = 60;//set the camera position in the scene 3D
        camera.position.y = 30;
        camera.position.x = 20;
        camera.lookAt( new THREE.Vector3(0,0,0) );//Rotates the object to face the point (0,0,0)
        camera.add(new THREE.PointLight(0xffffff,0.7)); // point light at camera position
        scene.add(camera);
        scene.add(new THREE.DirectionalLight(0xffffff,0.5)); // light shining from above.
        
        world = new THREE.Object3D();//under space in the scene, will contains objects
        scene.add(world);//add the world to the scene
        var size = 40;
        var divisions = 40;
        gridHelper =new THREE.GridHelper( size, divisions,0xb66bb0,0xa6a6a6 );//create gridhelper and set his properties
        gridHelper.position.y=0; //set the grid vertical position to zero
        scene.add(gridHelper);//add the object to the scene
        document.getElementById("myCheck").checked = false; //checkbox not checked in the beginning, the user will be able to check it if he want the show the gridHelper
        gridHelper.visible = false; //gridHelper not visible in the beginning 
        document.getElementById("label").checked = true;//box checked as the beginning, so the user could see the sphere's labels 
     
        targetForDragging = new THREE.Mesh(//create the targetfordragging object and set his properties
            new THREE.BoxGeometry(100,0.01,100),//will be used to see where the dragged sphere move
            new THREE.MeshBasicMaterial()
        );
        targetForDragging.material.visible = false;//target not visible
        addExemple("beginning");
        render();
     
        
    }
    
    //----------------------------------------------------------------------------------------------
//----------------------------------START THE USER EMPERIENCE WITH AND EXEMPLE-----------------------------------
    function addExemple(arg){//if the user want to the the example : 
        //by default as the beginning and if he pushed the button "Show Example"
        
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
            //add the 3 spheres as an example for the user 
            addSphere(0,0,0);
            addSphere(-7,4,5);
            addSphere(8,5,5);
            addSphere(4,6,-6);
            //add links between spheres to complete the example
            addLink(fruits[0][0],fruits[1][0],0,preexistinglinks[0]);
            //filling lists with the number and the sphere name for each sphere 
            //to store this informations and use them for create the JSON file
            listSpheres2[0].connectedSphere.push(1);
            listSpheres2[1].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[1].label[0].name);
            listSpheres2[1].connectedSphereName.push(listSpheres2[0].label[0].name);
            addLink(fruits[0][0],fruits[2][0],0,preexistinglinks[1]);
            listSpheres2[0].connectedSphere.push(2);
            listSpheres2[2].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[2].label[0].name);
            listSpheres2[2].connectedSphereName.push(listSpheres2[0].label[0].name);
            addLink(fruits[0][0],fruits[3][0],0,preexistinglinks[2]);
            listSpheres2[0].connectedSphere.push(3);
            listSpheres2[3].connectedSphere.push(0);
            listSpheres2[0].connectedSphereName.push(listSpheres2[3].label[0].name);
            listSpheres2[3].connectedSphereName.push(listSpheres2[0].label[0].name); 
        }else {
            console.log("erreé",canvasIsEmpty);
            if (window.confirm('Do you want to empty your mind map ?') ){//user want to delete the example from the scene to do his own map
                deleteObjects();//remove objects from scene in a row
                canvasIsEmpty="false";
                fruits = [ ["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"],["Banana", "yellow"],["Apple","red"] ,["Blueberry","blue"] ,["Lime", "green"],["Raspberry","purple"], ["Orange","orange"]];  //this list is a example of name that the users can give to his sphere    
                numSphere = 0
                numLink=100;
                angle=0;
               addSphere(0,0,0);
                addSphere(-7,4,5);
                addSphere(8,5,5);
                addSphere(4,6,-6);
                addLink(fruits[0][0],fruits[1][0],0,preexistinglinks[0]);
                listSpheres2[0].connectedSphere.push(1);
                listSpheres2[1].connectedSphere.push(0);
                listSpheres2[0].connectedSphereName.push(listSpheres2[1].label[0].name);
                listSpheres2[1].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],0,preexistinglinks[1]);
                //console.log("ere",listSpheres2[0].connectedSphere);
                addLink(fruits[0][0],fruits[2][0],0,preexistinglinks[1]);
                listSpheres2[0].connectedSphere.push(2);
                listSpheres2[2].connectedSphere.push(0);
                listSpheres2[0].connectedSphereName.push(listSpheres2[2].label[0].name);
                listSpheres2[2].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],0,preexistinglinks[1]);
                addLink(fruits[0][0],fruits[3][0],0,preexistinglinks[2]);
                listSpheres2[0].connectedSphere.push(3);
                listSpheres2[3].connectedSphere.push(0);   
                listSpheres2[0].connectedSphereName.push(listSpheres2[3].label[0].name);
                listSpheres2[3].connectedSphereName.push(listSpheres2[0].label[0].name);
                addLink(fruits[0][0],fruits[2][0],0,preexistinglinks[1]); 
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
//----------------------------------------------------------------------------------------------
//---------------------------------------ADD A SPHERE IN THE 3D POSITION------------------------------------------------------
function addSphere(x,y,z,noLabel=true,name_sphere){ 
    // if a label already exist (when the addSphere is called in addNewSphere for example), 
    //noLabel=false and we doesn't need to call addLabel in this function .
    sphere = new THREE.Mesh(//object's creation, set the sphere's properties 
        new THREE.SphereGeometry(1,32,32),//sphere's size
        new THREE.MeshLambertMaterial( {color: fruits[numSphere][1]} )//sphere's color
    );
    //the sphere has coordinates in 3D : x,y and z
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    //properties declaration
    //used to store informations on the objects, added to listSpheres2, the list of spheres = objects
    sphere.name = numSphere;//sphere's number
	sphere.link = [];//link's number
    sphere.label = [];//3D object : sphere's name
    sphere.connectedSphere =[];//this property will contains, for each sphere, the number of the spheres to which it is connected
    sphere.connectedSphereName =[];//sphere's name
    sphere.linkName =[];//link's name
    listSpheres2.push(sphere);//coords spheres's list
    numSphere+=1;//incr the sphere's number each time we make one
    //var object = scene.getObjectByName( sphere.name, true );
    world.add(sphere);//add the new sphere to the world
    if(noLabel==false && name_sphere!="undefined"){//add the label of the new sphere added by the user (no label before)
        addSphereLabel(sphere,name_sphere);
    }
    else if(noLabel==true){ //the label of the sphere already exist
        addSphereLabel(sphere);
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------LINK CREATION BETWEEN 2 SPHERES------------------------------------------------------
function addLinkedSphere(sphere1,sphere2){//add the link wanted by the user
    var indexSphere1 = findIndexSphere(sphere1);//get the number of the sphere 1
    var indexSphere2 = findIndexSphere(sphere2);//get the number of the sphere 2
    //fill the lists
    listSpheres2[indexSphere1].connectedSphere.push(listSpheres2[indexSphere1].name);
    listSpheres2[indexSphere2].connectedSphere.push(listSpheres2[indexSphere2].name);
    listSpheres2[indexSphere1].connectedSphereName.push(listSpheres2[indexSphere2].label[0].name);
    listSpheres2[indexSphere2].connectedSphereName.push(listSpheres2[indexSphere1].label[0].name);
    addLink(sphere1,sphere2,0,name_link.value);//add the link
    preexistinglinks.push("roller");//so the list stay long enough 
}
//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------LINK CREATION BETWEEN 2 SPHERES------------------------------------------------------
function addLink(sphere1,sphere2,drag,nameLabel){
    var indexSphere1 = findIndexSphere(sphere1);//get the number of the sphere 1
    var indexSphere2 = findIndexSphere(sphere2);//get the number of the sphere 2
    var material = new THREE.LineBasicMaterial({color: 0xf1f2f6});
    var points = [];//list of points making the link/line (3D space coordinates)
    //fill points list
    points.push( new THREE.Vector3( listSpheres2[indexSphere1].position.x, listSpheres2[indexSphere1].position.y, listSpheres2[indexSphere1].position.z ) );//first point
    points.push( new THREE.Vector3( listSpheres2[indexSphere2].position.x, listSpheres2[indexSphere2].position.y, listSpheres2[indexSphere2].position.z ) );//second point
    var geometry = new THREE.BufferGeometry().setFromPoints( points );//geometry = line made by the two points 
    var line = new THREE.Line( geometry, material );//line is made from the material and the points coords
    world.add(line);//add the line to our world
    line.name = numLink;//give a name=number to the link we just have made
    line.label=[];//line name
    line.middleposition= [ (listSpheres2[indexSphere1].position.x+listSpheres2[indexSphere2].position.x)/2, (listSpheres2[indexSphere1].position.y+listSpheres2[indexSphere2].position.y)/2, (listSpheres2[indexSphere1].position.z+listSpheres2[indexSphere2].position.z)/2]
    numLink+=1;//incr link's number each time we make one
    listLink.push(line);//add the links in the list after creation
    if(nameLabel != "undefined"){ //the label of the sphere already exist
        addLinkLabel(line, nameLabel);
    }
        listSpheres2[indexSphere1].link.push(line.name);//add the link number/name to each sphere is connected with 
        listSpheres2[indexSphere2].link.push(line.name);//after the sphere coordinates
    if(drag == 0){//if the sphere has never been dragged, add the link name in the listSpheres2 linkName property
        listSpheres2[indexSphere1].linkName.push(nameLabel);
        listSpheres2[indexSphere2].linkName.push(nameLabel);
    }
    render();
}
//-------------------------------------------------------------------------------------------------------------------------
//----------------------------UPDATE LIST CONNECTED SPHERES -----------------------------------------------------------
function updateConnectedSpheres(nameSphereDeleted){
    for (let i=0;i<listSpheres2.length;i++){
        for(let j=0;j<listSpheres2[i].connectedSphereName.length;j++){
            if(listSpheres2[i].connectedSphereName[j] == nameSphereDeleted){
                //in the connectedspherename property from listSpheres2
                //if the sphere deleted name is the same
                listSpheres2[i].connectedSphereName.splice(j,1);//delete his name from it 
                //to update the connectedSphereName property = list 
            }
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//----------------------------UPDATE LIST LINK NAME -----------------------------------------------------------
function updateConnectedLinks(nameLinkDeleted){
    for (let i=0;i<listSpheres2.length;i++){
        for(let j=0;j<listSpheres2[i].linkName.length;j++){
            if(listSpheres2[i].linkName[j] == nameLinkDeleted){
                //in the linkName property from listSpheres2
                //if the link deleted name is the same
                listSpheres2[i].linkName.splice(j,1);//delete his name from it 
                //to update the linkName property = list 
            }
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//----------------------------LINK MODIFICATION : REMOVE AND ADD A NEW ONE WHEN AND WHERE THE SPHERE MOVE------------------
function updateLink(num,add){//if add=1 -> add ; add=0 -> just delete not add after
    //local variables declaration
    var numinlist;
    var SphereList = [];
    var nom;
    for(let i=0;i<listLink.length;i++){//i varies in listLink array
        if(listLink[i].name == num){//if the number in the list equals the function parameter (the num of the link we want to remove)
            numinlist=i;//link number is the list = counter
        }
    }
    nom = listLink[numinlist].label[0].name;
    listLink[numinlist].geometry.dispose();//delete the geometry and the material from the property listLink for the link deleted
    listLink[numinlist].material.dispose();//-----------------------
    world.remove( listLink[numinlist] );//remove the link by his number
    world.remove(listLink[numinlist].label[0]);//delete link's label
    listLink.splice(numinlist,1);//remove the number of the link of the links list
    for(let i=0; i<listSpheres2.length; i++){
        for(let j=0; j<listSpheres2[i].link.length; j++){//in listSpheres2.link property = list
            if (listSpheres2[i].link[j] == num){//checked the number is ok
                    SphereList.push(listSpheres2[i].label[0].name);//save spheres label 
                    listSpheres2[i].link.splice(j,1);//delete the link's number from the list
            }
        }
    } 
    if(add==0){//link deleted
        updateConnectedLinks(nom);//delete his name from listSpheres2.linkName property = list
        for(let i=0;i<listSpheres2.length;i++){
            if(listSpheres2[i].label[0].name == SphereList[0] ){//first sphere's label OK
                for(let j=0;j<listSpheres2[i].connectedSphereName.length;j++){
                    if(listSpheres2[i].connectedSphereName[j] == SphereList[1]){//second sphere's label is in listSpheres2.connectedSphereName property = list
                        listSpheres2[i].connectedSphereName.splice(j,1);//delete the sphere's name from it
                    }
                }
            }//same for the other sphere
            else if(listSpheres2[i].label[0].name == SphereList[1]){
                for(let j=0;j<listSpheres2[i].connectedSphereName.length;j++){
                    if(listSpheres2[i].connectedSphereName[j] == SphereList[0]){
                        listSpheres2[i].connectedSphereName.splice(j,1);
                    }
                }
            }
        }
    }
    if(add==1){//add the link each time the sphere is dragged
        //updateConnectedLinks(nom);
        addLink(SphereList[0], SphereList[1], 1,nom);//add the link between the two spheres and her label
    
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//--------------------------------------INCR OF UPDATE LINK EACH TIME WE DRAG A SPHERE------------------------------------
//=AT ANY TIME
function dragLink(name){
    var listLinks=[];
    if(listSpheres2[name].link.length>0){//that's mean there is a line or more
        for(let k=0;k<listSpheres2[name].link.length;k++){
            listLinks.push(listSpheres2[name].link[k]);//add the number of the link in the listSpheres2.link property
        }         
    }
    for(let j=0; j<listLinks.length;j++){ 
        updateLink(listLinks[j],1);//delete and add the link
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//--------------------------------------INCR OF UPDATE LINK EACH TIME WE DRAG A SPHERE------------------------------------
//=AT ANY TIME
function removeLink(num){
    var listLinks=[];
    var indexSphere = findIndexSphere(num);//get the sphere number
    if(listSpheres2[indexSphere].link.length>0){//that's mean there is a line or more 
        for(let k=0;k<listSpheres2[indexSphere].link.length;k++){
                listLinks.push(listSpheres2[indexSphere].link[k]);//add the link number in the listSpheres2.link property
        }                
    }
    for(let j=0; j<listLinks.length;j++){
        updateLink(listLinks[j],0);//delete link
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------UPDATE SPHERE------------------------------------------------------
function addNewSphere(Zaxis){
    //local variables declaration
    var sphereLabel;
    var same='false';
    for (let i=0;i<CreateLabelTab().length;i++){//createLabelTab returns the labels list
        sphereLabel=CreateLabelTab()[i];
        if(sphereLabel == name_sphere.value){//sphere label is the same
           same=true; 
        }
    }
    if(Zaxis>=-100 && Zaxis<=100 && same=='false'){//name label is not used before and object position entered by the user is correct
        var locationX = getRandomNumber(-20, 20);//Gives the point of intersection in world coords
        var locationZ = getRandomNumber(-20, 20);//coords are random numbers between -20 and 20 
        var locationY;//so the object visualisation stays good
        //var Zaxis = prompt("Please enter a number between 100 and -100 to choose the height of the object (relative to the grid) that you are moving:",40);
        if (Zaxis == null || Zaxis == "" || (isFloat(parseFloat(Zaxis))==false && isInteger(parseFloat(Zaxis))==false) ){//number entered is not null, "" or float
            locationY=10; //default value if the value entered is not correct
        } else {
            locationY = parseFloat(Zaxis/10);// parsefloat -> transform a string into a floating number
        }
        var coords = new THREE.Vector3(locationX, locationY,locationZ);//create a vector with coordinates
        world.worldToLocal(coords);  // to add sphere in correct position, neew local coords for the world object
        addSphere(coords.x,coords.y,coords.z, false);//add the object in 3D
        sphere = listSpheres2[listSpheres2.length-1]
        addSphereLabel(sphere,name_sphere.value);//add her label from the name entered by the user
        sphere.label[0].lookAt( camera.position );//Rotates the object to face the camera position
    }
    else{
        alert("For a better vision of the map, the number chosen must be between -100 et 100 and choose a new name for your sphere");
    }
    render(); 
}
//-------------------------------------------------------------------------------------------------------------------------
