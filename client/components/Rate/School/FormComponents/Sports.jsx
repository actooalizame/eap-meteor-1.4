Sports = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			sportsValue: Session.get('sportsValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.sports ?
			Session.set('sportsValue', this.props.sports)
			:
			Session.set('sportsValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('sportsValue',0);
	},

	componentDidMount(){
		{this.props.sports ?
			jQuery('#range9').noUiSlider({
		    start: this.props.sports,
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
		    Session.set('sportsValue', val);
		  })
		  :
		  jQuery('#range9').noUiSlider({
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
		    Session.set('sportsValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('sportsValue', 0)
	},

	getSports(){
		let value = this.data.sportsValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Terminarás oxidado'};
		if(value==2){return 'Algo existe si quieres moverte un poco'};
		if(value==3){return 'Solo lo usual'};
		if(value==4){return 'Mucha variedad'};
		if(value==5){return '¡Se nota un esfuerzo en este punto!'};
	},
	
	slideColor(){
		let value = this.data.sportsValue;
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
          <h3>Incentivo deportivo: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Se preocupan de incentivar el deporte? Infraestructura deportiva, variedad, clases y etc."></i></h3>
          <div id="range9" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.sportsValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getSports()}</h2>
        </div>
			</div>
			)
	}
});