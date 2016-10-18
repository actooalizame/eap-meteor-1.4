Clarity = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			clarityValue: Session.get('clarityValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.clarity ?
			Session.set('clarityValue', this.props.clarity)
			:
			Session.set('clarityValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('clarityValue',0);
	},

	componentDidMount(){
		{this.props.clarity ?
			jQuery('#range2').noUiSlider({
		    start: this.props.clarity,
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
		    Session.set('clarityValue', val);
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
		    Session.set('clarityValue', val);
		  })
		}
	},

	componentWillUnmount(){
		Session.set('clarityValue', 0)
	},

	getClarity(){
		let value = this.data.clarityValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return '¿Cómo dijo que dijo?'};
		if(value==2){return 'Confuso'};
		if(value==3){return 'Se entiende el mensaje'};
		if(value==4){return 'Bastante claro'};
		if(value==5){return 'Claro como el agua'};
	},

	slideColor(){
		let value = this.data.clarityValue;
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
          <h3>Claridad para enseñar: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿El profesor fue claro con los requerimientos de la clase y la materia enseñada?"></i></h3>
          <div id="range2" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.clarityValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getClarity()}</h2>
        </div>
      </div>
			)
	}
});