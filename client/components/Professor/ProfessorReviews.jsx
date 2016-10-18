ProfessorReviews = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let upVoters = this.props.review.upVoters,
				downVoters = this.props.review.downVoters,
				tags = this.props.review.tags;
		return {
			userId: Meteor.userId(),
			upVoters: upVoters,
			downVoters: downVoters,
			joinedTags: tags.join(', ')
		}
	},

	upvote(){
		let userId = this.data.userId,
				reviewId = this.props.review._id;
		Meteor.call('upvoteProfReview', userId, reviewId);
	},

	downvote(){
		let userId = this.data.userId,
				reviewId = this.props.review._id;
		Meteor.call('downvoteProfReview', userId, reviewId);
	},

	hideUpvoted(){
		let btnClass = 'btn btn-mini btn-success'
				userId = this.data.userId,
				upVoter = this.data.upVoters,
				array = jQuery.inArray(userId,upVoter);
		if(array>=0){
			jQuery('btn-success').hide();
			btnClass += ' invisible'
		}
		return btnClass;

	},

	hideDownvoted(){
		let btnClass = 'btn btn-mini btn-danger'
				userId = this.data.userId,
				downVoter = this.data.downVoters,
				array = jQuery.inArray(userId,downVoter);
		if(array>=0){
			jQuery('.btn.danger').hide();
			btnClass += ' invisible';
		}
		return btnClass;

	},

	disableOwnVote(){
		let btnClass = 'votes pull-left'
				userId = this.data.userId,
				userReview = this.props.review.userId;
		if(userReview===userId){
		  btnClass += ' hidden';
		}
			return btnClass;
	},

	ownReview(){
		let userId = this.data.userId,
				userReview = this.props.review.userId;
		if(userReview===userId){
		  return true;
		}
	},

	clearVotes(){
		let reviewId = this.props.review._id,
				professorId = this.props.review.professorId;
		new Confirmation({
			title: 'Tu review perderá todos los puntos al ser editado',
			message: 'Estás seguro ?',
			cancelText: 'Cancelar',
			okText: 'Ok',
			success: true
		}, function (ok) {
			if(ok==true){
				Meteor.call('clearVotes',reviewId);
				FlowRouter.go('/editar-review/'+reviewId+'/profesor/'+professorId);
			}
			else{
				return;
			}
		});
	},

	getOverall(){
		let help = this.props.review.help,
				clarity = this.props.review.clarity,
				easy = this.props.review.easy,
				average =( (help + clarity + easy)/3).toFixed(1);
		if(average<2.8){
			return <img src="/images/cara-negativa.png" />
		}
		if(average<4.5){
			return <img src="/images/cara-media.png" />
		}
		if(average>=4.5){
			return <img src="/images/cara-positiva.png" />
		}
	},

	getInterest(){
		let interest = this.props.review.interest;
		if(interest==0){return '---------'}
		if(interest==1){return 'Te quedaras sin batería en el celular' }
		if(interest==2){return 'Muy bajo '}
		if(interest==3){return 'Algo de interés'}
		if(interest==4){return 'Bastante interesante'}
		if(interest==5){return 'Una de mis clases preferidas'}
	},

	getTextUse(){
		let txt = this.props.review.textUse;
		if(txt==0){return '---------'}
		if(txt==1){return '¿Qué material?' }
		if(txt==2){return 'A veces entregó algo básico'}
		if(txt==3){return 'Sirve como apoyo'}
		if(txt==4){return 'Muy completo'}
		if(txt==5){return 'Es excelente como ayuda'}
	},

	getMayor(){
		if(!this.props.review.mayor){
			return '---------';
		}
		else{
			return this.props.review.mayor;
		}
	},

	getDate(){
		let year = this.props.review.year,
				semester = this.props.review.semester;
		if(!year&&!semester){
			return '---------';
		}
		if(year&&!semester) {
			return this.props.review.year;
		}
		if(!year&&semester) {
			return this.props.review.semester;
		}
		if(year&&semester) {
			return this.props.review.semester + " de " + this.props.review.year;
		}
	},

	formatDate(){
		let raw = this.props.review.createdAt;
		return moment(raw).format('DD/MM/YY - h:mm a');
	},

	isAdmin(){
		let userId = Meteor.userId();
		if(userId=='koFHXQEohM6s4KfoF'||userId=='crBoZvJDc2RQG7irj'||userId=='i3vg2rYuXFrv8s39e'||userId=='T8CACR2zzKkkqZz9L'){
			return true;
		}
	},

	deleteProfReview(){
		let reviewId = this.props.review._id,
				professorId = this.props.review.professorId;
		Meteor.call('updateProfReviewDelete', reviewId,professorId);
		Meteor.call('deleteProfReview', reviewId);
		Meteor.call('substractVoteProf',professorId);
	},

	render(){
		let userUrl = 'https://www.facebook.com/app_scoped_user_id/'+this.props.review.userUrl;
		return(
			<div>
				<div className="row" id="profReview">
					<div className="col-sm-12">
						<div id={this.props.review._id} className="panel panel-default">
							<div className="panel-heading">
								<div className="panel-title clearfix">

									{this.isAdmin() ?
										<p className="pull-left">por: <a href={userUrl} target="_blank"><strong>{this.props.review.userName}</strong></a></p>
										:
										<span></span>
									}
									<p className="pull-right"><small>{this.formatDate()}</small>{this.isAdmin() ?<button onClick={this.deleteProfReview} className="btn btn-danger btn-sm btn-remove"><i className="fa fa-ban" aria-hidden="true"></i></button>:<span></span>}</p>
								</div>
							</div>
					    <div className="panel-body">
								<div className="col-sm-3 scores-panel">
									{this.getOverall()}
									<h4 className="brand-txt"><strong>Ayuda:</strong> {this.props.review.help}</h4>
									<h4 className="brand-txt"><strong>Claridad:</strong> {this.props.review.clarity}</h4>
									<h4 className="brand-txt"><strong>Facilidad:</strong> {this.props.review.easy}</h4>
								</div>
								<div className="col-sm-5">
									<p><strong>Clase dictada:</strong> {this.props.review.courseCode}</p>
									<p><strong>Carrera:</strong> {this.getMayor()}</p>
									<p><strong>Fecha que tomó la clase:</strong> {this.getDate()}</p>
									<p><strong>Tuve la opción de elegirlo:</strong> {this.props.review.eligible}</p>
									<p><strong>Recomendaría al profesor:</strong> {this.props.review.recommend}</p>
									<p><strong>Mi interés en la clase:</strong> {this.getInterest()}</p>
									<p><strong>Material utilizado:</strong> {this.getTextUse()}</p>
								</div>
								<div className="col-sm-4">
									<p className="review-comment">{this.props.review.comment}</p>
									
									<h4 className="prof-tags">{this.data.joinedTags}</h4>
								</div>
							</div>
							<div className="panel-footer clearfix">
								{this.data.userId ?
									<div className={this.disableOwnVote()}>
										<button className={this.hideUpvoted()} onClick={this.upvote}><i className="fa fa-thumbs-o-up"></i> Me gusta</button>
										<button className={this.hideDownvoted()} onClick={this.downvote}><i className="fa fa-thumbs-o-down"></i> No me gusta</button>
										<small><a href="#">reportar</a></small>
									</div>
								:
									<span></span>
								}
								

								{this.ownReview() ?
										<button type="button" className="btn btn-warning btn-sm" onClick={this.clearVotes}>Editar review</button>
										:
										<span className="hidden"></span>
									}
								<div className="pull-right points">
									<h3>Puntos: {this.props.review.votes}</h3>
								</div>
							</div>
						</div>
						<hr />
					</div>
				</div>
			</div>
			)
	}
});