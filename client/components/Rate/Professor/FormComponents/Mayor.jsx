Mayor = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="mayor"><h3>Cual es tu carrera</h3></label>
		  	</div>
		  	<div className="col-sm-3 col-sm-offset-4">
		    	<input type="text" className="form-control" name="mayor" id="mayor" placeholder="Ej. Derecho" defaultValue={this.props.mayor} />
		  	</div>
			</div>
			)
	}
});