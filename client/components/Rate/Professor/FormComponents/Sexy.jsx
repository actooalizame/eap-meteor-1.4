Sexy = React.createClass({

	componentWillMount(){
		Session.setDefault('sexy', 'Neutro');
	},

	setSexy(){
		let sexy = jQuery('#checkboxSexy');
		if (sexy.is(':checked')){ Session.set('sexy', 'Si'); }
		else { Session.set('sexy', 'Neutro'); }
	},

	getOptions(){
		return(
			<div className="checkbox checkbox-danger checkbox-inline checkbox-circle">
		    <input type="checkbox" value="Si" id="checkboxSexy" onClick={this.setSexy} />
		    <label htmlFor="checkboxSexy">
		    	Si
		    </label>
		  </div>
			)
	},

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="sexy"><h4>Te pareció Sexy el profesor?<small> (opcional)</small></h4></label>
		  	</div>
		  	{this.props.sexy ?
		  		<div>
		  			<div className="col-sm-4">
		  				<h3 className="text-center">Elegiste: <strong>{this.props.sexy}</strong></h3>
		  			</div>
			  		<div className="col-sm-offset-4">
							{this.getOptions()}
					  </div>
					</div>
		  		:
		  		<div className="col-sm-offset-4 col-sm-3">
						{this.getOptions()}
				  </div>
		  	}
		  	
			</div>
			)
	}
});