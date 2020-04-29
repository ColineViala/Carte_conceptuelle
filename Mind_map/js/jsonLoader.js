
function readSingleFile(evt) {
//Retrieve the first (and only!) File from the FileList object
var f = evt.target.files[0]; 

if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
        var contents = e.target.result;
        jsonFileLoader(JSON.parse(contents));
    }
    r.readAsText(f);
} else { 
    alert("Failed to load file");
}
}

document.getElementById("jsonFileLoader").addEventListener('change', readSingleFile, false);



function jsonFileLoader(jsonFileContents){
    var mindmap;
    numSphere = 0;
    numLink=100;
    angle=0;
    mindmap=jsonFileContents;
    //console.log("mindmap",mindmap);
    sphereLinks=[]; //list of links which have to be created with the JSON file
    let linkexist;
    linkNames =[];
    for(let i=0;i<mindmap["spheres"].length;i++){ //the first for loop to allows to access at all the sphere informations : mindmap["spheres"]= [object1],[object2],...
        //fruits[i][0]=mindmap["spheres"][i]["sphere"];
        console.log("a",mindmap["spheres"][i][1]["connected sphere(s)"]);
        for(let k=0;k<mindmap["spheres"][i][1]["connected sphere(s)"].length;k++){  //the second for loop allows to access at all the connected spheres informations (name of the sphere and name of the link) like that : mindmap["spheres"][i][1]["connected sphere(s)"] = [{sphere name: "Apple", link name: "red"},{sphere name: "Blueberry", link name: "blue"}]
            linkexist=1;   //at first, we suppose that the link does not already exist in the list sphereLinks
            for(let j=0;j<sphereLinks.length;j++){ //the third for loop allows to know if the link already exist in the sphereLink list.  The aim of this loop is to build a list (sphereLinks) which contain the connected spheres only once like this : sphereLinks=[[name sphere1, name sphere2],[name sphere1,name sphere3]]
                //console.log("a",sphereLinks[j]);
                //console.log("b",mindmap["spheres"][i][1]["connected sphere(s)"][k]["sphere name"]);
                if((sphereLinks[j][0]==mindmap["spheres"][i][1]["connected sphere(s)"][k]["sphere name"]) && (sphereLinks[j][1]==mindmap["spheres"][i][0]["sphere"]) && (linkexist==1)){ //condition to know if the link already exist
                    //console.log(sphereLinks[j]);
                    linkexist=2; //If a similary links already between two spheres, linkexist value will be 2 to significate that we do not need to push this link in sphereLinks because he already exist in this list.
                }
            }
            //console.log("linkexist",linkexist);
            if(linkexist==1){ //if linkexist=1, the links does not already exist in sphereLinks. So we can push in sphereLinks informations about the connected spheres to add the link between them
                sphereLinks.push([mindmap["spheres"][i][0]["sphere"],mindmap["spheres"][i][1]["connected sphere(s)"][k]["sphere name"]]);
                linkNames.push(mindmap["spheres"][i][1]["connected sphere(s)"][k]["link name"]);
                //console.log("coordy",sphereLinks);
            }
        }
        if(i==0){  //this condition allow to empty the world (the entire mindmap) before we add the first object in it. See the 'jsonFileToMindMap' function arguments and if conditions to understand how it work
            jsonFileToMindMap(mindmap["spheres"][i][0],"beginning"); //first call to the function jsonFileToMindMap
        }else{
            jsonFileToMindMap(mindmap["spheres"][i][0],"notthebeginning"); //other calls to the function jsonFileToMindMap (without empty the mind map)
        }
        //console.log(fruits[i][0]);
        
        
    }
    //console.log("coordy",sphereLinks);
    jsonCreateLinks(sphereLinks, linkNames); //call to function jsonCreateLinks to add one link between the connected spheres. 
}

function jsonFileToMindMap(object1, arg){ 
        if(listSpheres2.length==0){
            var canvasIsEmpty="true";
        }else{ 
            var canvasIsEmpty="false";
        }
        if(canvasIsEmpty=="true" | arg=="notthebeginning"){
            canvasIsEmpty="false";            
            addSphere(object1["position"]["x"],object1["position"]["y"],object1["position"]["z"],false,object1["sphere"]);
        }else {
            //console.log("erreé",canvasIsEmpty);
            if (window.confirm('Do you want to empty your mind map ?') ){
                deleteObjects();
                canvasIsEmpty="false";
                addSphere(object1["position"]["x"],object1["position"]["y"],object1["position"]["z"],false,object1["sphere"]);  
            
            }else{
                //we do nothing 
            }
        }
    //document.getElementById("autoRotate").checked = true;
    rotateworld();
    }

function jsonCreateLinks(sphereLinks,linkNames){
    for(let i=0;i<sphereLinks.length; i++){
        var indexSphere1 = findIndexSphere(sphereLinks[i][0]);
        var indexSphere2 = findIndexSphere(sphereLinks[i][1]);
        listSpheres2[indexSphere1].connectedSphere.push(listSpheres2[indexSphere1].name);
        listSpheres2[indexSphere2].connectedSphere.push(listSpheres2[indexSphere2].name);
        listSpheres2[indexSphere1].connectedSphereName.push(listSpheres2[indexSphere2].label[0].name);
        listSpheres2[indexSphere2].connectedSphereName.push(listSpheres2[indexSphere1].label[0].name);
        addLink(sphereLinks[i][0],sphereLinks[i][1],0,linkNames[i]);
        console.log(listSpheres2);
        
        
    }
}

