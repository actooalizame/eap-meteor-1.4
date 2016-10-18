VotedProfessorsInfo = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let professorId = this.props.professor._id,
				reviewsCursor = Profreviews.find({professorId:professorId}),
				length = reviewsCursor.count()
		Meteor.subscribe('professorReviews',professorId);
		return {
			reviews: Profreviews.find({professorId:professorId}).fetch(),
			length: length
		}
	},

	overallHelp(){
		let professorId = this.props.professor._id,
				reviews = Profreviews.find({professorId:professorId}),
				help = reviews.map(function(a) {return a.help;});
				sum = eval(help.join('+')),
				length = this.data.length,
				average  = (sum / length).toFixed(1);
		return average;
	},

	overallClarity(){
		let professorId = this.props.professor._id,
				reviews = Profreviews.find({professorId:professorId}),
				clarity = reviews.map(function(a) {return a.clarity;});
				sum = eval(clarity.join('+')),
				length = this.data.length,
				average  = (sum / length).toFixed(1);
		return average;
	},

	overallEasy(){
		let professorId = this.props.professor._id,
				reviews = Profreviews.find({professorId:professorId}),
				easy = reviews.map(function(a) {return a.easy;});
				sum = eval(easy.join('+')),
				length = this.data.length,
				average  = (sum / length).toFixed(1);
		return average;
	},

	render(){
		let link = '/profesor/'+this.props.professor._id;
		return(
			<div className="col-sm-3 my-review">
				<h3><a href={link}>{this.props.professor.name}</a></h3>
				<p><strong>{this.props.professor.schoolName}</strong></p>
				<h6>{this.props.professor.department}</h6>
				
				<p>Ayuda: {this.overallHelp()}</p>
				<p>Claridad: {this.overallClarity()}</p>
				<p>Dificultad: {this.overallEasy()}</p>
				<h4>Promedio: {this.props.professor.overall} <small> (Reviews:{this.data.length})</small></h4>
			</div>
			)
	}
});

/*overall(){
		let professorId = this.props.professor._id,
				reviews = Profreviews.find({professorId:professorId}),
				length = this.data.length,
				help = reviews.map(function(a) {return a.help;}),
				clarity = reviews.map(function(a) {return a.clarity;}),
				easy = reviews.map(function(a) {return a.easy;});
		let helpSum = (eval(help.join('+'))/length).toFixed(1),
				claritySum = (eval(clarity.join('+'))/length).toFixed(1),
				easySum = (eval(easy.join('+'))/length).toFixed(1);
		let overall = [];
		overall.push(helpSum,claritySum,easySum);
		let sum =  eval(overall.join('+')),
				average = (sum/3).toFixed(1);
		return average;
	},*/