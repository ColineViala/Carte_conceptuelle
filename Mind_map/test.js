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
let numLinklabel=0;


function render() { 
    /*var x = document.getElementById("autoRotate");		
    if(x.checked==true){
        
        let radius =500;
        world.position.x = radius * Math.cos( angle );  
        world.position.z = radius * Math.sin( angle );
        angle += 0.01;
    }*/
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
    addExemple();
    render();

    
}

function addExemple(){
    
    addSphere(0,0,0);
    addSphere(-7,4,5);
    addSphere(8,5,5);
    addSphere(4,6,-6);
    addLink(fruits[0][0],fruits[1][0],"Red");
    listSpheres2[0].connectedSphere.push(1);
    listSpheres2[1].connectedSphere.push(0);
    //console.log("ere",listSpheres2[0].connectedSphere);
    addLink(fruits[0][0],fruits[2][0],"Blue");
    listSpheres2[0].connectedSphere.push(2);
    listSpheres2[2].connectedSphere.push(0);
    addLink(fruits[0][0],fruits[3][0],"Green");
    listSpheres2[0].connectedSphere.push(3);
    listSpheres2[3].connectedSphere.push(0);   
    //console.log(listSpheres2[0].connectedSphere);   
    
    
}

function deleteObjects(){
    scene.remove(world);
    /*
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
        if (scene.children[0] == THREE.Mesh || scene.children[0] == THREE.Object3D || scene.children[0] == THREE.Group) {
            scene.children[0].dispose();
            scene.children[0].geometry.dispose();
            scene.children[0].material.dispose();
        }
    }*/
    render();
}

//---------------------------------------ADD A SPHERE IN THE 3D POSITION------------------------------------------------------
function addSphere(x,y,z,noLabel=true){ // if a label already exist (when the addSphere is called in addNewSphere for example), noLabel=false and we doesn't need to call addLabel in this function .
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
    
    listSpheres2.push(sphere);//coords spheres's list
    numSphere+=1;//incr the sphere's number each time we make one
    var object = scene.getObjectByName( sphere.name, true );
    world.add(sphere);//add the new sphere to the world
    if(noLabel==true){ //the label of the sphere already exist
        addSphereLabel(sphere);
    }
}
//-------------------------------------------------------------------------------------------------------------------------

function addLinkedSphere(sphere1,sphere2){
    var indexSphere1 = findIndexSphere(sphere1);
    var indexSphere2 = findIndexSphere(sphere2);
    listSpheres2[indexSphere1].connectedSphere.push(listSpheres2[indexSphere1].name);
    listSpheres2[indexSphere2].connectedSphere.push(listSpheres2[indexSphere2].name);
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
                }
            }
        }
    }


    if(add==1){
        addLink(SphereList[0], SphereList[1], nom);
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
   
function showGridHelper() { 
    var x = document.getElementById("myCheck");		
    if(x.checked==true){
        gridHelper.visible = true;
    }else{
        gridHelper.visible = false ;
    }
    render();
  }
//------------------------------------------------------------------------------------------------------------------------

function showLabel() { 
    var x = document.getElementById("label");		
    if(x.checked==true){
        //console.log(listSpheres2[0].label[0]);
        for(let i=0;i<listSpheres2.length;i++){
            listSpheres2[i].label[0].visible = true;
        }
        
    }else{
        //console.log(listSpheres2[1].label.visible);
        for(let i=0;i<listSpheres2.length;i++){
            listSpheres2[i].label[0].visible = false;
            
        }
    }
    render();
  }

//-----------------------------------------AUTO-ROTATE-------------------------------------------------------------------
 
function autoRotate(){
    var x = document.getElementById("autoRotate");		
    if(x.checked==true){
        rotateworld(0.007);
    }
}

function rotateworld(SPEED) {
    requestAnimationFrame(render);
    world.rotation.x -= SPEED * 2;
    world.rotation.y -= SPEED;
    world.rotation.z -= SPEED * 3;
    for(let i=0;i<listSpheres2.length;i++){
        /*listSpheres2[i].label[0].position.z = listSpheres2[i].position.z ;
        listSpheres2[i].label[0].position.y = listSpheres2[i].position.y +1.5;
        listSpheres2[i].label[0].position.x = listSpheres2[i].position.x -1;*/
        listSpheres2[i].label[0].lookAt( camera.position );
    }
    renderer.render(scene, camera);
    setTimeout(() => {autoRotate();  }, 25); 
}

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
//--------------------------------------GET INDEX SPHERE------------------------------------

function findIndexSphere(nameSphere){
    var indexSphere;
    for(let i=0; i<listSpheres2.length; i++){
        if (listSpheres2[i].label[0].name == nameSphere){
            indexSphere = i;
        }
    }
    return indexSphere;
}
//-------------------------------------------------------------------------------------------------------------------------

//--------------------------------------ADD LABEL-----------------------------------

function addSphereLabel(sphere, nameLabel ){ 
    
    if (typeof nameLabel == "undefined") { //if nameLabel is not undefined, the sphere already have a label (we have to delete it)
        //console.log("cc");
        nameLabel = fruits[sphere.name][0];
	}else{
		//world.remove(sphere.label[0]);
		
    }
    if (typeof(sphere.label[0]) != "undefined"){
        var indexsphere = findIndexSphere(sphere.label[0].name);
        world.remove(sphere.label[0]);
    }else{
        var indexsphere = listSpheres2.length-1;
        
    }

    listSpheres2[indexsphere].label=[];
	var loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    var geometry = new THREE.TextGeometry(nameLabel, {font: font, size: 1, height: 0.1, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)
    var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
    label1 = new THREE.Mesh(geometry, material);
    label1.position.z = sphere.position.z ;
    label1.position.y = sphere.position.y +1.5;
    label1.position.x = sphere.position.x -1;
    label1.name = nameLabel;
    listSpheres2[indexsphere].label.push(label1);//add the label to each sphere is connected with  
    label1.lookAt( camera.position ); 
	world.add(label1);
}
//-------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------ADD LINK LABEL------------------------------------------------------------
function addLinkLabel(link, nameLabel){ 
   
    if (typeof nameLabel == "undefined") { //if nameLabel is not undefined, the sphere already have a label (we have to delete it)
        nameLabel = preexistinglinks[0];
	}
    if (typeof(link.label[0]) != "undefined"){
        world.remove(link.label[0]);
    }
    
    for(let i=0; i<listLink.length; i++){
        if (listLink[i].name == link.name){
            indexLink = i;
        }
    }   
	var loader = new THREE.FontLoader();
    let font = loader.parse(fontJSON);
    var geometry = new THREE.TextGeometry(nameLabel, {font: font, size: 0.8, height: 0.1, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)
    var material = new THREE.MeshLambertMaterial({color: 0xD588E0});
    linkLabel = new THREE.Mesh(geometry, material);
    linkLabel.position.z = link.middleposition[2] ;
    linkLabel.position.y = link.middleposition[1];
    linkLabel.position.x = link.middleposition[0];
    linkLabel.name = nameLabel;
    linkLabel.lookAt( camera.position ); 
    world.add(linkLabel);
    listLink[indexLink].label.push(linkLabel);
    if(listLink[indexLink].label.length>1){
        listLink[indexLink].label.splice(0,1);
    }
    
    
}
//------------------------------------------------------------------------------------------------------------------------
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
//-----------------------------------------------LABEL TAB-----------------------------------------------------------
function CreateLabelTab(){
    var listLabels=[];
    for(let i=0;i<listSpheres2.length;i++){
        //console.log("tupuc",listSpheres2[i].label[0].name);
        listLabels.push(listSpheres2[i].label[0].name);
        //console.log(listSpheres2[i].label1);

        //listSpheres2.label.push(listSpheres2[i].label);//add the link number/name to each sphere is connected with 
    }
   
    //console.log(listLabels);
    fillDropdown(listLabels);
    return listLabels;
}
//-----------------------------------------------------------------


//-----------------------------------------------FILL DROPDOWN 1-----------------------------------------------------------
function fillDropdown(nameSphereList){

    //Sphere 1
    // Get dropdown element from DOM
    var dropdown_sphere1 = document.getElementById("sphere1");
    // Loop through the array
    dropdown_sphere1.length=0;
    for (var i = 0; i < nameSphereList.length; ++i) {
        // Append the element to the end of Array list
        dropdown_sphere1[dropdown_sphere1.length] = new Option(nameSphereList[i], nameSphereList[i]);
    }

    //Sphere 2
    // Get dropdown element from DOM
    var dropdown_sphere2 = document.getElementById("sphere2");
    // Loop through the array
    
    dropdown_sphere2.length=0;
    for (var i = 0; i < nameSphereList.length; ++i) {
        // Append the element to the end of Array list
        dropdown_sphere2[dropdown_sphere2.length] = new Option(nameSphereList[i], nameSphereList[i]);
    }
}
//-----------------------------------------------------------------
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
//-----------------------------------------------------------------
function isFloat(n){  //return true if n is a float. 
    return n === +n && n !== (n|0);
}
//-----------------------------------------------------------------
function isInteger(n){//return true if n is an integer. 
    return n === +n && n === (n|0);
   }
//-----------------------------------------------------------------

function doMouseDown(x,y) {
    
    if (mouseAction == ROTATE) {
        return true;
    }
    if (targetForDragging.parent == world) {
        world.remove(targetForDragging);  // I don't want to check for hits on targetForDragging
    }
    var a = 2*x/canvas.width - 1;
    var b = 1 - 2*y/canvas.height;
    raycaster.setFromCamera( new THREE.Vector2(a,b), camera );
    intersects = raycaster.intersectObjects( world.children );  // no need for recusion since all objects are top-level
    if (intersects.length == 0) {
        return false;
    }
    var item = intersects[0];
    var objectHit = item.object;
    switch (mouseAction) {
        case DRAG:
            if (objectHit.type != "Mesh" && objectHit.type != "Line") {
                return false;
            }
            else  {
                dragItem = objectHit;//object move
                if(dragItem.type == "Mesh" && dragItem.type!= "Line"){	
                    world.add(targetForDragging);//add the target to the world
                    targetForDragging.position.set(item.point.x,item.point.y,item.point.z);
                    console.log("tss 1",dragItem);
                    console.log("tss",dragItem.label[0].name);
                    SphereDraggedNum =  dragItem.label[0].name;
                    
                    if(SphereDraggedNum[0] !="l"){
                        //showInfoSphereOnClick(dragItem);
                    }//"l"for label
                    render();
                    return true;
                }
            }
            
        /*
        case ADD_SPHERE:
                var locationX = item.point.x;  // Gives the point of intersection in world coords
                var locationZ = item.point.z;
                var locationY;
                var Zaxis = prompt("Please enter a number between 100 and -100 to choose the height of the object (relative to the grid) that you are moving:",40);
                if (Zaxis == null || Zaxis == "" || (isFloat(parseFloat(Zaxis))==false && isInteger(parseFloat(Zaxis))==false) ){
                  locationY=10; //default value if the value entered is not correct
                } else {
                  locationY = parseFloat(Zaxis/10);
                }
                var coords = new THREE.Vector3(locationX, locationY,locationZ);
                world.worldToLocal(coords);  // to add sphere in correct position, neew local coords for the world object
                addSphere(coords.x,coords.y,coords.z);//in 3D
                render();
            return false;
        case ADD_LINK:

                var numSphere1 = prompt("Please enter the number of the first sphere (number have to be < spheres number):",1);
                var numSphere2 = prompt("Please enter the number of the second sphere (number have to be < spheres number):",2);
                if(numSphere1 < numSphere && numSphere2 < numSphere){//spheres existing = numbers of spheres OK
                    //working too with an add sphere = test OK
                    addLink(numSphere1,numSphere2);//add the link between the two wanted spheres in 3D
                    treeOfLinks.push([numSphere1,numSphere2]);
                    treeOfLinks.push([numSphere2,numSphere1]);
                    render();
                }
                else{//numbers of spheres not OK
                    alert("/!\Careful, you tried to links inexistants spheres, please try again");
                    numSphere1 = prompt("Please enter the number of the first sphere (number have to be < spheres number):",1);
                    numSphere2 = prompt("Please enter the number of the second sphere (number have to be < spheres number):",2);
                    addLink(numSphere1,numSphere2);//add the link between the two wanted spheres in 3D
                    render();
                }
            return false;
            */
            case RENAME :
                if(objectHit.type == "Mesh"){
                    //console.log("kiki",listSpheres2);
                    if(objectHit.name[0] !="l"){
                        renameItem= objectHit;
                        sphereRenameName =  renameItem.name;
                        new_nameSphere = prompt("Let's change the name of the sphere !!!",objectHit.label[0].name);
                        fruits[sphereRenameName][0]=new_nameSphere;
                        //showInfoSphereOnClick(sphereRenameName);
                        //addSphereLabel(sphereRenameName+1,objectHit,cc); 
                        objectHit.label[0].lookAt( camera.position );
                        addSphereLabel(objectHit,new_nameSphere); 
                        objectHit.label[0].lookAt( camera.position );
                        
                    }
                }
                else if(objectHit.type == "Line"){
                        console.log("objectHit",objectHit.label);
                        console.log("listLink",listLink);
                        new_nameLink = prompt("Let's change the name of the link !!!",objectHit.label[0].name);
                        console.log("new_nameLink",new_nameLink);
                        objectHit.label[0].lookAt( camera.position );
                        addLinkLabel(objectHit,new_nameLink); 
                        objectHit.label[0].lookAt( camera.position );
                        
                    
                }render();
                return false;
            default: // DELETE
                if (objectHit.type == "Mesh") {
                    //console.log("objectHit.name",objectHit.name);
                    removeLink(objectHit.label[0].name); 
                    //console.log("tdc",listSpheres2);
                    listSpheres2.splice(objectHit.name, 1);
                    //console.log("listSpheres2",listSpheres2);
                    world.remove(objectHit);
                    if(objectHit.name[0] !="l"){
                        world.remove(objectHit.label[0]);
                    }

                }
                else if(objectHit.type == "Line"){
                    updateLink(objectHit.name,0);
                    console.log("line",objectHit);
                }
                else{
                    alert("Please click on the object you want to remove from the map")
                }
                render();
                return false;
        }
    }

function doMouseMove(x,y,evt,prevX,prevY) {
    
    if (mouseAction == ROTATE) {
        var dx = x - prevX;
        var dy = y - prevY;
        world.rotateX( dy/200 );
        world.rotateY( dx/200 );
        for(let i=0;i<listSpheres2.length;i++){
            listSpheres2[i].label[0].position.z = listSpheres2[i].position.z ;
			listSpheres2[i].label[0].position.y = listSpheres2[i].position.y +1.5;
			listSpheres2[i].label[0].position.x = listSpheres2[i].position.x -1;
            listSpheres2[i].label[0].lookAt( camera.position );
        }
        render();
    }
    else {  // dragy
        var a = 2*x/canvas.width - 1;
        var b = 1 - 2*y/canvas.height;
        raycaster.setFromCamera( new THREE.Vector2(a,b), camera );
        intersects = raycaster.intersectObject( targetForDragging ); 
        if (intersects.length == 0) {
            return;
        }
        var locationX = intersects[0].point.x;
        var locationY = intersects[0].point.y;
        var locationZ = intersects[0].point.z;
        var coords = new THREE.Vector3(locationX, locationY, locationZ);
        world.worldToLocal(coords);
        a = coords.x;  
        b = coords.y;
        c = coords.z;

        //var indexSphere = findIndexSphere(num);
        
        dragItem.position.set(a,b,c);
        //console.log("tdc",SphereDraggedNum);
        
		if(SphereDraggedNum[0] !="l"){
            
			for(let i=0;i<listSpheres2.length;i++){
               //console.log("tchu",listSpheres2[i]);
                 //console.log("tchupi",listSpheres2[i].label[0]);
                if(SphereDraggedNum == listSpheres2[i].label[0].name ){
                   
				//if(SphereDraggedNum == listSpheres2[i].name){
                    //console.log("tchu",listSpheres2[i].label[0].name);
					indexSphere = i;
				}
            }
            //console.log("indexSphere", indexSphere);
            dragLink(indexSphere);
            listSpheres2[indexSphere].label[0].position.z = dragItem.position.z ;
			listSpheres2[indexSphere].label[0].position.y = dragItem.position.y +1.5;
			listSpheres2[indexSphere].label[0].position.x = dragItem.position.x -1;
            listSpheres2[indexSphere].label[0].lookAt( camera.position );
		}

        render();
    }
}


/*	function doJoyStickMove(x,y,evt,prevX,prevY) {
    if (mouseAction == ROTATE) {
        var dx = x - prevX;
        world.rotateY( dx/100 );
        render();
    }
    else {  // drag
        //var a = 2*x/canvas.width - 1;
        //var b = 1 - 2*y/canvas.height;
        //raycaster.setFromCamera( new THREE.Vector2(a,b), camera );
        //var intersects = raycaster.intersectObject( targetForDragging ); 
        //if (intersects.length == 0) {
        //	return;
        //}
        var locationX = intersects[0].point.x;
        var locationZ = intersects[0].point.z;
        var coords = new THREE.Vector3(locationX, 0, locationZ);
        world.worldToLocal(coords);
        a = Math.min(19,Math.max(-19,coords.x));  // clamp coords to the range -19 to 19, so object stays on ground
        b = Math.min(19,Math.max(-19,coords.z));
        dragItem.position.set((a+x)/2,3,(b+y)/2);
        render();
    }
}
*/


function doChangeMouseAction() {
    if (document.getElementById("mouseRotate").checked) {
        mouseAction = ROTATE;
    }
    else if (document.getElementById("mouseDrag").checked) {
        mouseAction = DRAG;
    }
    /*
    else if (document.getElementById("mouseAddLink").checked) {
        mouseAction = ADD_LINK;
    }*/
    else if (document.getElementById("mouseRename").checked) {
        mouseAction = RENAME;
    }
    else {
        mouseAction = DELETE;
    }
}

function init() {
    try {
        canvas = document.getElementById("maincanvas");
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML="<p><b>Sorry, an error occurred:<br>" +
            e + "</b></p>";
        return;
    }
    document.getElementById("mouseDrag").checked = true;
    mouseAction = DRAG;
    document.getElementById("mouseRotate").onchange = doChangeMouseAction;
    document.getElementById("mouseDrag").onchange = doChangeMouseAction;
    //document.getElementById("mouseAddLink").onchange = doChangeMouseAction;
    document.getElementById("mouseRename").onchange = doChangeMouseAction;
    document.getElementById("mouseDelete").onchange = doChangeMouseAction;
    createWorld();
    setUpMouseHander(canvas,doMouseDown,doMouseMove);
    setUpTouchHander(canvas,doMouseDown,doMouseMove);
    raycaster = new THREE.Raycaster();
    render();
}





window.requestAnimationFrame =
window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.oRequestAnimationFrame ||
function(callback) {
setTimeout(function() {
    callback(Date.now());
}, 1000 / 60);
};

function setUpMouseHander(element, mouseDownFunc, mouseDragFunc, mouseUpFunc) {
/*
       element -- either the element itself or a string with the id of the element
       mouseDownFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
       mouseDragFunc(x,y,evt,prevX,prevY,startX,startY)
       mouseUpFunc(x,y,evt,prevX,prevY,startX,startY)
   */
if (!element || !mouseDownFunc || !(typeof mouseDownFunc == "function")) {
    throw "Illegal arguments in setUpMouseHander";
}
if (typeof element == "string") {
    element = document.getElementById(element);
}
if (!element || !element.addEventListener) {
    throw "first argument in setUpMouseHander is not a valid element";
}
var dragging = false;
var startX, startY;
var prevX, prevY;

function doMouseDown(evt) {
    if (dragging) {
        return;
    }
    var r = element.getBoundingClientRect();
    var x = evt.clientX - r.left;
    var y = evt.clientY - r.top;
    prevX = startX = x;
    prevY = startY = y;
    dragging = mouseDownFunc(x, y, evt);
    
    if (dragging) {
        document.addEventListener("mousemove", doMouseMove);
        document.addEventListener("mouseup", doMouseUp);
        //dragLink(SphereDraggedNum);
    }
}
//element.addEventListener("mousedown", doMouseDown);

function doMouseMove(evt) {
    if (dragging) {
        
        if (mouseDragFunc) {
            var r = element.getBoundingClientRect();
            var x = evt.clientX - r.left;
            var y = evt.clientY - r.top;
            mouseDragFunc(x, y, evt, prevX, prevY, startX, startY);
            
        }
        prevX = x;
        prevY = y;
    }
}

function doMouseUp(evt) {
    if (dragging) {
        document.removeEventListener("mousemove", doMouseMove);
        document.removeEventListener("mouseup", doMouseUp);
        
        //alert("mouse up");
        if (mouseUpFunc) {
            var r = element.getBoundingClientRect();
            var x = evt.clientX - r.left;
            var y = evt.clientY - r.top;
            mouseUpFunc(x, y, evt, prevX, prevY, startX, startY);
        }
        dragging = false;
    }
}
element.addEventListener("mousedown", doMouseDown);
}

function setUpTouchHander(element, touchStartFunc, touchMoveFunc, touchEndFunc, touchCancelFunc) {
/*
       element -- either the element itself or a string with the id of the element
       touchStartFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
       touchMoveFunc(x,y,evt,prevX,prevY,startX,startY)
       touchEndFunc(evt,prevX,prevY,startX,startY)
       touchCancelFunc()   // no parameters
   */
if (!element || !touchStartFunc || !(typeof touchStartFunc == "function")) {
    throw "Illegal arguments in setUpTouchHander";
}
if (typeof element == "string") {
    element = document.getElementById(element);
}
if (!element || !element.addEventListener) {
    throw "first argument in setUpTouchHander is not a valid element";
}
var dragging = false;
var startX, startY;
var prevX, prevY;

function doTouchStart(evt) {
    if (evt.touches.length != 1) {
        doTouchEnd(evt);
        return;
    }
    evt.preventDefault();
    if (dragging) {
        doTouchEnd();
    }
    var r = element.getBoundingClientRect();
    var x = evt.touches[0].clientX - r.left;
    var y = evt.touches[0].clientY - r.top;
    prevX = startX = x;
    prevY = startY = y;
    dragging = touchStartFunc(x, y, evt);
    if (dragging) {
        element.addEventListener("touchmove", doTouchMove);
        element.addEventListener("touchend", doTouchEnd);
        element.addEventListener("touchcancel", doTouchCancel);
    }
}

function doTouchMove(evt) {
    if (dragging) {
        if (evt.touches.length != 1) {
            doTouchEnd(evt);
            return;
        }
        evt.preventDefault();
        if (touchMoveFunc) {
            var r = element.getBoundingClientRect();
            var x = evt.touches[0].clientX - r.left;
            var y = evt.touches[0].clientY - r.top;
            touchMoveFunc(x, y, evt, prevX, prevY, startX, startY);
        }
        prevX = x;
        prevY = y;
    }
}

function doTouchCancel() {
    if (touchCancelFunc) {
        touchCancelFunc();
    }
}

function doTouchEnd(evt) {
    if (dragging) {
        dragging = false;
        element.removeEventListener("touchmove", doTouchMove);
        element.removeEventListener("touchend", doTouchEnd);
        element.removeEventListener("touchcancel", doTouchCancel);
        if (touchEndFunc) {
            touchEndFunc(evt, prevX, prevY, startX, startY);
        }
    }
}
element.addEventListener("touchstart", doTouchStart);
}


/*//joystick
var stick = document.createElement("div");
stick.classList.add("stick");
var joy = document.createElement("div");
joy.classList.add("joy");
document.querySelector('body').appendChild(stick);
stick.appendChild(joy);
var stk = document.querySelector('.stick'),
joy = document.querySelector('.joy'),
stw = stk.offsetWidth,
jow = joy.offsetWidth,
begin = (stw - jow) / 2,
mo = false, radi = stw / 2,
ela = { hx:0, vx:0 };
stk.style.height = stw + "px";
joy.style.height = jow + "px";
joy.style.left = begin + "px";
joy.style.top = begin + "px";
var field = document.querySelector('#grand');
field.style.left = "1300px";
field.style.top = "1000px";
var x0 = 0, y0 = 0,
pan = function(dx, dy){
  posX = parseInt(field.style.left);
  posY = parseInt(field.style.top);
  if(posX < 10) posX = 10;
  if(posX > 1500) posX = 1500;
  if(posY < 10) posY = 10;
  if(posY > 500) posY = 500;
    
  field.style.left = (posX + (dx/10)) + "px";
  field.style.top = (posY + (dy/10)) + "px";
}
var elastic = function( ex , ey ){
var stkl = stk.offsetLeft, 
    stkt = stk.offsetTop,	
    xl = stkl + radi,
    xt = stkt + radi;
x = ex - stkl - (jow/2),
y = ey - stkt - (jow/2);

var hx = ex - xl, vx = ey - xt,
        lef = (ex > xl) ? hx : xl-ex,
    tops = (ey > xt) ? vx : xt-ey,
        dist = Math.hypot( lef , tops );	// hypotenuse

  ela.hx = hx , ela.vx = vx;

if( dist < radi && mo){
  joy.style.left = x + "px";
  joy.style.top = y + "px";
} else {//return to begin
  //mo = false, ela.hx = 0, ela.vx = 0;
  //joy.style.left = begin + "px";
  //joy.style.top = begin + "px";      
}
}	// calc and return joystick movement
stk.addEventListener("touchmove", function(e){
mo = true;
elastic( e.pageX , e.pageY );
});
stk.addEventListener("mousedown", function(e){
mo = true;
e.preventDefault();
});
var pos3Dx = 0,
    pos3Dy = 0;
stk.addEventListener("mousemove", function(e){
if (mo == true){
elastic( e.pageX , e.pageY );
    doJoyStickMove( e.pageX , e.pageY, null, 0, 0 )
}
});
document.addEventListener("mouseup", function(){
if (mo == true){
mo = false, ela.hx = 0, ela.vx = 0;
joy.style.left = begin + "px";
joy.style.top = begin + "px";
}
});
document.addEventListener("keydown", function(eventObject){
if(eventObject.which==37 && !mo) {  //left arrow
joy.style.left = "0px";
pan( -50 , 0 );
} else if(eventObject.which==39 && !mo) {  //right arrow
joy.style.left = (stw-jow)+"px";
pan( 50 , 0 );
} else if(eventObject.which==38 && !mo) {  //up arrow
joy.style.top = "0px";
pan( 0 , -50 );
} else if(eventObject.which==40 && !mo) {  //down arrow
joy.style.top =  (stw-jow) + "px"; 
pan( 0 , 50 );
} else if(eventObject.which==27) { //esc
} else if(eventObject.which==9) {  //tab
}
});
document.addEventListener("keyup", function(eventObject){
if(eventObject.which >= 37 && eventObject.which <= 40 ) {	// arrows
    joy.style.left = begin + "px";
joy.style.top = begin + "px";
}
});
function moveSelectedObj() {
if (mo == true){
pan( ela.hx , ela.vx );
}
requestAnimationFrame(moveSelectedObj);
}
requestAnimationFrame(moveSelectedObj);
*/