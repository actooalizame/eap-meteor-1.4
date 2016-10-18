RateSchoolForm = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData(){
		let schoolId = this.props.school._id;
		Meteor.subscribe('schoolReviews',schoolId);
		//Meteor.subscribe('singleProfessorShort', professorId)
		return {
			user: Meteor.user(),
			voted: this.props.school.voted,
			//overall: this.props.professor.overall
		}
	},
	componentDidMount(){
		jQuery('[data-toggle="tooltip"]').tooltip();
	},


	hasRated(){
    let rated = this.props.school.ratedBy.map(function(a) {return a;}),
        userId = Meteor.userId(),
      	array = jQuery.inArray(userId,rated);
    if(array>=0){
      return false;
    }
    if(array<0){
      return true;
    }
  },
  getOverall(){
  	var reviews = Schoolreviews.find({schoolId:this.props.school._id}),
					reviewsCount = reviews.count();
		var overall = [],
				reputation = Session.get('reputationValue'),
				location = Session.get('locationValue'),
				opportunities = Session.get('oportunidadValue'),
				library = Session.get('libraryValue'),
				infrastructure = Session.get('infrastructureValue'),
				internet = Session.get('internetValue'),
				food = Session.get('foodValue'),
				activities = Session.get('activitiesValue'),
				sports = Session.get('sportsValue'),
				happiness = Session.get('happinesValue');

		if(reviewsCount===0){
			overall.push(reputation,location,opportunities,library,infrastructure,internet,food,activities,sports,happiness);
			let sum =  eval(overall.join('+')),
					average = (sum/10).toFixed(1);
			return Number(average);
			}
		if(reviewsCount>0){
			// Current review
			overall.push(reputation,location,opportunities,library,infrastructure,internet,food,activities,sports,happiness);
			// Previous reviews
			let reputationArray = reviews.map(function(a) {return a.reputation;}),
					reputationSum = eval(reputationArray.join('+'));
			let locationArray = reviews.map(function(a) {return a.location;}),
					locationSum = eval(locationArray.join('+'));
			let opportunitiesArray = reviews.map(function(a) {return a.opportunities;}),
					opportunitiesSum = eval(opportunitiesArray.join('+'));
			let libraryArray = reviews.map(function(a) {return a.library;}),
					librarySum = eval(libraryArray.join('+'));
			let infrastructureArray = reviews.map(function(a) {return a.infrastructure;}),
					infrastructureSum = eval(infrastructureArray.join('+'));
			let internetArray = reviews.map(function(a) {return a.internet;}),
					internetSum = eval(internetArray.join('+'));
			let foodArray = reviews.map(function(a) {return a.food;}),
					foodSum = eval(foodArray.join('+'));
			let activitiesArray = reviews.map(function(a) {return a.social;}),
					activitiesSum = eval(activitiesArray.join('+'));
			let sportsArray = reviews.map(function(a) {return a.sports;}),
					sportsSum = eval(sportsArray.join('+'));
			let happinessArray = reviews.map(function(a) {return a.happiness;}),
					happinessSum = eval(happinessArray.join('+'));
			// Get current reviews average
			let sum = eval(overall.join('+')),
					average = (sum).toFixed(1);
			// Get previous reviews average
			let previous = [];
			previous.push(reputationSum,locationSum,opportunitiesSum,librarySum,infrastructureSum,internetSum,foodSum,activitiesSum,sportsSum,happinessSum);
			let previousSum = (eval(previous.join('+'))).toFixed(1);
			// Join both into array
			let total = [];
			total.push(average,previousSum);
			// Process Total
			let sumReviews =  eval(total.join('+')).toFixed(1),
					totalAverage = ((sumReviews/10)/(reviews.count()+1)).toFixed(1);

			return Number(totalAverage);
			
		}
  },

  getScores(){
  	let reputation = Session.get('reputationValue'),
				location = Session.get('locationValue'),
				opportunities = Session.get('oportunidadValue'),
				library = Session.get('libraryValue'),
				infrastructure = Session.get('infrastructureValue'),
				internet = Session.get('internetValue'),
				food = Session.get('foodValue'),
				activities = Session.get('activitiesValue'),
				sports = Session.get('sportsValue'),
				happiness = Session.get('happinesValue');
				
		var reviews = Schoolreviews.find({schoolId:this.props.school._id}),
				reviewsCount = reviews.count()+1;
		let reputationArray = reviews.map(function(a) {return a.reputation;}),
				reputationSum = eval(reputationArray.join('+'));
		let locationArray = reviews.map(function(a) {return a.location;}),
				locationSum = eval(locationArray.join('+'));
		let opportunitiesArray = reviews.map(function(a) {return a.opportunities;}),
				opportunitiesSum = eval(opportunitiesArray.join('+'));
		let libraryArray = reviews.map(function(a) {return a.library;}),
				librarySum = eval(libraryArray.join('+'));
		let infrastructureArray = reviews.map(function(a) {return a.infrastructure;}),
				infrastructureSum = eval(infrastructureArray.join('+'));
		let internetArray = reviews.map(function(a) {return a.internet;}),
				internetSum = eval(internetArray.join('+'));
		let foodArray = reviews.map(function(a) {return a.food;}),
				foodSum = eval(foodArray.join('+'));
		let activitiesArray = reviews.map(function(a) {return a.social;}),
				activitiesSum = eval(activitiesArray.join('+'));
		let sportsArray = reviews.map(function(a) {return a.sports;}),
				sportsSum = eval(sportsArray.join('+'));
		let happinessArray = reviews.map(function(a) {return a.happiness;}),
				happinessSum = eval(happinessArray.join('+'));
		let updatedScores = {
			reputation: Number(((+reputation + +reputationSum)/reviewsCount).toFixed(1)),
			location: Number(((+location + +locationSum)/reviewsCount).toFixed(1)),
			opportunities: Number(((+opportunities + +opportunitiesSum)/reviewsCount).toFixed(1)),
			library: Number(((+library + +librarySum)/reviewsCount).toFixed(1)),
			infrastructure: Number(((+infrastructure + +infrastructureSum)/reviewsCount).toFixed(1)),
			internet: Number(((+internet + +internetSum)/reviewsCount).toFixed(1)),
			food: Number(((+food + +foodSum)/reviewsCount).toFixed(1)),
			activities: Number(((+activities + +activitiesSum)/reviewsCount).toFixed(1)),
			sports: Number(((+sports + +sportsSum)/reviewsCount).toFixed(1)),
			happiness: Number(((+happiness + +happinessSum)/reviewsCount).toFixed(1))
		}
		return updatedScores;
  },
 
	insertSchoolReview(e){
		e.preventDefault();
			
		let data = {
			userId: this.data.user._id,
			userName: this.data.user.profile.name,
			schoolId: this.props.school._id,
			schoolName: this.props.school.name,
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

		let isVoted = this.data.voted,
				updatedscores = this.getScores();
				overall = this.getOverall();
		Meteor.call('insertSchoolReview', data, isVoted, updatedscores, overall, function(error){
			if(error){
				toastr['error'](error.reason, 'Atencion!');
			} 
			else {

				if(isVoted===false){
					let dataScores = {
							reputation: Number(data.reputation),
							location: Number(data.location),
							oportunidades: Number(data.oportunidades),
							library: Number(data.library),
							infrastructure: Number(data.infrastructure),
							internet: Number(data.internet),
							food: Number(data.food),
							activities: Number(data.activities),
							sports: Number(data.sports),
							happiness: Number(data.happiness)
					}
					Meteor.call('setVotedSchool', data.schoolId);
					Meteor.call('insertScoresOnSchool',data.schoolId,dataScores);
				}
				if(isVoted===true){
					let scores = {
						reputation: updatedscores.reputation,
						location: updatedscores.location,
						oportunidades: updatedscores.opportunities,
						library: updatedscores.library,
						infrastructure: updatedscores.infrastructure,
						internet: updatedscores.internet,
						food: updatedscores.food,
						activities: updatedscores.activities,
						sports: updatedscores.sports,
						happiness: updatedscores.happiness
					}
					Meteor.call('updateScoresOnSchool',data.schoolId,scores);
				}
				Meteor.call('addSchoolRatedBy',data.schoolId,data.userId);
				Meteor.call('voteOnSchool', data.schoolId);
				Meteor.call('updateSchoolOverall',data.schoolId,overall);
				FlowRouter.go('/universidad/'+data.schoolId);
				toastr['success']('Tu evaluación ha sido enviada con éxito.', 'Gracias');
			}
		});
		

	},

	getForm(){
		let back = '/universidad/'+this.props.school._id;
		return(
			<div>
				<h1>¡Dale al resto una pequeña guía sobre tu experiencia en <span>{this.props.school.name}</span>!</h1>
				<form onSubmit={this.insertSchoolReview}>
					<div className="form-group row">
						<Reputation />
					</div>
					<hr/>
					<div className="form-group row">
						<Location />
					</div>
					<hr/>
					<div className="form-group row">
						<Oportunidades />
					</div>
					<hr/>
					<div className="form-group row">
						<Library />
					</div>
					<hr/>
					<div className="form-group row">
						<Infrastructure />
					</div>
					<hr/>
					<div className="form-group row">
						<Internet />
					</div>
					<hr/>
					<div className="form-group row">
						<Food />
					</div>
					<hr/>
					<div className="form-group row">
						<Activities />
					</div>
					<hr/>
					<div className="form-group row">
						<Sports />
					</div>
					<hr/>
					<div className="form-group row">
						<Happines />
					</div>
					<hr/>
					<div className="form-group row">
						<Graduation />
					</div>
					<hr/>
					<div className="form-group row">
						<CommentSchool />
					</div>
					<hr className="special"/>
					<div className="text-center">
						<p className="col-md-6">Al presionar en el botón Enviar Evaluación, estoy afirmando que respondí la evaluación de manera consciente, estando al tanto sobre los <a href="/terminos-y-condiciones" target="_blank" className="terms">Términos y condiciones.</a></p>
						<a href={back} className="btn btn-danger btn-lg">Cancelar</a>
						<button type="submit" className="btn btn-success btn-lg">Enviar Evaluación</button>
					</div>
				</form>
			</div>
			)
	},

	render(){
		let schoolId = this.props.school._id,
				link = '/universidad/'+schoolId
		return(
			<div>
				{this.hasRated() ?
					<div>
						{this.getForm()}
					</div>
				:
				<div>
					<hr/>
					<h3 className="text-center">Ya has evaluado a esta universidad.<br /><br/>
						<a className="btn btn-info" href={link}><strong>Ver Ranking</strong></a>
					</h3>
					<hr/>
				</div>
					
				}
			</div>
			
			)
	}
});