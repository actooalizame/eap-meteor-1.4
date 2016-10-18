Template.searchProfessorsNew.onCreated(function(){
    Session.setDefault('filterSchool', undefined);
});

Template.searchProfessorsNew.events({
	'focus .form-control': function(){
		jQuery('.form-control').attr('placeholder', 'Tip: Nombre completo o apellido');
	},
	'blur .form-control': function(){
		jQuery('.form-control').attr('placeholder', 'Busca profesores');
	},

	'change .filter-select': function(){
    var selected = jQuery('.filter-select').val();
    if(selected!==''){
      Session.set('filterSchool', selected);
    }
    /*else {
    toastr['error']('Elige una universidad!', 'Atencion!');
    }*/
	  },
	  'click .clear-session': function(){
	    Session.set('filterSchool', undefined);
	  }
});

Template.searchProfessorsNew.helpers({
	'link': function(){
		var routeName = FlowRouter.getRouteName();
		if(routeName==='home'){return 'profesor'}
		if(routeName==='evaluarContainer'){return 'evalua-al-profe'}
	},
	'university': function(){
    return Session.get('filterSchool');
  },
  'hasSession': function(){
    var filter = Session.get('filterSchool');
    if(filter!==undefined){
      return true;
    }
  },
  'hiddeClass': function(){
    var filter = Session.get('filterSchool');
    if(filter===undefined){
      return 'hidden';
    }
  }
});

Template.searchProfessorsNew.onDestroyed(function(){
    Session.setDefault('filterSchool', undefined);
});