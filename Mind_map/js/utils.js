'use strict'

function displayErrors(errorCode){	
	let messages = { 
		 400: 'Requête incorrecte', 
		 401: 'Authentifiez-vous', 
		 403: 'Accès refusé', 
		 404: 'Page non trouvée', 
		 500: 'Erreur interne du serveur', 
		 503: 'Service indisponible' 
	 }; 
	 document.getElementById('errors').innerHTML=+'strong>' + messages[errorCode]+'</strong>';
	 show('errors');
	 setTimeout(() =>
	 {
		 hide('errors');
		  
	 },5000);
}

function show(id)
{
		document.getElementById(id).classList.remove('d-none');
}

function hide(id) {
	document.getElementById(id).classList.add('d-none');
}

