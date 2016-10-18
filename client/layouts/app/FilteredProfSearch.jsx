FilterSubs = new SubsManager();

FilteredProfSearch = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let selected = Session.get('filterSchool');
		if(selected!==undefined){
			FilterSubs.subscribe('filteredProf',selected);
		}
		var title = 'Evalúa al Profe - Buscador de profesores ',
			metaInfo = {name: 'description', content: 'Busca evaluaciones de profesores para considerarlas en tu próximo periodo de "toma de ramos".'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			selected: selected
		}
	},

	render(){
		return(
				<div>
					<div className="row app-top-margin">
						<div className="col-sm-6 col-sm-offset-3 text-center">
							<i className="fa fa-search fa-3x"></i><br/><h2 className="brand-txt">Encuentra un Profesor</h2>
							<NewFilters />
							
						</div>
					</div>
					<div className="row">
						<h3 className="text-center brand-txt suggest-msg"><a href="/sugerir-profesor">¿Falta un Profe?</a></h3>
					</div>
				</div>
				
			
			)
	}
});