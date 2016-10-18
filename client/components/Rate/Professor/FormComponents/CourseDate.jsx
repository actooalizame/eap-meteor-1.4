CourseDate = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="semester"><h3>Semestre y año que tomaste la clase</h3></label>
		  	</div>
		  	<div className="col-sm-4">
		  		{this.props.semester ?
		  			<select className="form-control" id="semester" name="semester">
		      		<option className="disabled">{this.props.semester}</option>
		         	<option>Primer semestre</option>
		         	<option>Segundo semestre</option>
	         	</select>
	         	:
	         	<select className="form-control" id="semester" name="semester">
		      		<option className="disabled" value="">Semestre</option>
		         	<option>Primer semestre</option>
		         	<option>Segundo semestre</option>
	         	</select>
		  		}
		  	</div>
		  	<div className="col-sm-4">
		  		{this.props.year ?
		  			<select className="form-control" id="year" name="year">
	      		<option className="disabled">{this.props.year}</option>
	      		<option>2016</option>
	         	<option>2015</option>
	         	<option>2014</option>
	         	<option>2013</option>
	         	<option>2012</option>
	         	<option>2011</option>
	         	<option>2010</option>
	         	<option>2009</option>
	         	<option>2008</option>
	         	<option>2007</option>
	         	<option>2006</option>
	         	<option>2005</option>
         	</select>
         	:
         	<select className="form-control" id="year" name="year">
	      		<option className="disabled" value="">Año</option>
	         	<option>2015</option>
	         	<option>2014</option>
	         	<option>2013</option>
	         	<option>2012</option>
	         	<option>2011</option>
	         	<option>2010</option>
	         	<option>2009</option>
	         	<option>2008</option>
	         	<option>2007</option>
	         	<option>2006</option>
	         	<option>2005</option>
         	</select>
		  		}
		  		
		  	</div>
			</div>
			)
	}
});