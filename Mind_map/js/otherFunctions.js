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
//------------------------------------------------------------------------------------------------------------------------

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