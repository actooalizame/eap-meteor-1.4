CommentProfessor = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-5">
		  		<label htmlFor="comment"><h3>Esta es tu oportunidad de ser más específico <i className="fa fa-info-circle" data-toggle="tooltip" data-placement="right" title="¿No estás seguro de que escribir? Te dejamos algunas ideas: Tu experiencia personal / La intensidad de los trabajos y pruebas realizadas /  ¿Se encontraba disponible fuera de la clase? / Hacia participar a los alumnos / / Apoyo visual / Estilo de enseñanza ej. Para enseñar economía el profesor es más teórico que numérico, etc..)"></i></h3></label>
		  	</div>
		  	<div className="col-sm-offset-2 col-sm-5">
	        <textarea rows="4" name="comment" id="comment" className="form-control" defaultValue={this.props.comment||'(Sin comentarios)'}></textarea>   
			  </div>
			</div>
			)
	}
});