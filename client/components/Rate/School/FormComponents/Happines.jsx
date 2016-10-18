Happines = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			happinesValue: Session.get('happinesValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.happines ?
			Session.set('happinesValue', this.props.happines)
			:
			Session.set('happinesValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('happinesValue',0);
	},

	componentDidMount(){
		{this.props.happines ?
			jQuery('#range10').noUiSlider({
		    start: this.props.happines,
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
		    Session.set('happinesValue', val);
		  })
		  :
		  jQuery('#range10').noUiSlider({
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
		    Session.set('happinesValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('happinesValue', 0)
	},

	getHappines(){
		let value = this.data.happinesValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return ':('};
		if(value==2){return 'Decepcionado'};
		if(value==3){return 'No me encanta ni me quejo'};
		if(value==4){return 'Contento en general'};
		if(value==5){return 'No puede haber sido mejor estar acá'};
	},
	
	slideColor(){
		let value = this.data.happinesValue;
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
          <h3>Felicidad: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Te sientes feliz en tu Universidad o Instituto en general?"></i></h3>
          <div id="range10" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.happinesValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getHappines()}</h2>
        </div>
			</div>
			)
	}
});