RateProfessorForm = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let professorcId = this.props.professor._id;
		Meteor.subscribe('professorReviews',professorcId);
		Meteor.subscribe('singleProfessor', professorcId)
		return {
			user: Meteor.user(),
			voted: this.props.professor.voted,
			overall: this.props.professor.overall,
			ratedBy: this.props.professor.ratedBy
		}
	},

	componentDidMount(){
		jQuery('[data-toggle="tooltip"]').tooltip();
	},


	hasRated(){
		let ratedBy = this.props.professor.ratedBy;
		if(ratedBy!==undefined){
			let rated = ratedBy.map(function(a) {return a;}),
        userId = Meteor.userId(),
      	array = jQuery.inArray(userId,rated);
	    if(array>=0){
	      return false;
	    }
	    if(array<0){
	      return true;
	    }
		}
    
  },

  getScores(){
  	let help = Session.get('helpValue'),
				clarity = Session.get('clarityValue'),
				easy = Session.get('easyValue');
				
		var reviews = Profreviews.find({professorId:this.props.professor._id}),
				reviewsCount = reviews.count()+1;
		let helpArray = reviews.map(function(a) {return a.help;}),
					helpSum = eval(helpArray.join('+'));
		let clarityArray = reviews.map(function(a) {return a.clarity;}),
				claritySum = eval(clarityArray.join('+'));
		let easyArray = reviews.map(function(a) {return a.easy;}),
				easySum = eval(easyArray.join('+'));
		let updatedScores = {
			help: Number(((+help + +helpSum)/reviewsCount).toFixed(1)),
			clarity: Number(((+clarity + +claritySum)/reviewsCount).toFixed(1)),
			easy: Number(((+easy + +easySum)/reviewsCount).toFixed(1))
		}
		return updatedScores;
  },

  getOverall(){
  	var reviews = Profreviews.find({professorId:this.props.professor._id}),
					reviewsCount = reviews.count();
		var overall = [],
					help = Session.get('helpValue'),
					clarity = Session.get('clarityValue'),
					easy = Session.get('easyValue');

		if(reviewsCount===0){
			overall.push(help,clarity,easy);
			let sum =  eval(overall.join('+')),
					average = (sum/3).toFixed(1);
			return Number(average);
			}
		if(reviewsCount>0){
			// Current review
			overall.push(help,clarity,easy);
			// Previous reviews
			let helpArray = reviews.map(function(a) {return a.help;}),
					helpSum = eval(helpArray.join('+'));
			let clarityArray = reviews.map(function(a) {return a.clarity;}),
					claritySum = eval(clarityArray.join('+'));
			let easyArray = reviews.map(function(a) {return a.easy;}),
					easySum = eval(easyArray.join('+'));
			// Get current reviews average
			let sum = eval(overall.join('+')),
					average = (sum).toFixed(1);
			// Get previous reviews average
			let previous = [];
			previous.push(helpSum,claritySum,easySum);
			let previousSum = (eval(previous.join('+'))).toFixed(1);
			// Join both into array
			let total = [];
			total.push(average,previousSum);
			// Process Total
			let sumReviews =  eval(total.join('+')).toFixed(1),
					totalAverage = ((sumReviews/3)/(reviews.count()+1)).toFixed(1);

			return Number(totalAverage);
			
		}
  },

	insertProfReview(e){
		e.preventDefault();
		var selectedTags = jQuery('input[type=checkbox]:checked');
			
		let data = {
			userId: this.data.user._id,
			userName: this.data.user.profile.name,
			professorId: this.props.professor._id,
			professorName: this.props.professor.name,
			professorSchool: this.props.professor.schoolName,
			professorDepartment: (this.props.professor.department).toString(),
			courseCode: e.target.courseCode.value,
			semester: e.target.semester.value,
			year: e.target.year.value,
			help: Session.get('helpValue'),
			clarity: Session.get('clarityValue'),
			easy: Session.get('easyValue'),
			eligible: Session.get('eligible'),
			recommend: Session.get('recommend'),
			//sexy: Session.get('sexy'),
			tags: _.map(selectedTags, function(item) {return item.defaultValue;}),
			comment: e.target.comment.value,
			assistance: Session.get('assistance'),
			interest: Session.get('interestValue'),
			textUse: Session.get('textValue'),
			grade: e.target.grade.value,
			mayor: e.target.mayor.value
		}
		
		let isVoted = this.data.voted,
				overall = this.getOverall(),
				newScores = this.getScores();
		Meteor.call('insertProfReview', data, isVoted, overall, newScores, function(error){
			if(error){
				toastr['error'](error.reason, 'Atencion!');
			} 
			else {
				if(isVoted===false){
					let help = Number(Session.get('helpValue')),
						clarity = Number(Session.get('clarityValue')),
						easy = Number(Session.get('easyValue'));
					Meteor.call('insertScoresOnProf',data.professorId,help,clarity,easy);
					Meteor.call('setVotedProfessor', data.professorId);
				}
				if(isVoted===true){Meteor.call('updateScoresOnProf',data.professorId,newScores.help,newScores.clarity,newScores.easy);}
				Meteor.call('addProfRatedBy',data.professorId,data.userId);
				Meteor.call('voteOnProfessor',data.professorId);
				Meteor.call('updateProfessorOverall',data.professorId,overall);
				FlowRouter.go('/profesor/'+data.professorId);
				toastr['success']('Tu evaluación ha sido enviada con éxito.', 'Gracias');
			}
		});
	},

	getForm(){
		let back = '/profesor/'+this.props.professor._id;
		return(
			<div>
				<h1>¡Es tu turno de evaluar a tu Profesor <span>{this.props.professor.name}</span>!</h1>
				<form onSubmit={this.insertProfReview}>
					
					<div className="sliders">
						<div className="form-group row">
							<Help />
						</div>
						<hr/>
						<div className="form-group row">
							<Clarity />
						</div>
						<hr/>
						<div className="form-group row">
							<Easy />
						</div>
						<hr/>
					</div>
					<div className="form-group row">
						<Recommend />
					</div>
					<hr/>
					<div className="form-group row">
						<CourseCode />
					</div>
					<hr/>
					<div className="form-group row">
						<CommentProfessor />
					</div>
					<hr className="special"/>
					<h4 className="text-center optionals"><strong>Opcionales</strong></h4>
					<div className="form-group row">
						<Eligible />
					</div>
					<hr/>
					<div className="form-group row">
						<Assistance />
					</div>
					<hr/>
					<div className="sliders">
						<div className="form-group row">
							<Interest />
						</div>
						<hr/>
						<div className="form-group row">
							<TextUse />
						</div>
					</div>
					<hr/>
					<div className="form-group row">
						<CourseDate />
					</div>
					<hr/>
					<div className="form-group row">
						<Grade />
					</div>
					<hr/>
					<div className="form-group row">
						<Mayor />
					</div>
					<hr/>
					<div className="form-group row">
						<Tags />
					</div>
					<hr className="special"/>
					<div className="text-center ">
						<p className="col-md-6">Al presionar en el botón Enviar Evaluación, estoy afirmando que respondí la evaluación de manera consciente, estando al tanto sobre los <a href="/terminos-y-condiciones" target="_blank" className="terms">Términos y condiciones.</a></p>
						<a href={back} className="btn btn-danger btn-lg">Cancelar</a>
						<button type="submit" className="btn btn-success btn-lg">Enviar Evaluación</button>
					</div>
					
				</form>
			</div>
			)
	},

	render(){
		let professorId = this.props.professor._id,
				link = '/profesor/'+professorId
		return(
			<div>
				{this.hasRated() ?
					<div>
						{this.getForm()}
					</div>
				:
				<div>
					<hr/>
					<h3 className="text-center">Ya has evaluado a este profesor.<br /><br/>
						<a className="btn btn-info" href={link}><strong>Ver Ranking</strong></a>
					</h3>
					<hr/>
				</div>
					
				}
			</div>
			
			)
	}
});