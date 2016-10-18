Terms = React.createClass({
	componentDidMount(){
		var title = 'Evalúa al Profe - Términos y condiciones',
			metaInfo = {name: 'description', content: 'Revisa los Términos y condiciones antes de utilizar el sitio.'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
	},
	render(){
		return(
			<div className="row app-top-margin">
				<div className="col-sm-10 col-sm-offset-1 panel panel-default">
					<div className="panel-body">
						<p><strong>Las siguientes Términos y condiciones, aplican sobre el sitio Evalúa al Profe, sus colaboradores y cualquier tipo de asociado. En adelante nos referiremos a todos con el nombre de el "Sitio".</strong></p>
						<br/>
						<h4><strong>Las modificaciones a este Acuerdo</strong></h4>
						<p>Podemos modificar las presentes condiciones de uso cuando lo estimemos pertinente. Vamos a publicar o mostrar los avisos de cambios materiales en el Sitio y notificarle por los cambios en los términos y condiciones; la forma de dicha notificación es a nuestro criterio por el bien común de la comunidad y el Sitio. Una vez que los fijemos en el Sitio, estos cambios entrarán en vigor inmediatamente.</p>
						<br/>
						<h4><strong>Reglas de conducta</strong></h4>
						<p>Usted se compromete a no utilizar el Sitio de manera prohibida, usted es el responsable de sus propios comentarios y evaluaciones, los que se podrán eliminar por parte nuestra, en caso que sospechemos de que su fin valla con intención ​​difamatoria, indecente, vulgar u obsceno, pornográfico, sexualmente explícito o sugerencias sexuales, racial, cultural o étnicamente ofensivo, dañino, de acoso, intimidación, amenaza, de odio, desagradable, discriminatoria, abusiva o intente influir de manera negativa en profesores, terceros, nosotros, el Sitio, nuestra buena voluntad, el nombre, la reputación o la causa de coacción.</p>
						<br/>
						<h4><strong>Todos los avisos</strong></h4>
						<p>Usted es responsable por el contenido que usted publique (o que está publicado bajo su nombre o nombre de usuario anónimo) a través del Sitio y hacer ciertas representaciones y garantías con respecto a cualquier contenido que publica. Nos reservamos el derecho de revisar, controlar y editar cualquier contenido que publique y si se determina que un mensaje contenga o pueda violar las presentes Condiciones de Uso, también podemos tomar otras medidas tales como negarse a permitir que usted evalué, revocar su derecho a usar el sitio y el uso de otros medios para hacer cumplir los términos de las presentes Condiciones de uso.</p>
						<br/>
						<h4><strong>Desactivación / cancelación de su registro o uso</strong></h4>
						<p>Usted puede desactivar su cuenta en cualquier momento. Podemos terminar su uso y / o registro en el Sitio en cualquier momento, por cualquier motivo y sin motivo.</p>
						<br/>
						<h4><strong>Exención de responsabilidad y limitación de responsabilidad</strong></h4>
						<p>Usted entiende que el sitio se pone a disposición "tal cual" y "según esté disponible" sin ningún tipo de garantía, declaraciones y garantías. Usted entiende que el Sitio y los colaboradores asociados al Sitio no son responsables por cualquier pérdida o daño en relación a la información almacenada en el Sitio o este acuerdo. El sitio se mantiene en servidores en los EE.UU y se intentara respaldar su información periódicamente.</p>
						<br/>
						<h4><strong>Responsabilidad de comentarios e información compartida</strong></h4>
						<p>Las evaluaciones y comentarios vertidos en éste Sitio son de exclusiva responsabilidad de quienes las emiten y no representan necesariamente el pensamiento ni la opinión del Sitio o los colaboradores de este, Este Sitio funciona únicamente como una herramienta que se entrega a disposición de los estudiantes y profesores, con el fin de compartir información respecto a sus propias experiencias y puntos de vista personales sobre las aptitudes profesionales de los docentes que han dictado sus cursos universitarios.</p>
					</div>
				</div>
			</div>

			)
	}
});