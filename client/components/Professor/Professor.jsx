ProfSubs = new SubsManager();

Professor = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let professorId = FlowRouter.getParam('professorId');
		const handle = ProfSubs.subscribe('singleProfessor', professorId);
  		return {
        ready: handle.ready(),
  			professor: Professors.find({_id:professorId}).fetch()
  		}
	},

	getProfessorInfo(){
    return this.data.professor.map((professor) =>{
      return <ProfessorInfo key={professor._id} professor={professor} />
    });
  },

  render(){
  	return(
  		<div>
        {this.data.ready ?
          <div className="app-content">
            {this.getProfessorInfo()}
          </div>
          :
          <LoadingWrap />
        }
  			
  		</div>
  		
  		)
  }

});