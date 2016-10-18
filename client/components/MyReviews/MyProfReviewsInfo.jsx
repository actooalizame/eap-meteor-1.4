MyProfReviewsInfo = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		var title = 'Evalúa al Profe - Mis Reviews',
			metaInfo = {name: 'description', content: 'Tus reviews de profesores y universidades'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			review: this.props.review
		}
	},

	overall(){
		let help = this.data.review.help,
				clarity = this.data.review.clarity,
				easy = this.data.review.easy,
				array = [];
				array.push(help,clarity,easy);
		let sum =  eval(array.join('+')),
				average = (sum/3).toFixed(1);
		return average;
	},

	render(){
		let link = '/profesor/'+this.data.review.professorId;
		return(
			<div className="col-sm-4 my-review">
				<h3><a href={link}>{this.data.review.professorName}</a></h3>
				<p><strong>{this.data.review.professorSchool}</strong></p>
				<h6>{this.data.review.professorDepartment}</h6>
				<p>Ayuda: {this.data.review.help}</p>
				<p>Claridad: {this.data.review.clarity}</p>
				<p>Dificultad: {this.data.review.easy}</p>
				<h4>Promedio: {this.overall()}</h4>
			</div>
			
			)
	}
});