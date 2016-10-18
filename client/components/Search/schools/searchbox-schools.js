Template.searchBoxSchools.helpers({
  schoolsIndex: () => SchoolsIndex,

  inputAttributes: function(){
  	let attr = {
  		placeholder: 'Busca universidades',
  		class: 'form-control'
  	}
  	return attr;
  }	
});