  
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


