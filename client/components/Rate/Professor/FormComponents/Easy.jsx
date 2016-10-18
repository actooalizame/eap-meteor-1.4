Easy = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			easyValue: Session.get('easyValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.easy ?
			Session.set('easyValue', this.props.easy)
			:
			Session.set('easyValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('easyValue',0);
	},

	componentDidMount(){
		{this.props.easy ?
			jQuery('#range3').noUiSlider({
		    start: this.props.easy,
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
		    Session.set('easyValue', val);
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
		    Session.set('easyValue', val);
		  })
		}
	},

	componentWillUnmount(){
		Session.set('easyValue', 0)
	},

	getEasy(){
		let value = this.data.easyValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return '¡Reprobarás!'};
		if(value==2){return 'Necesitas esforzarte para pasar'};
		if(value==3){return 'La dificultad que corresponde'};
		if(value==4){return 'Facilito'};
		if(value==5){return 'Clase tomada, clase pasada'};
	},

	slideColor(){
		let value = this.data.easyValue;
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
          <h3>Facilidad: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Qué tan fácil fue su clase?"></i></h3>
          <div id="range3" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.easyValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getEasy()}</h2>
        </div>
      </div>
			)
	}
});