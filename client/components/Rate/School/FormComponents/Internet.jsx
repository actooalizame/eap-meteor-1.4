Internet = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			internetValue: Session.get('internetValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.internet ?
			Session.set('internetValue', this.props.internet)
			:
			Session.set('internetValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('internetValue',0);
	},

	componentDidMount(){
		{this.props.internet ?
			jQuery('#range6').noUiSlider({
		    start: this.props.internet,
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
		    Session.set('internetValue', val);
		  })
		  :
		  jQuery('#range6').noUiSlider({
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
		    Session.set('internetValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('internetValue', 0)
	},

	getInternet(){
		let value = this.data.internetValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Intente reiniciar el modem'};
		if(value==2){return 'Cargando...'};
		if(value==3){return 'Funciona para cumplir con lo básico'};
		if(value==4){return 'Buenos sistemas'};
		if(value==5){return 'Soplado'};
	},
	
	slideColor(){
		let value = this.data.internetValue;
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
          <h3>Computadores e Internet: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Tuviste acceso a buenos computadores, Que tal el internet?, Se obtiene buen Wifi a lo largo del campus?"></i></h3>
          <div id="range6" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.internetValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getInternet()}</h2>
        </div>
			</div>
			)
	}
});