Library = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			libraryValue: Session.get('libraryValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.library ?
			Session.set('libraryValue', this.props.library)
			:
			Session.set('libraryValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('libraryValue',0);
	},

	componentDidMount(){
		{this.props.library ?
			jQuery('#range4').noUiSlider({
		    start: this.props.library,
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
		    Session.set('libraryValue', val);
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
		    Session.set('libraryValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('libraryValue', 0)
	},

	getLibrary(){
		let value = this.data.libraryValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'No vale la pena visitarla'};
		if(value==2){return 'Con suerte te servirá'};
		if(value==3){return 'Cumple con lo básico'};
		if(value==4){return 'Es recomendable'};
		if(value==5){return 'Era mi segunda casa de estudios'};
	},
	
	slideColor(){
		let value = this.data.libraryValue;
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
          <h3>Biblioteca: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Es una biblioteca tranquila para estudiar?, Posee constante disponibilidad de salas y lugares de estudio?, ¿Encontraste el material que buscabas?"></i></h3>
          <div id="range4" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	
        	<h1 className="rate-value"><strong>{this.data.libraryValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getLibrary()}</h2>
        </div>
			</div>
			)
	}
});