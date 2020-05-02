//-------------------------------------------GLOBAL VARIABLES DECLARATION----------------------
var canvasW     = 1200;
var canvasH     = 480;
var numMovers   = 550;
var movers      = [];
var friction    = .96;
var radCirc     = Math.PI * 2;
var mouseX, mouseY, mouseVX, mouseVY, prevMouseX = 0, prevMouseY = 0;   
var isMouseDown = true;
//----------------------------------------------------------------------------------------------
//---------------------------------------------FUNCTIONS----------------------------------------
function doMouseDown(x,y) {//user clic!
    if (mouseAction == ROTATE) {
        return true;
    }
    if (targetForDragging.parent == world) {
        world.remove(targetForDragging);  // no check for hits on targetForDragging
    }
    var a = 2*x/canvas.width - 1;//set a and b vector position (made by the two points)
    var b = 1 - 2*y/canvas.height;
    raycaster.setFromCamera( new THREE.Vector2(a,b), camera );//updates the ray with a new origin and direction.
    intersects = raycaster.intersectObjects( world.children );  // no need for recusion since all objects are top-level
    if (intersects.length == 0) {//if no intersection
        return false;//do nothing
    }
    var item = intersects[0];
    var objectHit = item.object;//where the camera get the object
    switch (mouseAction) {//radio buttons : several options for the user
        case DRAG:
            if (objectHit.type != "Mesh" && objectHit.type != "Line") {//if the user not clic on an object
                return false;//do nothing
            }
            else  {
                dragItem = objectHit;//object move
                if(dragItem.type == "Mesh" && dragItem.type!= "Line"){	
                    world.add(targetForDragging);//add the target to the world
                    targetForDragging.position.set(item.point.x,item.point.y,item.point.z);//set the targetfordragging position
                    SphereDraggedNum =  dragItem.label[0].name;//get the number of the dragged sphere in a variable
                    render();
                    return true;
                }
            }
            case RENAME :
                    if(objectHit.type == "Mesh"){//selected object is a sphere
                            renameItem= objectHit;
                            var old_name_sphere = objectHit.label[0].name;//store the old sphere name 
                            sphereRenameName =  renameItem.name;//number of the sphere's rename
                            new_nameSphere = prompt("Let's change the name of the sphere !!!",objectHit.label[0].name);//let the user change the sphere's name
                            
                            if(new_nameSphere != null&& new_nameSphere.trim() != '') { // if the user write nothing, a space or clic on "annuler"
                                addSphereLabel(objectHit,new_nameSphere); //add the new sphere's label
                            } else {
                                new_nameSphere=old_name_sphere;//keep the old name
                            }
                            fruits[sphereRenameName][0]=new_nameSphere;//put the new name on the list
                            objectHit.label[0].lookAt( camera.position );//label stays in front of the user look
                            for(let i=0;i<listSpheres2.length;i++){
                                var index = listSpheres2[i].connectedSphereName.indexOf(old_name_sphere);//indexOf : return the first index where old_name_sphere is
                                if (index !== -1) {
                                    listSpheres2[i].connectedSphereName[index] = new_nameSphere;//new sphere name in the list
                                }
                            }
                            objectHit.label[0].lookAt( camera.position );//label stays in front of the user look
                    }
                    else if(objectHit.type == "Line"){//selected object is a line //same as for the mesh
                            var old_name_link = objectHit.label[0].name;
                            new_nameLink = prompt("Let's change the name of the link !!!",objectHit.label[0].name); 
                            
                            if(new_nameLink != null&& new_nameLink.trim() != '') { // ?
                                addLinkLabel(objectHit,new_nameLink); 
                            }  else {
                                new_nameLink=old_name_link;
                            }
                            objectHit.label[0].lookAt( camera.position );
                            for(let i=0;i<listSpheres2.length;i++){
                                var index = listSpheres2[i].linkName.indexOf(old_name_link);
                                if (index !== -1) {
                                    listSpheres2[i].linkName[index] = new_nameLink;
                                }
                            }
                            objectHit.label[0].lookAt( camera.position );
                        }
                        else{
                            alert("Please click on the object you want to remove from the map");//if the user not click on an object
                        }
                    render();
                return false;
            default: // DELETE
                if (objectHit.type == "Mesh") {//Sphere
                    nameSphereDeleted=objectHit.label[0].name;//store sphere's label
                    removeLink(objectHit.label[0].name);//remove link connected with the deleted sphere
                    var indexsphere = findIndexSphere(objectHit.label[0].name);//get sphere's index
                    updateConnectedSpheres(nameSphereDeleted);//delete it from connectedspheresname property in listSpheres2
                    listSpheres2.splice(indexsphere, 1);//delete this object in listSpheres2
                    world.remove(objectHit);//remove object from world
                    world.remove(objectHit.label[0]);//remove object's label from world
                }
                else if(objectHit.type == "Line"){//Line
                    updateLink(objectHit.name,0);//delete object's name and label, and his name and number from the lists (linkName, link)
                }
                else{
                    alert("Please click on the object you want to remove from the map");
                }
                render();
                return false;
        }
    }
//----------------------------------------------------------------------------------------------
//---------------------------------------------Movement-----------------------------------------
function doMouseMove(x,y,evt,prevX,prevY) {  
    if (mouseAction == ROTATE) {
        var dx = x - prevX;//distance between before and where the user clic
        var dy = y - prevY;
        world.rotateX( dy/200 );
        world.rotateY( dx/200 );
        for(let i=0;i<listSpheres2.length;i++){//set the label position (x,y,z)each time the sphere is dragged
            listSpheres2[i].label[0].position.z = listSpheres2[i].position.z ;
			listSpheres2[i].label[0].position.y = listSpheres2[i].position.y +1.5;
			listSpheres2[i].label[0].position.x = listSpheres2[i].position.x -1;
            listSpheres2[i].label[0].lookAt( camera.position );//label stays in front of the user's eyes
        }
        for(let j=0;j<listLink.length;j++){
            listLink[j].label[0].lookAt( camera.position );
        }        
        render();
    }
    else {  // dragy
        var a = 2*x/canvas.width - 1;
        var b = 1 - 2*y/canvas.height;
        raycaster.setFromCamera( new THREE.Vector2(a,b), camera );//updates the ray with a new origin and direction
        intersects = raycaster.intersectObject( targetForDragging ); //intersect = where the user's click on the map
        if (intersects.length == 0) {
            return;
        }
        var locationX = intersects[0].point.x;//get the three coordinates (where there is a click)
        var locationY = intersects[0].point.y;
        var locationZ = intersects[0].point.z;
        var coords = new THREE.Vector3(locationX, locationY, locationZ);
        world.worldToLocal(coords);
        a = Math.min(25,Math.max(-25,coords.x));  // clamp coords to the range -19 to 19, so object stays on ground  
        b = Math.min(25,Math.max(-25,coords.y));
        c = Math.min(25,Math.max(-25,coords.z));
        dragItem.position.set(a,b,c);//set the new position of the object
		//if(SphereDraggedNum[0] !="l"){
			for(let i=0;i<listSpheres2.length;i++){
                if(SphereDraggedNum == listSpheres2[i].label[0].name ){//num sphere dragged OK
					indexSphere = i;//get her index
				}
            }
            dragLink(indexSphere);//dragg the links connected to this sphere
            listSpheres2[indexSphere].label[0].position.z = dragItem.position.z ;//set again label position (x,y,z)
			listSpheres2[indexSphere].label[0].position.y = dragItem.position.y +1.5;
			listSpheres2[indexSphere].label[0].position.x = dragItem.position.x -1;
            listSpheres2[indexSphere].label[0].lookAt( camera.position );//sphere's label still looking the user's eye
            for(let j=0;j<listLink.length;j++){ 
                listLink[j].label[0].lookAt( camera.position );//link's label(s) still looking the user's eye
            } 
		//}
        render();
    }
}
//----------------------------------------------------------------------------------------------
//-----------------------------------------MOUSE ACTIONS----------------------------------------
function doChangeMouseAction() {//calling function according to the radio button checked
    if (document.getElementById("mouseRotate").checked) {
        mouseAction = ROTATE;
    }
    else if (document.getElementById("mouseDrag").checked) {
        mouseAction = DRAG;
    }
    else if (document.getElementById("mouseRename").checked) {
        mouseAction = RENAME;
    }
    else {
        mouseAction = DELETE;
    }
}
//----------------------------------------------------------------------------------------------
//----------------------------------scene initialization----------------------------------------
function init() {
    try {
        canvas = document.getElementById("maincanvas");//html element by its id
        canvas.width = document.body.clientWidth;//set canvas width and heigth
        canvas.height = document.body.clientHeight*3.25;
        renderer = new THREE.WebGLRenderer({//add the renderer
            canvas: canvas,
            antialias: true
        });
    }
    catch (e) {//error in the canvas
        document.getElementById("canvas-holder").innerHTML="<p><b>Sorry, an error occurred:<br>" +
            e + "</b></p>";
        return;
    }
    document.getElementById("mouseDrag").checked = true;//by default, radio button drag is checked
    mouseAction = DRAG;
    document.getElementById("mouseRotate").onchange = doChangeMouseAction;//change action if the state of one radio button change
    document.getElementById("mouseDrag").onchange = doChangeMouseAction;
    document.getElementById("mouseRename").onchange = doChangeMouseAction;
    document.getElementById("mouseDelete").onchange = doChangeMouseAction;
    createWorld();//add objects on the world
    setUpMouseHander(canvas,doMouseDown,doMouseMove);
    setUpTouchHander(canvas,doMouseDown,doMouseMove);
    raycaster = new THREE.Raycaster();
    render();
}
//----------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------
//---------------------------------------------         ----------------------------------------
function setUpMouseHander(element, mouseDownFunc, mouseDragFunc, mouseUpFunc) {
/*
       element -- either the element itself or a string with the id of the element
       mouseDownFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
       mouseDragFunc(x,y,evt,prevX,prevY,startX,startY)
       mouseUpFunc(x,y,evt,prevX,prevY,startX,startY)
   */
if (!element || !mouseDownFunc || !(typeof mouseDownFunc == "function")) {//not enough arguments
    throw "Illegal arguments in setUpMouseHander";
}
if (typeof element == "string") {//argument type is ok
    element = document.getElementById(element);
}
if (!element || !element.addEventListener) {//wrong type argument 
    throw "first argument in setUpMouseHander is not a valid element";
}
var dragging = false;//not dragging at the beginning
var startX, startY;//beginning x and y coords values
var prevX, prevY;//precedent x and y coords values

function doMouseDown(evt) {
    if (dragging) {
        return;
    }
    var r = element.getBoundingClientRect();
    //evt.client X : get the x coords of the point where the cursor is, when the user click (same for y but y is the vertical coord)
    var x = evt.clientX - r.left;//difference between cursor position and top left point of the canvas 
    var y = evt.clientY - r.top;
    prevX = startX = x;//set prev xposition
    prevY = startY = y;
    dragging = mouseDownFunc(x, y, evt);
    
    if (dragging) {
        document.addEventListener("mousemove", doMouseMove);//if dragging : two others functions can be called : move the mouse
        document.addEventListener("mouseup", doMouseUp);//release mouse
    }
}
function doMouseMove(evt) {
    if (dragging) {
        if (mouseDragFunc) {
            var r = element.getBoundingClientRect();
            var x = evt.clientX - r.left;
            var y = evt.clientY - r.top;
            mouseDragFunc(x, y, evt, prevX, prevY, startX, startY);//drag action
        }
        prevX = x;
        prevY = y;
    }
}
function doMouseUp(evt) {
    if (dragging) {
        document.removeEventListener("mousemove", doMouseMove);//remove other actions 
        document.removeEventListener("mouseup", doMouseUp);//when the user release the mouse : not moving or up 
        if (mouseUpFunc) {
            var r = element.getBoundingClientRect();
            var x = evt.clientX - r.left;
            var y = evt.clientY - r.top;
            mouseUpFunc(x, y, evt, prevX, prevY, startX, startY);
        }
        dragging = false;
    }
}
element.addEventListener("mousedown", doMouseDown);//add mouse down event 
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
    var x = evt.touches[0].clientX - r.left;//touches : determine number of touch = clic
    var y = evt.touches[0].clientY - r.top;
    prevX = startX = x;
    prevY = startY = y;
    dragging = touchStartFunc(x, y, evt);
    if (dragging) {//add events for touch move (mouse's cursor move), release mouse, delete touch
        element.addEventListener("touchmove", doTouchMove);
        element.addEventListener("touchend", doTouchEnd);
        element.addEventListener("touchcancel", doTouchCancel);
    }
}

function doTouchMove(evt) {
    if (dragging) {
        if (evt.touches.length != 1) {//if more than one touch
            doTouchEnd(evt);//stop touch event
            return;
        }
        evt.preventDefault();
        if (touchMoveFunc) {//get new cursor coords
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

function doTouchEnd(evt) {//stop dragging, remove all events 
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
element.addEventListener("touchstart", doTouchStart);//add touch start, so the user will be able to touch again (clic again)!
}
