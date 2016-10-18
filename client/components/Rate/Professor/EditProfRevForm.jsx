EditProfRevForm = React.createClass({
	componentWillMount(){
		this.forceUpdate();
	},

	componentDidMount(){
		this.forceUpdate();
		$('[data-toggle="tooltip"]').tooltip();
	},

	mixins: [ReactMeteorData],

	getMeteorData(){
		let professorId = FlowRouter.getParam('professorId'),
				reviewId = FlowRouter.getParam('reviewId');
		Meteor.subscribe('professorReviews',professorId);
		return {
			overall: Professors.findOne({_id:professorId}).overall,
			professorId: professorId,
			reviewId: reviewId
		}
	},

	getOverall(){
		var reviewCount = Profreviews.find({professorId:this.data.professorId}).count();
		if(reviewCount==1){
			let help = (Session.get('helpValue')),
					clarity = Session.get('clarityValue'),
					easy = Session.get('easyValue');
			let overall = [];
			overall.push(help,clarity,easy);
			let overallSum = eval(overall.join('+')),
					average = overallSum/3;
			return Number(average.toFixed(1));
		}
		if(reviewCount>1) {
			var otherReviews = Profreviews.find( { userId: { $ne: Meteor.userId() } } ),
					othersReviewCount = otherReviews.count(),
					othersHelp = otherReviews.map(function(a) {return a.help;}),
					myHelp = Session.get('helpValue'),
					helpSum = eval(othersHelp.join('+')),
					othersClarity = otherReviews.map(function(a) {return a.clarity;}),
					myClarity = Session.get('clarityValue'),
					claritySum = eval(othersClarity.join('+')),
					othersEasy = otherReviews.map(function(a) {return a.easy;}),
					myEasy = Session.get('easyValue'),
					easySum = eval(othersEasy.join('+'));
			let overall = [];
			overall.push(helpSum,claritySum,easySum);
			let totalOthersOverall = eval(overall.join('+'));
			let editOverall = [];
			editOverall.push(myHelp,myClarity,myEasy);
			let totalEditedOverall = eval(editOverall.join('+'));
			let total = ((totalOthersOverall+totalEditedOverall)/3)/(othersReviewCount+1).toFixed(1);
			return Number(total.toFixed(1));
		}
  },

  getScores(){
  	var reviewCount = Profreviews.find({professorId:this.data.professorId}).count();
		if(reviewCount==1){
			let scores = {
				help: Number(Session.get('helpValue')),
				clarity: Number(Session.get('clarityValue')),
				easy: Number(Session.get('easyValue'))
			}
			return scores;
		}
		if(reviewCount>1) {
			var otherReviews = Profreviews.find( { userId: { $ne: Meteor.userId() } } ),
					othersReviewCount = otherReviews.count(),
					othersHelp = otherReviews.map(function(a) {return a.help;}),
					myHelp = Session.get('helpValue'),
					helpSum = eval(othersHelp.join('+')),
					helpTotal = Number(((+myHelp + +helpSum)/(othersReviewCount+1)).toFixed(1));
					othersClarity = otherReviews.map(function(a) {return a.clarity;}),
					myClarity = Session.get('clarityValue'),
					claritySum = eval(othersClarity.join('+')),
					clarityTotal = Number(((+myClarity + +claritySum)/(othersReviewCount+1)).toFixed(1));
					othersEasy = otherReviews.map(function(a) {return a.easy;}),
					myEasy = Session.get('easyValue'),
					easySum = eval(othersEasy.join('+')),
					easyTotal = Number(((+myEasy + +easySum)/(othersReviewCount+1)).toFixed(1));
		}
		return scores = {
			help:helpTotal,
			clarity: clarityTotal,
			easy: easyTotal
		}
  },

  getTags(){
  	var review  = Profreviews.findOne({_id: this.data.reviewId}),
  			tagsCount = review.tags.length;
  	if(tagsCount==0){
  		var selectedTags = jQuery('input[type=checkbox]:checked'),
  				tags = _.map(selectedTags, function(item) {return item.defaultValue;});
  	}
  	if(tagsCount>0){
  		var tags = review.tags;
  	}
  	return tags;
  },


	editProfReview(e){
		e.preventDefault();
		let data = {
			reviewId: this.data.reviewId,
			professorId: this.data.professorId,
			courseCode: e.target.courseCode.value,
			semester: e.target.semester.value,
			year: e.target.year.value,
			help: Session.get('helpValue'),
			clarity: Session.get('clarityValue'),
			easy: Session.get('easyValue'),
			eligible: Session.get('eligible'),
			recommend: Session.get('recommend'),
			//sexy: Session.get('sexy'),
			tags: this.getTags(),
			comment: e.target.comment.value,
			assistance: Session.get('assistance'),
			interest: Session.get('interestValue'),
			textUse: Session.get('textValue'),
			grade: e.target.grade.value,
			mayor: e.target.mayor.value
		}
		let overall = this.getOverall(),
				scores = this.getScores();

		Meteor.call('updateProfReview', data, overall, scores, function(error){
			if(error){
				toastr['error'](error.reason, 'Atencion!');
			} 
			else {
				Meteor.call('updateScoresOnProf',data.professorId,scores.help,scores.clarity,scores.easy);
				Meteor.call('updateProfessorOverall',data.professorId,overall);
				FlowRouter.go('/profesor/'+data.professorId);
				toastr['warning']('Tu review ha sido editado!', 'Epa!');
			}
		});
	},
	
	render(){
		let back = '/profesor/'+this.props.review.professorId;
		return(
			<form onSubmit={this.editProfReview}>
				<div className="form-group row">
					<CourseCode code={this.props.review.courseCode} />
				</div>
				<hr/>
				<div className="form-group row">
					<Help help={this.props.review.help}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Clarity clarity={this.props.review.clarity}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Easy easy={this.props.review.easy}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Recommend recommend={this.props.review.recommend}/>
				</div>
				<hr/>
				<div className="form-group row">
					<CommentProfessor comment={this.props.review.comment}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Eligible eligible={this.props.review.eligible}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Assistance assistance={this.props.review.assistance}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Interest interest={this.props.review.interest}/>
				</div>
				<hr/>
				<div className="form-group row">
					<TextUse textUse={this.props.review.textUse}/>
				</div>
				<hr/>
				<div className="form-group row">
					<CourseDate semester={this.props.review.semester} year={this.props.review.year}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Grade grade={this.props.review.grade}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Mayor mayor={this.props.review.mayor}/>
				</div>
				<hr/>
				<div className="form-group row">
					<EditTags />
				</div>
				<hr/>
				<div className="text-center">
					<a href={back} className="btn btn-danger btn-lg">Cancelar</a>
					<button type="submit" className="btn btn-success btn-lg">Enviar Evaluación</button>
				</div>
			</form>
			)
	}
});