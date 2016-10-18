MySchoolReviewsInfo = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			review: this.props.review
		}
	},

	/*overall(){
		let help = this.data.review.help,
				clarity = this.data.review.clarity,
				easy = this.data.review.easy,
				array = [];
				array.push(help,clarity,easy);
		let sum =  eval(array.join('+')),
				average = (sum/3).toFixed(1);
		return average;
	},*/

	render(){
		let link = '/universidad/'+this.data.review.schoolId;
		return(
			<div className="col-sm-6 my-review">
				<h3><a href={link}>{this.data.review.schoolName}</a></h3>
				<div className="col-sm-6">
					<p>Reputación: {this.data.review.reputation}</p>
					<p>Ubicación: {this.data.review.location}</p>
					<p>Oportunidades: {this.data.review.opportunities}</p>
					<p>Biblioteca: {this.data.review.library}</p>
					<p>Infraestructura y aéreas comunes: {this.data.review.infrastructure}</p>
				</div>
				<div className="col-sm-6">
					<p>Computadores e Internet: {this.data.review.internet}</p>
					<p>Comida: {this.data.review.food}</p>
					<p>Vida universitaria y actividades extra programáticas: {this.data.review.social}</p>
					<p>Incentivo deportivo: {this.data.review.sports}</p>
					<p>Felicidad: {this.data.review.happiness}</p>
				</div>
				
			</div>
			
			)
	}
});