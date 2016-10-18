SchoolReviews = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let upVoters = this.props.review.upVoters,
				downVoters = this.props.review.downVoters;
				//tags = this.props.review.tags;
		return {
			userId: Meteor.userId(),
			upVoters: upVoters,
			downVoters: downVoters,
			//joinedTags: tags.join(', ')
		}
	},

	upvote(){
		let userId = this.data.userId,
				reviewId = this.props.review._id;
		Meteor.call('upvoteSchoolReview', userId, reviewId);
	},

	downvote(){
		let userId = this.data.userId,
				reviewId = this.props.review._id;
		Meteor.call('downvoteSchoolReview', userId, reviewId);
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
		  btnClass += ' invisible';
		}
			return btnClass;
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

	deleteSchoolReview(){
		let reviewId = this.props.review._id,
				schoolId = this.props.review.schoolId;
		Meteor.call('updateSchoolReviewDelete', reviewId,schoolId);
		Meteor.call('deleteSchoolReview', reviewId);
		Meteor.call('substractVoteSchool',schoolId);
	},

	render(){
		let userUrl = 'https://www.facebook.com/app_scoped_user_id/'+this.props.review.userUrl;
		return(
			<div>
				<div className="row">
					<div className="col-sm-12">
						
						
						<div className="panel panel-default">
							<div className="panel-heading">
								<div className="panel-title clearfix">
									{this.isAdmin() ?
										<p className="pull-left">por: <a href={userUrl} target="_blank"><strong>{this.props.review.userName}</strong></a></p>
										:
										<span></span>
									}
									<p className="pull-right"><small>{this.formatDate()}</small>{this.isAdmin() ?<button onClick={this.deleteSchoolReview} className="btn btn-danger btn-sm btn-remove"><i className="fa fa-ban" aria-hidden="true"></i></button>:<span></span>}</p>
								</div>
							</div>
					    <div className="panel-body">
								<div className="col-sm-3">
									<h4><strong>Reputación:</strong> {this.props.review.reputation}</h4>
									<h4><strong>Ubicación:</strong> {this.props.review.location}</h4>
									<h4><strong>Oportunidades:</strong> {this.props.review.opportunities}</h4>
									
								</div>
								<div className="col-sm-3">
									<p><strong>Librería:</strong> {this.props.review.library}</p>
									<p><strong>Infraestructura:</strong> {this.props.review.infrastructure}</p>
									<p><strong>Internet:</strong> {this.props.review.internet}</p>
									<p><strong>Comida:</strong> {this.props.review.food}</p>
									
								</div>
								<div className="col-sm-3">
									<p><strong>Actividades:</strong> {this.props.review.social}</p>
									<p><strong>Deportes:</strong> {this.props.review.sports}</p>
									<p><strong>Felicidad:</strong> {this.props.review.happiness}</p>
								</div>

								<div className="col-sm-3">
									<h4>{this.props.review.graduation}</h4>
									<p>{this.props.review.comment}</p>
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
								
								<div className="pull-right">
									<h4>Puntos: {this.props.review.votes}</h4>
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