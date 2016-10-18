Oportunidades = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			oportunidadValue: Session.get('oportunidadValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.oportunidad ?
			Session.set('oportunidadValue', this.props.oportunidad)
			:
			Session.set('oportunidadValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('oportunidadValue',0);
	},

	componentDidMount(){
		{this.props.oportunidad ?
			jQuery('#range3').noUiSlider({
		    start: this.props.oportunidad,
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
		    Session.set('oportunidadValue', val);
		  })
		  :
		  jQuery('#range3').noUiSlider({
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
		    Session.set('oportunidadValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('oportunidadValue', 0)
	},

	getOportunidad(){
		let value = this.data.oportunidadValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'No me ayudará en nada'};
		if(value==2){return 'No mucho'};
		if(value==3){return 'Existirán oportunidades si me lo propongo'};
		if(value==4){return 'Muchas oportunidades'};
		if(value==5){return 'Una excelente herramienta para mi futuro'};
	},
	
	slideColor(){
		let value = this.data.oportunidadValue;
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
          <h3>Oportunidades: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Crees que estudiar en tu Universidad o Instituto te ayudara en tu futuro?, ¿Consideras que tiene una red de ex-alumnos poderosa?, ¿Sientes  que te entregara mayores oportunidades laborales?"></i></h3>
          <div id="range3" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.oportunidadValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getOportunidad()}</h2>
        </div>
			</div>
			)
	}
});