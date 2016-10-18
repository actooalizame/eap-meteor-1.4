MyReviewsSubs = new SubsManager();

MyProfReviews = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let userId = Meteor.userId();
		const handle = MyReviewsSubs.subscribe('myProfReviews');
		return {
			ready: handle.ready(),
			reviews: Profreviews.find({userId:userId},{sort:{createdAt:-1}}).fetch()
		}
	},

	getReviews(){
		return this.data.reviews.map((review) =>{
      return <MyProfReviewsInfo key={review._id} review={review} />
    });
	},

	render(){
		return(
			<div>
				{this.data.ready ?
          <div className="app-content">
            {this.getReviews()}
          </div>
          :
          <LoadingWrap />
        }
			</div>
			
			)
	}
});