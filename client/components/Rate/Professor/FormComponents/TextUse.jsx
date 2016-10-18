TextUse = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			textValue: Session.get('textValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.textUse ?
			Session.set('textValue', this.props.textUse)
			:
			Session.set('textValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('textValue',0);
	},

	componentDidMount(){
		{this.props.textUse ?
			jQuery('#range5').noUiSlider({
		    start: this.props.textUse,
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
		    Session.set('textValue', val);
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
		    Session.set('textValue', val);
		  })
		}
	},

	componentWillUnmount(){
		Session.set('textValue', 0)
	},

	getTextUse(){
		let value = this.data.textValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return '¿Qué material?'};
		if(value==2){return 'A veces entregó algo básico'};
		if(value==3){return 'Sirve como apoyo'};
		if(value==4){return 'Muy completo'};
		if(value==5){return 'Es excelente como ayuda'};
	},

	slideColor(){
		let value = this.data.textValue;
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
          <h3>Material de apoyo utilizado: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Qué te pareció el material utilizado por el docente a la hora de dictar la clase o proporcionarlo como apoyo de estudio?"></i></h3>
          <div id="range5" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.textValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getTextUse()}</h2>
        </div>
			</div>
			)
	}
});