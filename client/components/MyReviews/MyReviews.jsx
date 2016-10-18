MyReviewsSubs = new SubsManager();

MyReviews = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let userId = Meteor.userId();
		const profHandle = MyReviewsSubs.subscribe('myProfReviews'),
					schoolHandle = MyReviewsSubs.subscribe('mySchoolReviews');
		var title = 'Evalúa al Profe - Mis evaluaciones',
			metaInfo = {name: 'description', content: 'Revisa tus evaluaciones de profesores y universidades'};
		DocHead.setTitle(title);
		DocHead.addMeta(metaInfo);
		return {
			profReady: profHandle.ready(),
			schoolReady: schoolHandle.ready(),
			profReviews: Profreviews.find({userId:userId},{sort:{createdAt:-1}}).fetch(),
			schoolReviews: Schoolreviews.find({userId:userId},{sort:{createdAt:-1}}).fetch()
		}
	},

	getProfReviews(){
		return this.data.profReviews.map((review) =>{
      return <MyProfReviewsInfo key={review._id} review={review} />
    });
	},

	getSchoolReviews(){
		return this.data.schoolReviews.map((review) =>{
      return <MySchoolReviewsInfo key={review._id} review={review} />
    });
	},

	render(){
		return(
			<div>
				{this.data.profReady && this.data.schoolReady ?
          <div className="app-content">
            <div>
						  <ul className="nav nav-pills" role="tablist">
						    <li role="presentation" className="active"><a href="#profesores" aria-controls="profesores" role="tab" data-toggle="tab">Profesores</a></li>
						    <li role="presentation"><a href="#universidades" aria-controls="universidades" role="tab" data-toggle="tab">Universidades</a></li>
						  </ul>

						  <div className="tab-content">
						    <div role="tabpanel" className="tab-pane fade in active" id="profesores">{this.getProfReviews()}</div>
						    <div role="tabpanel" className="tab-pane fade" id="universidades">{this.getSchoolReviews()}</div>
						  </div>
						</div>
          </div>
          :
          <LoadingWrap />
        }
			</div>
			)
	}
});