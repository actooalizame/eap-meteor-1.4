EditSchoolRev = React.createClass({
	componentWillMount(){
    this.forceUpdate();
  },

	mixins: [ReactMeteorData],

	getMeteorData(){
		let reviewId = FlowRouter.getParam('reviewId'),
        schoolId = FlowRouter.getParam('schoolId'),
        userId = Meteor.userId();
        
		Meteor.subscribe('mySchoolReview', reviewId);
    //Meteor.subscribe('professorReviewsAverage', schoolId);
    //Meteor.subscribe('singleProfessorOverall',schoolId);
		return {
			userId: userId,
			ownReview: Schoolreviews.find({userId:userId,schoolId:schoolId}).fetch()
		}
	},

	getSchoolForm(){
    return this.data.ownReview.map((review) =>{
      return <EditSchoolRevForm key={review._id} review={review} />
    });
  },

  render(){
  	return(
  		<div className="app-content-2">
        {this.getSchoolForm()}
  		</div>
  		
  		)
  }
});