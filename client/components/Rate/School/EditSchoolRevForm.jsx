EditSchoolRevForm = React.createClass({
	componentWillMount(){
		this.forceUpdate();
	},

	componentDidMount(){
		this.forceUpdate();
	},

	mixins: [ReactMeteorData],

	getMeteorData(){
		let schoolId = FlowRouter.getParam('schoolId'),
				reviewId = FlowRouter.getParam('reviewId');
		Meteor.subscribe('schoolReviews',schoolId);
		return {
			//overall: Schools.findOne({_id:schoolId}).overall,
			schoolId: schoolId,
			reviewId: reviewId
		}
	},

	getScores(){
  	var reviewCount = Schoolreviews.find({schoolId:this.data.schoolId}).count();
		if(reviewCount==1){
			let newScores = {
				reputation: Number(Session.get('reputationValue')),
				location: Number(Session.get('locationValue')),
				opportunities: Number(Session.get('oportunidadValue')),
				library: Number(Session.get('libraryValue')),
				infrastructure: Number(Session.get('infrastructureValue')),
				internet: Number(Session.get('internetValue')),
				food: Number(Session.get('foodValue')),
				activities: Number(Session.get('activitiesValue')),
				sports: Number(Session.get('sportsValue')),
				happiness: Number(Session.get('happinesValue'))
			}
			let overall = [];
			overall.push(newScores.reputation,newScores.location,newScores.opportunities,newScores.library,newScores.infrastructure,newScores.internet,newScores.food,newScores.activities,newScores.sports,newScores.happiness);
			let overallSum = eval(overall.join('+')),
					average = overallSum/10;

			return lastScores = {
				scores: newScores,
				overall: Number(average.toFixed(1))
			};
		}
		if(reviewCount>1) {
			var otherReviews = Schoolreviews.find( { userId: { $ne: Meteor.userId() } } ),
					othersReviewCount = otherReviews.count(),

					othersReputation = otherReviews.map(function(a) {return a.reputation;}),
					myReputation = Session.get('reputationValue'),
					reputationSum = eval(othersReputation.join('+')),
					reputationTotal = Number(((+myReputation + +reputationSum)/(othersReviewCount+1)).toFixed(1));

					othersLocation = otherReviews.map(function(a) {return a.location;}),
					myLocation = Session.get('locationValue'),
					locationSum = eval(othersLocation.join('+')),
					locationTotal = Number(((+myLocation + +locationSum)/(othersReviewCount+1)).toFixed(1));

					othersOpportunities = otherReviews.map(function(a) {return a.opportunities;}),
					myOpportunities = Session.get('oportunidadValue'),
					opportunitiesSum = eval(othersOpportunities.join('+')),
					opportunitiesTotal = Number(((+myOpportunities + +opportunitiesSum)/(othersReviewCount+1)).toFixed(1));

					othersLibrary = otherReviews.map(function(a) {return a.library;}),
					myLibrary = Session.get('libraryValue'),
					librarySum = eval(othersLibrary.join('+')),
					libraryTotal = Number(((+myLibrary + +librarySum)/(othersReviewCount+1)).toFixed(1));

					othersInfrastructure = otherReviews.map(function(a) {return a.infrastructure;}),
					myInfrastructure = Session.get('infrastructureValue'),
					infrastructureSum = eval(othersInfrastructure.join('+')),
					infrastructureTotal = Number(((+myInfrastructure + +infrastructureSum)/(othersReviewCount+1)).toFixed(1));

					othersInternet = otherReviews.map(function(a) {return a.internet;}),
					myInternet = Session.get('internetValue'),
					internetSum = eval(othersInternet.join('+')),
					internetTotal = Number(((+myInternet + +internetSum)/(othersReviewCount+1)).toFixed(1));

					othersFood = otherReviews.map(function(a) {return a.food;}),
					myFood = Session.get('foodValue'),
					foodSum = eval(othersFood.join('+')),
					foodTotal = Number(((+myFood + +foodSum)/(othersReviewCount+1)).toFixed(1));

					othersActivities = otherReviews.map(function(a) {return a.social;}),
					myActivities = Session.get('activitiesValue'),
					activitiesSum = eval(othersActivities.join('+')),
					activitiesTotal = Number(((+myActivities + +activitiesSum)/(othersReviewCount+1)).toFixed(1));

					othersSports = otherReviews.map(function(a) {return a.sports;}),
					mySports = Session.get('sportsValue'),
					sportsSum = eval(othersSports.join('+')),
					sportsTotal = Number(((+mySports + +sportsSum)/(othersReviewCount+1)).toFixed(1));

					othersHappiness = otherReviews.map(function(a) {return a.happiness;}),
					myHappiness = Session.get('happinesValue'),
					happinessSum = eval(othersHappiness.join('+')),
					happinessTotal = Number(((+myHappiness + +happinessSum)/(othersReviewCount+1)).toFixed(1));

			let overall = [];
			overall.push(reputationSum,locationSum,opportunitiesSum,librarySum,infrastructureSum,internetSum,foodSum,activitiesSum,sportsSum,happinessSum);
			let totalOthersOverall = eval(overall.join('+'));
			let editOverall = [];
			editOverall.push(myReputation,myLocation,myOpportunities,myLibrary,myInfrastructure,myInternet,myFood,myActivities,mySports,myHappiness);
			let totalEditedOverall = eval(editOverall.join('+'));
			var total = ((totalOthersOverall+totalEditedOverall)/10)/(othersReviewCount+1).toFixed(1);

		}
		let newScores = {
			reputation: reputationTotal,
			location: locationTotal,
			opportunities: opportunitiesTotal,
			library: libraryTotal,
			infrastructure: infrastructureTotal,
			internet: internetTotal,
			food: foodTotal,
			activities: activitiesTotal,
			sports: sportsTotal,
			happiness: happinessTotal
		}
		return lastScores = {
				scores: newScores,
				overall: Number(total.toFixed(1))
			};
  },

	editSchoolReview(e){
		e.preventDefault();
			
		let data = {
			reviewId: this.data.reviewId,
			schoolId: this.data.schoolId,
			reputation: Session.get('reputationValue'),
			location: Session.get('locationValue'),
			oportunidades: Session.get('oportunidadValue'),
			library: Session.get('libraryValue'),
			infrastructure: Session.get('infrastructureValue'),
			internet: Session.get('internetValue'),
			food: Session.get('foodValue'),
			activities: Session.get('activitiesValue'),
			sports: Session.get('sportsValue'),
			happiness: Session.get('happinesValue'),
			graduation: e.target.graduation.value,
			comment: e.target.comment.value
		}

		let newScores = this.getScores();

		
		Meteor.call('updateSchoolReview', data, newScores, function(error){
			if(error){
				toastr['error'](error.reason, 'Atencion!');
			} 
			else {
				Meteor.call('updateEditedScoresOnSchool',data.schoolId,newScores);
				Meteor.call('updateSchoolOverall',data.schoolId,newScores.overall);
				FlowRouter.go('/universidad/'+data.schoolId);
				toastr['warning']('Tu review ha sido editado!', 'Epa!');
			}
		});
		
	},

	getForm(){
		return(
			<form onSubmit={this.editSchoolReview}>
				<div className="form-group row">
					<Reputation reputation={this.props.review.reputation}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Location location={this.props.review.location}/>
				</div>
				<hr/>
				<div className="form-group row">
					<Oportunidades oportunidad={this.props.review.opportunities} />
				</div>
				<hr/>
				<div className="form-group row">
					<Library library={this.props.review.library} />
				</div>
				<hr/>
				<div className="form-group row">
					<Infrastructure infrastructure={this.props.review.infrastructure} />
				</div>
				<hr/>
				<div className="form-group row">
					<Internet internet={this.props.review.internet} />
				</div>
				<hr/>
				<div className="form-group row">
					<Food food={this.props.review.food} />
				</div>
				<hr/>
				<div className="form-group row">
					<Activities activities={this.props.review.social} />
				</div>
				<hr/>
				<div className="form-group row">
					<Sports sports={this.props.review.sports} />
				</div>
				<hr/>
				<div className="form-group row">
					<Happines happines={this.props.review.happiness} />
				</div>
				<hr/>
				<div className="form-group row">
					<Graduation graduation={this.props.review.graduation} />
				</div>
				<hr/>
				<div className="form-group row">
					<CommentSchool comment={this.props.review.comment} />
				</div>
				<hr/>
				<button type="submit" className="btn btn-success btn-md">Enviar Evaluación</button>
			</form>
			)
	},

	render(){
		let schoolId = this.props.review.schoolId,
				link = '/universidad/'+schoolId
		return(
			<div>
				{this.getForm()}
			</div>
			
			)
	}
});