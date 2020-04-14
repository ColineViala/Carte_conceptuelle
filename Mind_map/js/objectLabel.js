
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