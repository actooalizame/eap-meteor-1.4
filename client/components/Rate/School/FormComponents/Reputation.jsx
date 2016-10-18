Reputation = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			reputationValue: Session.get('reputationValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.reputation ?
			Session.set('reputationValue', this.props.reputation)
			:
			Session.set('reputationValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('reputationValue',0);
	},

	componentDidMount(){
		{this.props.reputation ?
			jQuery('#range1').noUiSlider({
		    start: this.props.reputation,
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
		    Session.set('reputationValue', val);
		  })
		  :
		  jQuery('#range1').noUiSlider({
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
		    Session.set('reputationValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('reputationValue', 0)
	},

	getReputation(){
		let value = this.data.reputationValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Nadie la conoce'};
		if(value==2){return 'Bajo prestigio'};
		if(value==3){return 'Está en la media'};
		if(value==4){return 'Bastante respetada'};
		if(value==5){return 'Distinguida'};
	},
	
	slideColor(){
		let value = this.data.reputationValue;
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
          <h3>Reputación: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Cómo crees que estudiar en esta Universidad o Instituto de Educación Superior es percibido y juzgado por el resto de Chile"></i></h3>
          <div id="range1" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.reputationValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getReputation()}</h2>
        </div>
			</div>
			)
	}
});