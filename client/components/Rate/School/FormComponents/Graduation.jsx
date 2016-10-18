Graduation = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="graduation"><h4>Años de estudio</h4></label>
		  	</div>
		  	<div className="col-sm-4 col-sm-offset-4">
		  		{this.props.graduation ?
		  			<select className="form-control" id="graduation" name="graduation">
		      		<option className="disabled" value={this.props.graduation}>{this.props.graduation}</option>
		         	<option>Estudiante Mechon  (1 a 3 años de estudio)</option>
		         	<option>Estudiante Dinosaurio (4 o más años de estudio)</option>
		         	<option>Titulado y egresado</option>
	         	</select>
	         	:
	         	<select className="form-control" id="graduation" name="graduation">
		      		<option className="disabled" value="">Elige</option>
		         	<option>Estudiante Mechon  (1 a 3 años de estudio)</option>
		         	<option>Estudiante Dinosaurio (4 o más años de estudio)</option>
		         	<option>Titulado y egresado</option>
	         	</select>
		  		}
		  	</div>
		  	
			</div>
			)
	}
});