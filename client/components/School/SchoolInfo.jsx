const ReactHighcharts = require('react-highcharts');

SchoolInfo = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
	let schoolId = this.props.school._id;
			reviews = Schoolreviews.find({schoolId:schoolId}),
			length = reviews.count();

	Meteor.subscribe('schoolReviews',schoolId);
	let userId = Meteor.userId()
		return {
			userId: userId,
			reviews: Schoolreviews.find({schoolId:schoolId}).fetch(),
			ownReview: Schoolreviews.find({userId:userId,schoolId:schoolId}).fetch(),
			votes: this.props.school.votes
		}
	},

	getReviews(){
		return this.data.reviews.map((review) =>{
      return <SchoolReviews key={review._id} review={review} />
    });
	},
	/*
	getScores(){
  	var reviews = Schoolreviews.find({schoolId:this.props.school._id}),
				reviewsCount = reviews.count();
		let locationArray = reviews.map(function(a) {return a.location;}),
				locationSum = eval(locationArray.join('+'));
		let reputationArray = reviews.map(function(a) {return a.reputation;}),
				reputationSum = eval(reputationArray.join('+'));
		let oportunidadArray = reviews.map(function(a) {return a.opportunities;}),
				oportunidadSum = eval(oportunidadArray.join('+'));
		let libraryArray = reviews.map(function(a) {return a.library;}),
				librarySum = eval(libraryArray.join('+'));
		let infrastructureArray = reviews.map(function(a) {return a.infrastructure;}),
				infrastructureSum = eval(infrastructureArray.join('+'));
		let internetArray = reviews.map(function(a) {return a.internet;}),
				internetSum = eval(internetArray.join('+'));
		let foodArray = reviews.map(function(a) {return a.food;}),
				foodSum = eval(foodArray.join('+'));
		let socialArray = reviews.map(function(a) {return a.social;}),
				socialSum = eval(socialArray.join('+'));
		let sportsArray = reviews.map(function(a) {return a.sports;}),
				sportsSum = eval(sportsArray.join('+'));

		let happinessArray = reviews.map(function(a) {return a.happiness;}),
				happinessSum = eval(happinessArray.join('+'));

		
		
		let updatedScores = {
			location: Number((locationSum/reviewsCount).toFixed(1)),
			reputation: Number((reputationSum/reviewsCount).toFixed(1)),
			opportunities: Number((oportunidadSum/reviewsCount).toFixed(1)),
			library: Number((librarySum/reviewsCount).toFixed(1)),
			infrastructure: Number((infrastructureSum/reviewsCount).toFixed(1)),
			internet: Number((internetSum/reviewsCount).toFixed(1)),
			food: Number((foodSum/reviewsCount).toFixed(1)),
			social: Number((socialSum/reviewsCount).toFixed(1)),
			sports: Number((sportsSum/reviewsCount).toFixed(1)),
			happiness: Number((happinessSum/reviewsCount).toFixed(1))
		}
		return updatedScores;
  },
  */
  chartData(){
  	let scores = this.props.school,
  		  chartData = [
			  	['Reputación', scores.reputation],
			  	['Ubicación', scores.location],
			  	['Oportunidades', scores.oportunidades],
			  	['Librería', scores.library],
			  	['Infraestructura', scores.infrastructure],
			  	['Internet', scores.internet],
			  	['Comida', scores.food],
			  	['Actividades', scores.activities],
			  	['Deportes', scores.sports],
			  	['Felicidad', scores.happiness]
			  ];
		return chartData;
  },

  chartConfig(){
  	var chartData = this.chartData();
		let config = {
			chart: {
	      type: 'column'
	     },
      title: {
          text: 'Calificaciones',
          style: {
              fontSize: '30px',
              fontFamily: 'Amatic SC, sans-serif'
          }
      },
      subtitle: {
          text: 'Reviews: '+this.data.votes,
          style: {
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 'bold'
          }
      },
      xAxis: {
        type: 'category',
        labels: {
          //rotation: -45,
          style: {
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Open Sans, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        max: 5,
        tickInterval: 1,
        title: {
            text: 'Promedio de todas las evaluaciones'
        }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
      },
      /*tooltip: {
          pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
      },*/
	    series: [{
	    		name: 'Promedio',
		      data: chartData
		    }],
	  	dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
            fontSize: '13px',
            fontFamily: 'Open Sans, sans-serif'
        }
      }
		};
		return config;
	},
	/*getOverallScores(){
		return(
			<div>
				<h4>Ranking promedio: {this.props.professor.overall}</h4>
				<h4>Ayuda al alumno: {this.data.helpAverage}</h4>
				<h4>Claridad para enseñar: {this.data.clarityAverage}</h4>
				<h4>Dificultad: {this.data.easyAverage}</h4>
			</div>
			)
	},*/

	scoreColor() {
  	let overall = this.props.school.overall;
  	if(overall<2.5) {return {color:'#be1722'}}
  	if(overall<=3.8) {return {color:'#d6d800'}}
  	if(overall<=5) {return {color:'#2ecc71'}}
  },

	getSchoolInfo(){
		let link = 'http://'+this.props.school.website,
				config = this.chartConfig(),
				scoreColor = this.scoreColor();
		return(
			<div className="row info-header school-info">
				
				{this.props.school.voted ?
					<div>
						<div className="col-md-6 single-info">
							<h1>{this.props.school.name}</h1>
							<h3>{this.props.school.address}</h3>
							<h4><a href={link} target="_blank">{this.props.school.website}</a></h4>
							<div className="single-info-detail">
								<h2 className="overall" style={scoreColor}><strong>Ranking promedio: {this.props.school.overall}</strong></h2>
							</div>
							
						</div>
						<div className="col-md-6">
							<ReactHighcharts config={config}></ReactHighcharts>
						</div>
					</div>
				:
				<div className="unvoted-school">
					<div className="col-md-8 single-info">
						<h1>{this.props.school.name}</h1>
						<h3>{this.props.school.address}</h3>
						<h4><a href={link} target="_blank">{this.props.school.website}</a></h4>
					</div>
					<div className="col-md-4">
						<img className="hidden-xs hidden-sm img-responsive" src="/images/app/logo-eap-md.png" alt=""/>
					</div>
				</div>
				}
				
				
			</div>
			)
	},
	

	hasNoVotes(){
		let schoolId = this.props.school._id, 
					link = '/evalua-la-u/'+schoolId;
		return(
			<div>
				{this.data.userId ?
						<div className="row">
							<div className="dinamic-btn-action col-sm-11">
								<h4 className="white">Se el primero en escribir un review sobre {this.props.school.name}<a href={link} className="btn btn-success btn-sm"> Evaluar</a></h4>
							</div>
						</div>
						:
						<div className="row">
							<div className="dinamic-btn-action col-sm-11">
								<h4 className="white">Logueate para evaluarlo!</h4>
							</div>
						</div>
					}
			</div>
			) 
	},

	userRated(){
		let userId = this.data.userId,
				schoolId = this.props.school._id,
				rated = this.props.school.ratedBy,
				array = jQuery.inArray(userId,rated),
				reviewId = this.data.ownReview.map(function(a) {return a._id;});		   
		    link = '/editar-review/'+reviewId+'/universidad/'+schoolId;

		if(array>=0){
			return (
				<div className="row">
					<div className="dinamic-btn-action col-sm-12">
						<h4 className="white">Ya has evaluado a esta universidad <a href={link} className="btn  btn-warning btn-sm">Editar review</a></h4>
					</div>
				</div>
				);
		}
		if(array<0){
			let schoolId = this.props.school._id, 
					link = '/evalua-la-u/'+schoolId;
			return (
				<div>
					{this.data.userId ?
						<div className="dinamic-btn-action">
							<h4 className="white">Aun no has evaluado a esta universidad <a href={link} className="btn btn-success btn-sm">Evaluar</a></h4>
						</div>
					:
						<div className="dinamic-btn-action">
							<h4 className="white">Logueate para evaluarla!</h4>
						</div>
					}
				</div>
				);
		}
	},


	render(){
		return(
			<div>
				{this.getSchoolInfo()}

				{this.props.school.voted ?
					<div>
						{this.userRated()}
						<h4>Evaluaciones de Alumnos: {this.data.reviews.length}</h4>
					</div>
					:
					<div>
						<h1 className="brand-txt">Aun no existen reviews para esta universidad</h1>
						{this.hasNoVotes()}
					</div>
				}
				{this.getReviews()}
			</div>
			
			)
	}
});