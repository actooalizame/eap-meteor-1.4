Activities = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			activitiesValue: Session.get('activitiesValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.activities ?
			Session.set('activitiesValue', this.props.activities)
			:
			Session.set('activitiesValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('activitiesValue',0);
	},

	componentDidMount(){
		{this.props.activities ?
			jQuery('#range8').noUiSlider({
		    start: this.props.activities,
		    step: 1,
		    behaviour: 'snap',
		    range: {
		      'min': 0,
		      'max': 5
		    },
		    format: wNumb({
					decimals: 0
				})
		  }).on('slide', function (ev, val) {
		    Session.set('activitiesValue', val);
		  })
		  :
		  jQuery('#range8').noUiSlider({
		    start: 0,
		    step: 1,
		    behaviour: 'snap',
		    range: {
		      'min': 0,
		      'max': 5
		    },
		    format: wNumb({
					decimals: 0
				})
		  }).on('slide', function (ev, val) {
		    Session.set('activitiesValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('activitiesValue', 0)
	},

	getActivities(){
		let value = this.data.activitiesValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return '¿Existe la vida en este lugar? '};
		if(value==2){return 'Mejor ir a ver TV en casa'};
		if(value==3){return 'Lo que uno espera'};
		if(value==4){return 'Existen muchas actividades'};
		if(value==5){return 'Lo pasarás filete'};
	},
	
	slideColor(){
		let value = this.data.activitiesValue;
		if(value==0){return '#fff'};
		if(value==1){return '#c0392b'};
		if(value==2){return '#e67e22'};
		if(value==3){return '#f1c40f'};
		if(value==4){return '#2ecc71'};
		if(value==5){return '#2980b9'};
	},

	render(){
		let value = this.slideColor(),
				divStyle = {
		  	backgroundColor: value
				};
		return(
			<div>
				<div className="col-sm-4">
          <h3>Vida universitaria y actividades extra programáticas: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Qué tal la vida universitaria?, ¿Existen eventos como tocatas, clubs, talleres, paseos, actividades pastorales eventos deportivos o etc.?"></i></h3>
          <div id="range8" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.activitiesValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getActivities()}</h2>
        </div>
			</div>
			)
	}
});