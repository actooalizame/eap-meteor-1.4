const ReactHighcharts = require('react-highcharts');

ProfessorInfo = React.createClass({

	componentDidMount(){
		$('.multiple-btn').on('click', function(){
			$('#multiple-details').toggleClass('hidden');
		});

	},

	componentWillUnmount(){
		Session.set('profName', undefined);
		Session.set('profSchool', undefined);
	},

	mixins: [ReactMeteorData],

	getMeteorData(){
	let professorId = this.props.professor._id;
	let help = this.props.professor.help,
			clarity = this.props.professor.clarity,
			easy = this.props.professor.easy;
  var chartData = [
  	['Ayuda', help],
  	['Claridad', clarity],
  	['Facilidad', easy]
  ];
	

	Meteor.subscribe('professorReviews',professorId);
	Meteor.subscribe('myProfReview',professorId);

	var title = this.props.professor.name,
			metaInfo = {name: 'description', content: this.props.professor.schoolName+ ' - ' +this.props.professor.department};
	DocHead.setTitle(title);
	DocHead.addMeta(metaInfo);


	let profName = Session.get('profName'),
			profSchool = Session.get('profSchool');
	if(profName&&profSchool!==undefined){
		Meteor.subscribe('multipleProfessors',profName,profSchool);
	}
	let userId = Meteor.userId();
		return {
			userId: userId,
			reviews: Profreviews.find({professorId:professorId}).fetch(),
			ownReview: Profreviews.find({userId:userId,professorId:professorId}).fetch(),
			multipleProfessor: Professors.find({name:profName,schoolName:profSchool}).fetch(),
			chartData: chartData,
			votes: this.props.professor.votes
		}
	},

	getReviews(){
		return this.data.reviews.map((review) =>{
      return <ProfessorReviews key={review._id} review={review} />
    });
	},

	getProfessorInfo(){
		
		return(
			<div className="single-info">
				<h1>{this.props.professor.name}</h1>
				<h3>{this.props.professor.schoolName}</h3>
				{this.props.professor.multiple ? 
					this.isMultipleX()
					:
					<h4>{this.props.professor.department}</h4>
				}
				
				<hr/>
			</div>
			)
	},

	getOverallScores(){
		let scoreColor = this.scoreColor();
		return(
			<div className="single-info-detail">
				<h2 className="overall" style={scoreColor}><strong>Ranking promedio: {this.props.professor.overall}</strong></h2>
				<h3>Ayuda al alumno: {this.props.professor.help}</h3>
				<h3>Claridad para enseñar: {this.props.professor.clarity}</h3>
				<h3>Facilidad: {this.props.professor.easy}</h3>
				<br/>
				<h2><strong>Nota Promedio: {this.getAverageGrade()}</strong></h2>
				
				<hr/>
				{this.socialShare()}
			</div>
			)
	},

	getAverageGrade(){
  	var professorId = this.props.professor._id,
  			gradedReviews = Profreviews.find( {professorId: professorId, grade: { $exists: true, $gte: 1 } } ),
  			gradedReviewsCount = gradedReviews.count();

  	if(gradedReviewsCount==0){ 
  		return 'Sin datos';
  	}
  	if(gradedReviewsCount>0){ 
  		let gradedReviewsArray = gradedReviews.map(function(a) {return a.grade;}),
					gradedReviewsSum = eval(gradedReviewsArray.join('+'));
  		return (gradedReviewsSum/gradedReviewsCount).toFixed(1) 
  	}
  },

  scoreColor() {
  	let overall = this.props.professor.overall;
  	if(overall<2.5) {return {color:'#be1722'}}
  	if(overall<=3.8) {return {color:'#d6d800'}}
  	if(overall<=5) {return {color:'#2ecc71'}}
  },

	isMultiple(){
			return(
				<div>
					{this.props.professor.multiple ?
						<div className="multiple">
							<p><strong>Este profesor dicta clases en varias facultades</strong> <button className="btn btn-xs btn-success multiple-btn" onClick={this.showMultiple}>Ver</button></p>
							
						</div>
						:
						<span className="hidden"></span>
					}
				</div>
			)
	},

	isMultipleX(){
		let departments = this.props.professor.department,
				formated = departments.join(', ');
		return <h4>{formated}</h4>
	},

	/*showMultiple(){
		let name = this.props.professor.name,
				schoolName = this.props.professor.schoolName;
		Session.set('profName', name);
		Session.set('profSchool', schoolName);
	},*/
  
	getMultiple(){
		return this.data.multipleProfessor.map((professor) =>{
      return <MultipleProfInfo key={professor._id} professor={professor} />
    });
	},
	
	hasNoVotes(){
		let professorId = this.props.professor._id, 
					link = '/evalua-al-profe/'+professorId;
		return(
			<div>
				{this.data.userId ?
						<div className="row">
							<div className="dinamic-btn-action col-sm-11">
								<h4 className="white">Se el primero en escribir un review sobre {this.props.professor.name}<a href={link} className="btn btn-success btn-sm"> Evaluar</a></h4>
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
				professorId = this.props.professor._id,
				rated = this.props.professor.ratedBy,
				array = jQuery.inArray(userId,rated),
				reviewId = this.data.ownReview.map(function(a) {return a._id;});

		if(array>=0){
			let link = '#'+reviewId;
			return (
				<div className="row">
					<div className="dinamic-btn-action col-sm-12">
						<h4 className="white">Ya has evaluado a este profesor <a data-scroll href={link} className="btn btn-info btn-sm">Ver review</a></h4>
					</div>
				</div>
				);
		}
		if(array<0){
			let professorId = this.props.professor._id, 
					link = '/evalua-al-profe/'+professorId;
			return (
				<div>
					{this.data.userId ?
						<div className="dinamic-btn-action">
							<h4 className="white">Aun no has evaluado a este profesor <a href={link} className="btn btn-success btn-sm">Evaluar</a></h4>
						</div>
					:
						<div className="dinamic-btn-action">
							<h4 className="white">Logueate para evaluarlo!</h4>
						</div>
					}
				</div>
				);
		}
	},

	shareFb(){

		let fbName = 'Mira como sus alumnos han evaluado a '+this.props.professor.name,
				fbLink = 'http://evaluaalprofe.cl/profesor/'+this.props.professor._id,
				caption = 'Promedio Total: '+this.props.professor.overall;
		
	    FB.ui( {
	        method: 'feed',
	        name: fbName,
	        link: fbLink,
	        picture: 'http://enef.cl/landing/images/logo-eap-md.png',
	        description: 'Elige informado en tu próxima toma de ramos. Evalúa a tu profesor de forma anónima, publica y externa a tu universidad. Glorifica o castiga a quienes lo merezcan.',
	        caption: caption
	    }, function( response ) {
	        // do nothing
	   });
	},

	socialShare(){
		let title = 'https://twitter.com/intent/tweet?text=Mira%20al%20professor%20'+this.props.professor.name+'%20en%20Evaluaalprofe.cl&url=http://evaluaalprofe.cl/profesor/'+this.props.professor._id;
		return(
			<div>
				<p>Compartir en:</p>
				<button type="button" className="btn btn-xs fb-share" onClick={this.shareFb}>Facebook</button>
				<a  href={title} data-size="small" className="twitter-share btn btn-xs">Twitter</a>
			</div>
		)
	},

	chartConfig(){
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
		      data: this.data.chartData
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

	render(){
		let config = this.chartConfig();
		return(
			<div className="app-content">
				<div className="row info-header prof-info">
					<div className="col-md-9">
						{this.getProfessorInfo()}
					
						{this.props.professor.voted ?
							<div>
								<div className="col-md-7">
									{this.getOverallScores()}
								</div>
								<div className="col-md-5">
									<ReactHighcharts config={config}></ReactHighcharts>
								</div>
								
							</div>
							:
							<div className="empty-prof">
								<h2 className="brand-txt">Aun no existen reviews para este profesor</h2>
								{this.hasNoVotes()}
							</div>
						}
					</div>

					<div className="col-md-3 single-info">
						<img className="hidden-xs hidden-sm img-responsive" src="/images/app/logo-eap-md.png" alt=""/>
						<div id="multiple-details" className="list-group hidden">
								{this.getMultiple()}
							</div>
					</div>
				</div>
				<div className="row">
					{this.props.professor.voted ? 
						this.userRated()
						:
						<div className="hidden"></div>
					}
					
				</div>
				<div className="row">
					<h4 className="normal-type">Evaluaciones de Alumnos: {this.data.reviews.length}</h4>
					{this.getReviews()}
				</div>
			</div>
			)
	}
});