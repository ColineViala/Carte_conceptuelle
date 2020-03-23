

	var numSphere = 0;
	var canvas, scene, renderer, camera;

	var raycaster;  // A THREE.Raycaster for user mouse input.

	var ground; // A square base on which the cylinders stand.
	var sphere;  // A sphere = 3D representation of a concept
	var link;//A line = a link (entity) between two concepts 
	var world;  // An Object3D that contains all the mesh objects in the scene.
	// Rotation of the scene is done by rotating the world about its
	// y-axis.  (I couldn't rotate the camera about the scene since
	// the Raycaster wouldn't work with a camera that was a child
	// of a rotated object.)
	
	var listSpheres = [];
	//var listLink = []; 
	var treeOfLinks=[]; //list which contain all information about all the link of the mind map
	//var listLinks = [];
	var ROTATE = 1, DRAG = 2, ADD_SPHERE = 3, ADD_LINK = 4, DELETE = 5;  // Possible mouse actions
	var mouseAction;  // currently selected mouse action
	var dragItem;  // the sphere that is being dragged, during a drag operation
	var intersects; //the objects intersected	
	var targetForDragging;  // An invisible object that is used as the target for raycasting while
	// dragging a sphere.  I use it to find the new location of the
	// sphere.  I tried using the ground for this purpose, but to get
	// the motion right, I needed a target that is at the same height
	// above the ground as the point where the user clicked the sphere.
	

	function render() { 
		renderer.render(scene,camera);
		//console.log(listSpheres);
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

		ground = new THREE.Mesh(
			new THREE.BoxGeometry(40,0.1,40),
			new THREE.MeshLambertMaterial( {color:"purple", transparent: true, opacity: 0.25 })
		);
		


		ground.position.y = 0;  // top of base lies in the plane y = -5;
		
		world.add(ground);

		var size = 40;
		var divisions = 40;

		var gridHelper =new THREE.GridHelper( size, divisions,0xb66bb0,0xa6a6a6 );
		gridHelper.position.y=0;
		scene.add( gridHelper );

		targetForDragging = new THREE.Mesh(
			new THREE.BoxGeometry(100,0.01,100),
			//new THREE.MeshBasicMaterial()
		);
		targetForDragging.material.visible = false;

		//targetForDragging.material.transparent = true;  // This was used for debugging
		//targetForDragging.material.opacity = 0.1;
		//world.add(targetForDragging);
		
		//sphere = new THREE.Mesh(
		//	new THREE.SphereGeometry(1,32,32),
		//	new THREE.MeshLambertMaterial( {color:"pink"} )
		//);
		//sphere.position.y = 3;  // places base at y = 0;
		
		addSphere(0,0,0);
		addSphere(-15,-7,5);
		addSphere(-8,5,5);
		addSphere(5,-12,-6);

		addLink(0,1);
		treeOfLinks.push([0,1]);
		treeOfLinks.push([1,0]);
		addLink(0,2);
		treeOfLinks.push([0,2]);
		treeOfLinks.push([2,0]);
		addLink(0,3);
		treeOfLinks.push([0,3]);
		treeOfLinks.push([3,0]);

		//console.log(listSpheres[0][0]);
	}
	/*
	function addSphere(x,y,z) {
		var obj = sphere.clone();
		obj.position.x = x;
		obj.position.z = z;
		obj.position.y = y;
		world.add(obj);
	}
	*/

	function addSphere(x,y,z){
		sphere = new THREE.Mesh(
			new THREE.SphereGeometry(1,32,32),
			new THREE.MeshLambertMaterial( {color:"pink"} )
		);
		sphere.position.x = x;
		sphere.position.y = y;
		sphere.position.z = z;
		listSpheres.push([sphere.position.x, sphere.position.y, sphere.position.z]);//coords spheres's list
		sphere.name = numSphere;
		numSphere+=1;//incr compteur
		var object = scene.getObjectByName( sphere.name, true );
		world.add(sphere);//add the new sphere to the world
		
	}

	
	function addLink(sphere1,sphere2){
		var material = new THREE.LineBasicMaterial({color: 0x5e6574});
		var points = [];
		points.push( new THREE.Vector3( listSpheres[sphere1][0], listSpheres[sphere1][1], listSpheres[sphere1][2] ) );
		points.push( new THREE.Vector3( listSpheres[sphere2][0], listSpheres[sphere2][1], listSpheres[sphere2][2] ) );
		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		var line = new THREE.Line( geometry, material );
		//listLink.push([line.position.x, line.position.y, line.position.z]);//coords link's list
		
		
		//line.name = numLink;
		//numLink+=1;//incr compteur
		//var object = scene.getObjectByName( line.name, true );
		world.add(line);
		
	}
	
	
	function isFloat(n){  //return true if n is a float. 
		return n === +n && n !== (n|0);
	}

	function isInteger(n){
		return n === +n && n === (n|0);
	   }


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
				if (objectHit == ground) {
					return false;
				}
				else {
					dragItem = objectHit;//object move
					world.add(targetForDragging);//add the target to the world
					targetForDragging.position.set(item.point.x,item.point.y,item.point.z);
					var num= dragItem.name;
					console.log(num);
					listSpheres[num][0] = item.point.x;//1st list element = new x coords after dragging
					listSpheres[num][1] = item.point.y;
					listSpheres[num][2] = item.point.z;
					
					//alert(targetForDragging.position);
					render();
					return true;
				}
				

			case ADD_SPHERE:
				if (objectHit == ground) {
					var locationX = item.point.x;  // Gives the point of intersection in world coords
					var locationZ = item.point.z;
					var locationY;
					var Zaxis = prompt("Please enter a number between 100 and -100 to choose the height of the object (relative to the grid) that you are moving:",40);
					if (Zaxis == null || Zaxis == "" || (isFloat(parseFloat(Zaxis))==false && isInteger(parseFloat(Zaxis))==false) ){
					  locationY=10; //default value if the value entered is not correct
					} else {
					  locationY = parseFloat(Zaxis/10);
					}
					console.log(locationY)
					
					var coords = new THREE.Vector3(locationX, locationY,locationZ);
					world.worldToLocal(coords);  // to add sphere in correct position, neew local coords for the world object
					addSphere(coords.x,coords.y,coords.z);//in 3D
					render();
					return false;
				}
				
			case ADD_LINK:
				if (objectHit == ground) {
					var numSphere1 = prompt("Please enter the number of the first sphere (number have to be < spheres number):",1);
					var numSphere2 = prompt("Please enter the number of the second sphere (number have to be < spheres number):",2);
				
					if(numSphere1 < numSphere && numSphere2 < numSphere){//spheres existing = numbers of spheres OK
						//working too with an add sphere = test OK
						addLink(numSphere1,numSphere2);//add the link between the two wanted spheres in 3D
						treeOfLinks.push([numSphere1,numSphere2]);
						treeOfLinks.push([numSphere2,numSphere1]);
						console.log("Longeur de la liste ",treeOfLinks.length);
						console.log("liste des liens",treeOfLinks);
						render();
					}
					else{//numbers of spheres not OK
						alert("/!\Careful, you tried to links inexistants spheres, please try again");
						numSphere1 = prompt("Please enter the number of the first sphere (number have to be < spheres number):",1);
						numSphere2 = prompt("Please enter the number of the second sphere (number have to be < spheres number):",2);
						addLink(numSphere1,numSphere2);//add the link between the two wanted spheres in 3D
						render();
				
					}
				}
				return false;
			default: // DELETE
				if (objectHit != ground) {
					world.remove(objectHit);
					render();
				}
				return false;
		}
	}

	function doMouseMove(x,y,evt,prevX,prevY) {
		if (mouseAction == ROTATE) {
			var dx = x - prevX;
			var dy = y - prevY;
			world.rotateX( dy/200 );
			world.rotateY( dx/200 );
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
			a = coords.x;  // clamp coords to the range -19 to 19, so object stays on ground
			b = coords.z;
			c = coords.y;
			
			dragItem.position.set(a,c,b);

			/*var item = intersects[0];
			var objectHit = item.object;
			dragItem = objectHit;*/
			var num= dragItem.name;

			let n = 0;
			let i =0;
			var list1=[];
			while (n< treeOfLinks.length) {       //we go through the list which contains informations on the links between each sphere
				if(treeOfLinks[n][0]==num){		  //if the sphere that we want to drag is connected with an others spheres, it will add links 
					list1.push(treeOfLinks[n][1]);              //list1 contain the name of all spheres conneceted with the dragItem
				}
				n++;
			}
			//console.log("num ... ",num);
			//console.log("list1 ... ",num);
			console.log("treeoflinks ... ",treeOfLinks);
			while(i<list1.length){
				addLink(num,list1[i]);
				console.log("num1 : ",list1, " num2 : ", num);
				i++;
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
		else if (document.getElementById("mouseAddSphere").checked) {
			mouseAction = ADD_SPHERE;
		}
		else if (document.getElementById("mouseAddLink").checked) {
			mouseAction = ADD_LINK;
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
		document.getElementById("mouseAddSphere").onchange = doChangeMouseAction;
		document.getElementById("mouseAddLink").onchange = doChangeMouseAction;
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
		}
	}

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