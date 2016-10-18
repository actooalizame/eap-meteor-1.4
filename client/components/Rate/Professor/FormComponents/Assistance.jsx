Assistance = React.createClass({
	componentWillMount(){
		Session.setDefault('assistance', 'Obligatoria');
	},

	assistanceYes(){
		Session.set('assistance', 'Obligatoria');
	},

	assistanceNo(){
		Session.set('assistance', 'No obligatoria');
	},

	getOptions(){
		return(
			<div>
				<div className="radio radio-inline radio-success">
	      	<input type="radio" name="assistance" id="radio5" value="Obligatoria" onClick={this.assistanceYes}/>
				  <label htmlFor="radio5"><h3 className="brand-txt">Obligatoria</h3></label>
				</div>
				<div className="radio radio-inline radio-danger">
					<input type="radio" name="assistance" id="radio6" value="No obligatoria" onClick={this.assistanceNo}/>
				  <label htmlFor="radio6"><h3 className="brand-txt">No obligatoria</h3></label>
				</div>
			</div>
			)
	},

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="assistance"><h3>Asistencia</h3></label>
		  	</div>
		  	{this.props.assistance ?
		  		<div>
		  			<div className="col-sm-4">
			  			<h3 className="text-center">Elegiste: <strong>{this.props.assistance}</strong></h3>
			  		</div>
			  		<div className="col-sm-4">
			        {this.getOptions()}
					  </div>
					</div>
		  		:
		  		<div className="col-sm-offset-4 col-sm-4">
		        <div className="radio radio-inline radio-success">
			      	<input type="radio" name="assistance" id="radio5" value="Obligatoria" onClick={this.assistanceYes} defaultChecked/>
						  <label htmlFor="radio5"><h3 className="brand-txt">Obligatoria</h3></label>
						</div>
						<div className="radio radio-inline radio-danger">
							<input type="radio" name="assistance" id="radio6" value="No obligatoria" onClick={this.assistanceNo}/>
						  <label htmlFor="radio6"><h3 className="brand-txt">No obligatoria</h3></label>
						</div>
				  </div>
		  	}
		  	
			</div>
		)
	}
});