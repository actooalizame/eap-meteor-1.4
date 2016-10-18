RateContainer = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		var title = 'Evalúa al Profe – Evaluar profesores y universidades chilenas',
			metaInfo = {name: 'description', content: 'Evalúa a tu profesor de forma anónima, publica y externa a tu universidad. Glorifica o castiga a quien lo merezca.'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			userId: Meteor.userId()
		}
	},
	render(){
		return(
			<div>
				<div className="row app-top-margin">
					<div className="col-sm-6 col-sm-offset-3 text-center">
						<i className="fa fa-search fa-3x"></i><br/><h2 className="brand-txt">Evalúa Profesores o Universidades</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-offset-1 col-md-5">
						<SearchProfessors />
					</div>
					<div className="col-md-5">
						<SearchSchools />
					</div>
				</div>
				<div className="row">
					<h3 className="text-center brand-txt suggest-msg-mod"><a href="/sugerir-profesor">¿Falta un Profe?</a></h3>
				</div>
			</div>
			)
	}
});