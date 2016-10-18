Location = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			locationValue: Session.get('locationValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.location ?
			Session.set('locationValue', this.props.location)
			:
			Session.set('locationValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('locationValue',0);
	},

	componentDidMount(){
		{this.props.location ?
			jQuery('#range2').noUiSlider({
		    start: this.props.location,
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
		    Session.set('locationValue', val);
		  })
		  :
		  jQuery('#range2').noUiSlider({
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
		    Session.set('locationValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('locationValue', 0)
	},

	getLocation(){
		let value = this.data.locationValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return '#PeorLugarDelMundo'};
		if(value==2){return 'No es una muy buena ubicación'};
		if(value==3){return 'Piola'};
		if(value==4){return 'Buena ubicación'};
		if(value==5){return 'Excelente spot'};
	},
	
	slideColor(){
		let value = this.data.locationValue;
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
          <h3>Ubicación: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Que tan fácil es el acceso a tu campus y como encuentras la zona que lo rodea? Temas como el transporte público, estacionamientos, el barrio y su onda"></i></h3>
          <div id="range2" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        <h1 className="rate-value"><strong>{this.data.locationValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getLocation()}</h2>
        </div>
			</div>
			)
	}
});