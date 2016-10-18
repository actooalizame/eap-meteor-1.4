Eligible = React.createClass({
	componentWillMount(){
		Session.setDefault('eligible', '---------');
	},

	eligibleYes(){
		Session.set('eligible', 'Si');
	},

	eligibleNo(){
		Session.set('eligible', 'No');
	},

	getOptions(){
		return(
			<div>
				<div className="radio radio-inline radio-success">
        	<input type="radio" name="eligible" id="radio1" value="Si" onClick={this.eligibleYes}/>
				  <label htmlFor="radio1"><h3 className="brand-txt">Si</h3></label>
				</div>
				<div className="radio radio-inline radio-danger">
					<input type="radio" name="eligible" id="radio2" value="No" onClick={this.eligibleNo}/>
				  <label htmlFor="radio2"><h3 className="brand-txt">No</h3></label>
				</div>
			</div>
			)
	},

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="eligible"><h3>¿Tuviste la posibilidad de elegir al profesor? </h3></label>
		  	</div>
		  	{this.props.eligible ?
		  		<div>
			  		<div className="col-sm-4">
			  			<h3 className="text-center">Elegiste: <strong>{this.props.eligible}</strong></h3>
			  		</div>
			  		<div className="col-sm-offset-4">
			      	{this.getOptions()}
					  </div>
					 </div>
		  		:
			  	<div className="col-md-offset-5 col-sm-offset-4 col-md-3 col-sm-4">
		        {this.getOptions()}
				  </div>
		  	}
		  	
			</div>
		)
	}
});