RankSubs = new SubsManager();

Ranking = React.createClass({
	mixins: [ReactMeteorData],

	
	getMeteorData(){
		var title = 'Evalúa al Profe - Ranking de profesores y universidades',
			metaInfo = {name: 'description', content: 'Revisa los mejores y peores profesores universidades, ¡llego la hora de la verdad!'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);

		const profHandle = RankSubs.subscribe('votedProfessors'),
					schoolHandle = RankSubs.subscribe('votedSchools');
		return {
			profReady: profHandle.ready(),
			schoolReady: schoolHandle.ready()
		}
	},

	render(){
		return(
			<div>
				{this.data.profReady && this.data.schoolReady ? 
					<div className="app-top-margin" id="ranking">
						
						
						<div className="row">
							<div className="col-lg-3">
								<ul className="nav nav-pills" role="tablist">
							    <li role="presentation" className="active"><a href="#profesores" aria-controls="profesores" role="tab" data-toggle="tab">Profesores</a></li>
							    <li role="presentation"><a href="#universidades" aria-controls="universidades" role="tab" data-toggle="tab">Universidades</a></li>
							  </ul>
							</div>
							
							<div className="col-lg-6 text-center">
								<i className="fa fa-line-chart fa-3x"></i><br/><h2 className="brand-txt">Ranking</h2>
							</div>
						</div>
						

						<div className="row">
							<div className="tab-content">
						    <div role="tabpanel" className="tab-pane active" id="profesores"><RankingProfessors /></div>
						    <div role="tabpanel" className="tab-pane" id="universidades"><RankingSchools /></div>
						 
						  </div>
						</div>
					</div>
					:
					<LoadingWrap />
				}
			</div>
			)
	}
});