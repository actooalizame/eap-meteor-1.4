VotedProfsSubs = new SubsManager();

VotedProfessors = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		const handle = VotedProfsSubs.subscribe('votedProfessors');
		return {
			ready: handle.ready(),
			votedProfessors: Professors.find({voted:true},{sort:{overall:-1}}).fetch()
		}
	},

	getProfessors(){
		return this.data.votedProfessors.map((professor) =>{
      return <VotedProfessorsInfo key={professor._id} professor={professor} />
    });
	},

	render(){
		return(
			<div>
				{this.data.ready ?
          <div className="app-content">
            {this.getProfessors()}
          </div>
          :
          <LoadingWrap />
        }
			</div>
			
			)
	}
});
