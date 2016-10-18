Infrastructure = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			infrastructureValue: Session.get('infrastructureValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.infrastructure ?
			Session.set('infrastructureValue', this.props.infrastructure)
			:
			Session.set('infrastructureValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('infrastructureValue',0);
	},

	componentDidMount(){
		{this.props.infrastructure ?
			jQuery('#range5').noUiSlider({
		    start: this.props.infrastructure,
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
		    Session.set('infrastructureValue', val);
		  })
		  :
		  jQuery('#range5').noUiSlider({
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
		    Session.set('infrastructureValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('infrastructureValue', 0)
	},

	getInfrastructure(){
		let value = this.data.infrastructureValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Mmmm...'};
		if(value==2){return 'Necesita una mano'};
		if(value==3){return 'Cumple su función'};
		if(value==4){return 'Bien'};
		if(value==5){return '¡Una maravilla!'};
	},
	
	slideColor(){
		let value = this.data.infrastructureValue;
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
          <h3>Infraestructura y aéreas comunes: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Cómo encontraste el campus para llevar tu vida universitaria?. Calidad de las salas, temperatura, lugares de descanso y áreas comunes"></i></h3>
          <div id="range5" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.infrastructureValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getInfrastructure()}</h2>
        </div>
			</div>
			)
	}
});