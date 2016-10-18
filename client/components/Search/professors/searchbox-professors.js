Template.searchBoxProfessors.helpers({
  professorsIndex: () => ProfessorsIndex,

  inputAttributes: function(){
  	let attr = {
  		placeholder: 'Escribe el nombre o apellido',
  		class: 'form-control'
  	}
  	return attr;
  }	
});