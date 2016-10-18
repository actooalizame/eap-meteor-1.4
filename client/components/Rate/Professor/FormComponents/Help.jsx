Help = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			helpValue: Session.get('helpValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.help ?
			Session.set('helpValue', this.props.help)
			:
			Session.set('helpValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('helpValue',0);
	},

	componentDidMount(){
		jQuery('[data-toggle="tooltip"]').tooltip();
		{this.props.help ?
			jQuery('#range1').noUiSlider({
		    start: this.props.help,
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
		    Session.set('helpValue', val);
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
		    Session.set('helpValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('helpValue', 0)
	},

	getHelp(){
		let value = this.data.helpValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'No te ayudará'};
		if(value==2){return 'Ruega por su ayuda'};
		if(value==3){return 'Si le pides ayuda, estará ahí'};
		if(value==4){return 'Te intentará ayudar constantemente'};
		if(value==5){return '¡Me salvó el semestre!'};
	},

	slideColor(){
		let value = this.data.helpValue;
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
          <h3>Ayuda al alumno <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Sentiste que el profesor estaba disponible para ayudarte?"></i></h3>
          <div id="range1" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.helpValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getHelp()}</h2>
        </div>
			</div>
			)
	}
});