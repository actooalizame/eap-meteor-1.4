FrontStatic = React.createClass({

	componentDidMount(){
		smoothScroll.init();
	},

	mixins: [ReactMeteorData],
	getMeteorData(){
		var title = 'Evalúa al Profe – Evaluación docente – Toma de ramos',
			metaInfo = {name: 'description', content: 'Evalúa profesores chilenos de forma anónima, publica y externa a tu universidad. Glorifica o castiga a quien lo merezca.'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			userId: Meteor.userId()
		}
	},

	render(){

		return(
			<div>
		
				<FrontNav />

				<header id="evaluar" className="intro-block cover-bg">
					<div className="container">
						<FoldSearch />
					</div>
				</header>

				<section id="que-es" className="dark-bg bg-color-blue">
					<div className="container">
					<h1 className="brand-txt section-title">¿ Qué es Evalúa al Profe ?</h1>
						<div className="row">
							<div className="col-sm-5">
								<div className="embed-responsive embed-responsive-16by9">
									<iframe width="auto" height="auto" src="https://www.youtube.com/embed/Yu9iTVdvuPA?rel=0" frameborder="0" allowfullscreen></iframe>
								</div>
							</div>
							<div className="col-sm-7">
								<p>Es una herramienta puesta a disposición de los estudiantes, para evaluar a sus profesores de manera anónima, publica y externa a sus universidades.</p>
								<br/>
								<p>Ésta red de evaluaciones irá generando un ranking de profesores y universidades, sobre la base de la experiencia de cada alumno.</p>
								<br/>
								<p>En los periodos de ‘’toma de ramos’’, ésta información podrá ser utilizada como referencia a la hora de tener que elegir entre los profesores disponibles para cursar su próxima clase.</p>
							</div>
						</div>
						<div className="row home-panels">
							<div className="col-sm-4">
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapseOne"><span className="editContent">Beneficios Estudiantes</span></a>
									<div id="collapseOne" className="panel-collapse collapse">
										<div className="panel-body">
											<ul>
												<li>Anticipar el estilo de enseñanza de cada profesor.</li>
												<li>Disminución del riesgo de reprobación.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapseTwo"><span className="editContent">Beneficios Profesores</span></a>
									<div id="collapseTwo" className="panel-collapse collapse">
										<div className="panel-body">
											<ul>
												<li>Mayores incentivos, mediante el ranking de los mejores profesores (Pronto).</li>
												<li>Información sobre como sus alumnos perciben sus métodos de enseñanza.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapseFour"><span className="editContent">Beneficios Educación</span></a>
									<div id="collapseFour" className="panel-collapse collapse">
										<div className="panel-body">
											<ul>
												<li>Medición dinámica de la calidad educacional sobre las experiencias reales de los estudiantes.</li>
												<li>Herramienta social que busca aportar a los problemas de la educación chilena.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="testimonios" className="quote-block text-center dark-bg bg-color1 cover-bg" style={{backgroundImage: 'url(/images/concrete.jpg)'}}>
				
					<div id="carousel-testimonials" className="carousel slide" data-interval="3450" data-ride="carousel" data-pause="false">
						<div className="carousel-inner" role="listbox">
						  
							<div className="item active">
								<div className="container quote">
									<h4>¿Preferías tomar un profesor teórico o matemático para cursar economía?</h4>
								</div>
							</div>
							
							<div className="item">
								<div className="container quote">
									<h4>¿Cansado de que te toque el profesor difícil?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Te has cuestionado sobre el método de enseñanza de tu profesor?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Prefieres a un profe fácil, o a uno exigente pero completo?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Alguna vez te has preguntado si la evaluación docente de tu universidad tiene algún efecto?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Te ha tocado elegir a un profe a ojos cerrados en tu "toma de ramos"?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Cansado de que la evaluación docente de tu universidad no se comparta públicamente?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Alguna vez sentiste envidia por no haber tomado el profesor que dicta la otra sección?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Sientes que el profesor no es el indicado para dictar la clase?</h4>
								</div>
							</div>

							<div className="item">
								<div className="container quote">
									<h4>¿Recuerdas a ese profesor que te inspiraba?</h4>
								</div>
							</div>
						</div>
						
					</div>
				</section>

				<section id="faq" className="bg-color-red">
					<div className="container">
						<h1 className="brand-txt title">Preguntas Frecuentes</h1>
						<div className="row">
							<div className="col-sm-6">
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapse3"><span className="editContent">¿Por qué los alumnos deberían evaluar a sus profesores?</span></a>
									<div id="collapse3" className="panel-collapse collapse">
										<div className="panel-body">
											Para lograr de que ésta nueva herramienta, logre generar cambios reales en la educación.
										</div>
									</div>
								</div>
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapse5"><span className="editContent">¿Están ustedes en contra de los profesores?</span></a>
									<div id="collapse5" className="panel-collapse collapse">
										<div className="panel-body">Al contrario, nosotros queremos ayudarlos e incentivarlos en su difícil misión, será un proceso largo, pero beneficio para aquellos profesores con vocación de enseñanza.</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapse6"><span className="editContent">¿Por qué es anónimo?</span></a>
									<div id="collapse6" className="panel-collapse collapse">
										<div className="panel-body">
											Para eliminar miedos y presiones que pudiesen afectar el resultado de las evaluaciones.
										</div>
									</div>
								</div>
								<div className="panel">
									<a className="panel-heading collapsed" data-toggle="collapse" href="#collapse7"><span className="editContent">¿Por qué tengo que iniciar sesión?</span></a>
									<div id="collapse7" className="panel-collapse collapse">
										<div className="panel-body">Para controlar el acceso de personas que pretendan de alguna manera interferir con el funcionamiento de éste proyecto educacional.</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<div className="panel">
									<a className="panel-heading collapsed special-heading" data-toggle="collapse" href="#collapse8"><span className="editContent text-center">Soy un profesor, ¿es posible retirarme de la lista o borrar mis evaluaciones?</span></a>
									<div id="collapse8" className="panel-collapse collapse">
										<div className="panel-body">
											Lo lamento profesor, recomendamos de que se sirva un café y comience a escuchar a sus alumnos.
										</div>
									</div>
								</div>
							</div>
						</div>
						
						
					</div>
				</section>

				<section className="dark-bg bg-color1 cta-inner">
					<div className="container"> 
						<div className="row">
							{this.data.userId ?
								<h4><a className="btn btn-lg btn-rate-2 center-block brand-txt" href="/busca-profesores">¡ Evalúa !</a></h4>
							:
							  <div className="login-front">
									<h3 className="text-center">Inicia sesión con Facebook para entrar al sitio</h3>
									<div className="col-md-offset-5">
										<LoginWrap />
									</div>
								</div>
							}
						</div>
					</div>
				</section>

				<footer id="contacto" className="dark-bg bg-color1">
					<div className="container"> 
						<div className="row">

							<div className="col-md-2">
								<img className="logo-footer" src='/images/home/logo-new.png' alt="" />
							</div>
							
							<div className="col-md-7">
								<h2>¿Sientes que falta algo?</h2>
								<h4>Envíanos tu aporte a <a href="mailto:evaluaalprofe@gmail.com">evaluaalprofe@gmail.com</a></h4>
							</div>
							<div className="col-md-3 footer-links">
								<h4><a href="/sugerir-profesor">¿Falta un Profe?</a></h4>
								<h4><a href="/terminos-y-condiciones">Términos y Condiciones</a></h4>
							</div>
						</div>
					</div>
				</footer>
			</div>
			)
	}
});