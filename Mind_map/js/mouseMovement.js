var canvasW     = 1200;
var canvasH     = 480;

var numMovers   = 550;
var movers      = [];
var friction    = .96;
var radCirc     = Math.PI * 2;

var mouseX, mouseY, mouseVX, mouseVY, prevMouseX = 0, prevMouseY = 0;   
var isMouseDown = true;

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
                    //console.log("tss 1",dragItem);
                    //console.log("tss",dragItem.label[0].name);
                    SphereDraggedNum =  dragItem.label[0].name;
                    
                    if(SphereDraggedNum[0] !="l"){
                        //showInfoSphereOnClick(dragItem);
                    }//"l"for label
                    render();
                    return true;
                }
            }
            case RENAME :
                if(objectHit.type == "Mesh"){
                    if(objectHit.name[0] !="l"){
                        renameItem= objectHit;
                        var old_name_sphere = objectHit.label[0].name;
                        sphereRenameName =  renameItem.name;
                        new_nameSphere = prompt("Let's change the name of the sphere !!!",objectHit.label[0].name);
                        fruits[sphereRenameName][0]=new_nameSphere;
                        objectHit.label[0].lookAt( camera.position );
                        for(let i=0;i<listSpheres2.length;i++){
                            var index = listSpheres2[i].connectedSphereName.indexOf(old_name_sphere);
                            if (index !== -1) {
                                listSpheres2[i].connectedSphereName[index] = new_nameSphere;
                            }
                        }
                        addSphereLabel(objectHit,new_nameSphere); 
                        objectHit.label[0].lookAt( camera.position );
                        
                    }
                }
                else if(objectHit.type == "Line"){
                        var old_name_link = objectHit.label[0].name;
                        new_nameLink = prompt("Let's change the name of the link !!!",objectHit.label[0].name);
                        console.log("new_nameLink",new_nameLink);
                        objectHit.label[0].lookAt( camera.position );
                        for(let i=0;i<listSpheres2.length;i++){
                            var index = listSpheres2[i].linkName.indexOf(old_name_link);
                            if (index !== -1) {
                                listSpheres2[i].linkName[index] = new_nameLink;
                            }
                        }
                        console.log(listSpheres2);
                        addLinkLabel(objectHit,new_nameLink); 
                        objectHit.label[0].lookAt( camera.position );
                        
                    }
                    else{
                        alert("Please click on the object you want to remove from the map")
                    }
                render();
                return false;
            default: // DELETE
                if (objectHit.type == "Mesh") {
                    console.log(objectHit.name);
                    nameSphereDeleted=objectHit.label[0].name;
                    removeLink(objectHit.label[0].name); 
                    var indexsphere = findIndexSphere(objectHit.label[0].name);
                    updateConnectedSpheres( nameSphereDeleted);
                    listSpheres2.splice(indexsphere, 1);
                    world.remove(objectHit);
                    if(objectHit.name[0] !="l"){
                        world.remove(objectHit.label[0]);
                    }
                }
                else if(objectHit.type == "Line"){
                    updateLink(objectHit.name,0);
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
        for(let j=0;j<listLink.length;j++){
            listLink[j].label[0].lookAt( camera.position );
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
        a = Math.min(25,Math.max(-25,coords.x));  // clamp coords to the range -19 to 19, so object stays on ground  
        b = Math.min(25,Math.max(-25,coords.y));
        c = Math.min(25,Math.max(-25,coords.z));

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
            //console.log("here",listSpheres2[indexSphere].link);
            //console.log("here11",listLink[0].name);
            for(let j=0;j<listLink.length;j++){ 
                listLink[j].label[0].lookAt( camera.position );
            }
            
		}

        render();
    }
}


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
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight*3.25;
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
