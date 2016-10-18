SchoolSearch = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		var title = 'Evalúa al Profe - Buscador de universidades',
			metaInfo = {name: 'description', content: 'Revisa evaluaciones de las distintas universidades de Chile'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			userId: Meteor.userId()
		}
	},

	render(){
		return(
			<div className="row app-top-margin">
				<div className="col-sm-6 col-sm-offset-3 text-center">
					<i className="fa fa-search fa-3x"></i><br/><h2 className="brand-txt">Encuentra Universidades</h2>
					<SearchSchools />
					
				</div>

			</div>
				
			)
	}
});