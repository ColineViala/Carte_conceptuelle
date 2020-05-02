//--------------------------------------GET INDEX SPHERE---------------------------------------------------------------
function findIndexSphere(nameSphere){
    var indexSphere;
    for(let i=0; i<listSpheres2.length; i++){//i varies in listSpheres2
        if (listSpheres2[i].label[0].name == nameSphere){//check sphere's name
            indexSphere = i;//the index of the sphere is her number in listSpheres2
        }
    }
    return indexSphere;//return sphere's number
}
//------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------GET LABELS ARRAY----------------------------------------------------------
function CreateLabelTab(){
    var listLabels=[];//list empty at the beginning
    for(let i=0;i<listSpheres2.length;i++){
        listLabels.push(listSpheres2[i].label[0].name);//put the name of the sphere in the list (=the sphere's label)
     }
    fillDropdown(listLabels);//fill the dropdown menu (to choose two spheres in "Add Link" button by their name)
    return listLabels;//return the list which contains all the spheres labels
}
//-------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------FILL DROPDOWN 1-----------------------------------------------------------
function fillDropdown(nameSphereList){
    //Sphere 1
    // Get dropdown element by object representing the element whose id property (id=sphere 1)
    var dropdown_sphere1 = document.getElementById("sphere1");
    // Loop through the array
    dropdown_sphere1.length=0;
    for (var i = 0; i < nameSphereList.length; ++i) {
        // Append the element to the end of Array list
        dropdown_sphere1[dropdown_sphere1.length] = new Option(nameSphereList[i], nameSphereList[i]);
    }
    //Sphere 2//do the same as for the sphere 1
    var dropdown_sphere2 = document.getElementById("sphere2");
    dropdown_sphere2.length=0;
    for (var i = 0; i < nameSphereList.length; ++i) {
        dropdown_sphere2[dropdown_sphere2.length] = new Option(nameSphereList[i], nameSphereList[i]);
    }
}
//-----------------------------------------------------------------
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min; //get a random number between a max and a min chosen by the user
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