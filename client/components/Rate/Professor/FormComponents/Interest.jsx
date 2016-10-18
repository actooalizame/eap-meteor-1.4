Interest = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			interestValue: Session.get('interestValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.interest ?
			Session.set('interestValue', this.props.interest)
			:
			Session.set('interestValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('interestValue',0);
	},

	componentDidMount(){
		{this.props.interest ?
			jQuery('#range4').noUiSlider({
		    start: this.props.interest,
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
		    Session.set('interestValue', val);
		  })
		  :
		  jQuery('#range4').noUiSlider({
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
		    Session.set('interestValue', val);
		  })
		}
	},

	componentWillUnmount(){
		Session.set('interestValue', 0)
	},

	getInterest(){
		let value = this.data.interestValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Te quedarás sin batería en el celular'};
		if(value==2){return 'Muy bajo'};
		if(value==3){return 'Algo de interés'};
		if(value==4){return 'Bastante interesante'};
		if(value==5){return 'Una de mis clases preferidas'};
	},

	slideColor(){
		let value = this.data.interestValue;
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
          <h3>Tu interés en la clase: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Cuál era tu interés real en la clase?"></i></h3>
          <div id="range4" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.interestValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getInterest()}</h2>
        </div>
			</div>
			)
	}
});