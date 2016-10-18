SuggestProfessor = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		var title = 'Evalúa al Profe - Sugerir profesor',
			metaInfo = {name: 'description', content: '¿Falta un profesor? Ayuda a la comunidad sugiriendo a los profesores que no encontraste'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			userId: Meteor.userId()
		}
	},

	suggestProfessor(e){
		e.preventDefault();
		let data = {
			name: e.target.name.value,
			schoolName: e.target.schoolName.value,
			department: e.target.department.value,
			comment: e.target.comment.value,
			mail: e.target.mail.value
		};
		let message = Meteor.user().profile.name + ' ha sugerido un nuevo profesor en evaluaalprofe.cl' + "\n\n" +
									'Nombre: ' + data.name + "\n" +
									'Universidad: ' + data.schoolName + "\n" +
									'Facultad: ' + data.department + "\n" +
									'Comentarios: ' + data.comment + "\n" +
									"Email de contacto: " + data.mail;

		let to = 'evaluaalprofe@gmail.com',
				from = data.email,
				subject = 'Nuevo profesor sugerido en Evalua al Profe',
				text = message;
		
		Meteor.call('sendEmail', to,from,subject,text);
		FlowRouter.go('/evaluar');
		toastr['info']('Hemos recibido tu sugerencia.'+ "\n\n" +'Te contactaremos a la brevedad', 'Gracias!');
	},

	render(){
		return(
			<div className="app-content-3 col-md-10 col-md-offset-1" id="suggestProf">
				<h2 className="text-center">¿Falta un Profe?</h2>
				<h3 className="text-center">Ingresa los datos del profesor que no encontraste y lo intentaremos incluir a la brevedad.</h3>
				<form onSubmit={this.suggestProfessor}>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="name"><h5><strong>Nombre completo</strong></h5></label>
							<input type="text" className="form-control" name="name" id="name" required/>
						</div>
						<div className="col-md-6">
							<label htmlFor="schoolName"><h5><strong>Universidad</strong></h5></label>
							<input type="text" className="form-control" name="schoolName" id="schoolName" required/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="department"><h5><strong>Facultad</strong></h5></label>
							<input type="text" className="form-control" name="department" id="department" required/>
						</div>
						<div className="col-md-6">
							<label htmlFor="mail"><h5><strong>Email de contacto</strong></h5></label>
							<input type="email" className="form-control" name="mail" id="mail" required/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="comment"><h5><strong>Comentario</strong></h5></label>
		  				<textarea name="comment" id="comment" className="form-control" rows="5"></textarea>  
						</div>
						<div className="col-md-6 submit-area">
							{this.data.userId ?
								<div>
									<h5 className="text-center">¡Gracias por cooperar con la comunidad!</h5>
									<button type="submit" className="btn btn-success btn-lg center-block">Sugerir Profesor</button>
									</div>
								:
								<div>
									<h5 className="text-center"><strong>Debes estar logueado para sugerir un profesor</strong></h5>
								</div>
								
							}
							
						</div>
					</div>
				</form>

			</div>
			
			)
	}
});