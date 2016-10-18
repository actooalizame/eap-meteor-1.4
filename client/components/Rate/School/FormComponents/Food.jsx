Food = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			foodValue: Session.get('foodValue')
		}
	},

	componentWillReceiveProps(){
		{this.props.food ?
			Session.set('foodValue', this.props.food)
			:
			Session.set('foodValue',0)
		}
	},

	componentWillMount(){
		Session.setDefault('foodValue',0);
	},

	componentDidMount(){
		{this.props.food ?
			jQuery('#range7').noUiSlider({
		    start: this.props.food,
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
		    Session.set('foodValue', val);
		  })
		  :
		  jQuery('#range7').noUiSlider({
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
		    Session.set('foodValue', val);
		  })
		}

	},

	componentWillUnmount(){
		Session.set('foodValue', 0)
	},

	getFood(){
		let value = this.data.foodValue;
		if(value==0){return 'Evalúa de 1 a 5'};
		if(value==1){return 'Me hace perder el hambre'};
		if(value==2){return 'Solo si no tienes otra opción'};
		if(value==3){return 'Es perfectamente comible'};
		if(value==4){return 'Variedad de gustos'};
		if(value==5){return 'A lo Master Chef'};
	},
	
	slideColor(){
		let value = this.data.foodValue;
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
          <h3>Comida: <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="¿Qué tal el casino de tu campus?. Precios, variedad de ofertas, maquinas dispensadoras, posibilidad de comida saludable, ¿quién dijo un cafecito?"></i></h3>
          <div id="range7" style={divStyle}></div>
        </div>
        <div className="col-sm-4">
        	<h1 className="rate-value"><strong>{this.data.foodValue}</strong></h1>
        </div>
        <div className="col-sm-4 rate-txt">
        	<h2>{this.getFood()}</h2>
        </div>
			</div>
			)
	}
});