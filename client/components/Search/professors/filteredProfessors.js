Template.filteredProfessors.onCreated(function(){
    Session.setDefault('filterSchool', undefined);
});

Template.filteredProfessors.helpers({
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

Template.filteredProfessors.events({
  /*'submit .filter-professors': function(event){
    event.preventDefault();
    var selected = event.target.university.value;
    if(selected!==''){
      Session.set('filterSchool', selected);
    }
    else {
      alert('Elige una universidad!');
    }
  },*/
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

Template.filteredProfessors.onDestroyed(function(){
    Session.setDefault('filterSchool', undefined);
});



