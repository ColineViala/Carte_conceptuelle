  
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
        rotateworld();
    }
}

function rotateworld() {
    requestAnimationFrame(render);
    world.rotation.x -= 0.007 * 2;
    world.rotation.y += 0.007;
    world.rotation.z -= 0.007 * 3;
    for(let i=0;i<listSpheres2.length;i++){
        listSpheres2[i].label[0].lookAt( camera.position );
        
    }
    for(let j=0;j<listLink.length;j++){
        listLink[j].label[0].lookAt( camera.position );        
    }

    renderer.render(scene, camera);
    setTimeout(() => {autoRotate();  }, 25); 
}


//-----------------------------------------DOWNLOAD MAP .JSON-------------------------------------------------------------------
function download_file() {

    console.log("listSpheres2",listSpheres2);
    var json_spheres_arr = {};
    var json_links_arr = {};
    var json_string='{ "spheres" : [';  
    var json_str_links = '{ "connected sphere(s)" : [';
    //console.log("crottin",json_str_links);

    for(let i=0;i<listSpheres2.length;i++){
        json_spheres_arr["sphere"] = listSpheres2[i].label[0].name;
        json_spheres_arr["position"] = listSpheres2[i].position ;
       
        for(let j=0;j<listSpheres2[i].connectedSphereName.length;j++){
            json_links_arr["sphere name"] = listSpheres2[i].connectedSphereName[j];
            json_links_arr["link name"] = listSpheres2[i].linkName[j];

            if(j<listSpheres2[i].connectedSphereName.length-1){
                json_str_links = json_str_links + JSON.stringify(json_links_arr) +',' ;
            }
            else{
                json_str_links = json_str_links + JSON.stringify(json_links_arr);
            } 
            
        }
        
        //console.log("json_str_links",json_str_links);
        if(i<listSpheres2.length-1){
            json_string =  json_string + '[' + JSON.stringify(json_spheres_arr) + ','+ json_str_links  +']}],'+"\n" ;
        }
        else{
            json_string =  json_string + '[' + JSON.stringify(json_spheres_arr)+ ','+ json_str_links + ']}]' ;
        }  
        json_str_links = '{ "connected sphere(s)" : [';
    } 
  
   json_string = json_string + ']}';
   console.log("texte json",json_string);
    var file;
    var properties = {type: 'json'}; // Specify the file's mime-type.
    try {
        // Specify the filename using the File constructor, but ...
        file = new File([json_string], "MindMap.json", properties);
    } catch (e) {
        // ... fall back to the Blob constructor if that isn't supported.
        file = new Blob([json_string], properties);
    }
    var url = URL.createObjectURL(file);
    document.getElementById('link').href = url;
  }
//------------------------------------------------------------------------------------------------------------------------------
  
  