Template.searchSchoolsNew.helpers({
	'link': function(){
		var routeName = FlowRouter.getRouteName();
		if(routeName==='home'||routeName==='buscaUniversidades'){return 'universidad'}
		if(routeName==='evaluarContainer'){return 'evalua-la-u'}
	}
});