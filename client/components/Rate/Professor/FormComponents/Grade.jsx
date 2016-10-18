Grade = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-5">
		  		<label htmlFor="grade"><h3>Nota o calificación final obtenida <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="La nota obtenida deberá ir en el siguiente formato ejemplificado: 5.3"></i></h3></label>
		  	</div>
		  	<div className="col-sm-3 col-sm-offset-4">
		    	<input type="text" className="form-control" name="grade" id="grade" placeholder="Ej. 5.6" defaultValue={this.props.grade}/>
		  	</div>
			</div>
			)
	}
});