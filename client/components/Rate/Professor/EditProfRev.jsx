EditProfRev = React.createClass({

  componentWillMount(){
    this.forceUpdate();
  },

	mixins: [ReactMeteorData],

	getMeteorData(){
		let reviewId = FlowRouter.getParam('reviewId'),
        professorId = FlowRouter.getParam('professorId'),
        userId = Meteor.userId();
        
		Meteor.subscribe('myProfReview', reviewId);
    Meteor.subscribe('professorReviewsAverage', professorId);
    Meteor.subscribe('singleProfessorOverall',professorId);
		return {
			userId: userId,
			ownReview: Profreviews.find({userId:userId,professorId:professorId}).fetch()
		}
	},

	getProfessorForm(){
    return this.data.ownReview.map((review) =>{
      return <EditProfRevForm key={review._id} review={review} />
    });
  },

  render(){
  	return(
      <div id="rateContainer">
    		<div className="app-content-2">
          {this.getProfessorForm()}
    		</div>
  		</div>
  		)
  }
});