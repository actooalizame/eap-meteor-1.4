CourseCode = React.createClass({

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="courseCode"><h3>Nombre de la clase dictada</h3></label>
		  	</div>
		  	<div className="col-sm-3 col-sm-offset-4">
		    	<input type="text" className="form-control" name="courseCode" id="courseCode" defaultValue={this.props.code} />
		  	</div>
			</div>
			)
	}
});