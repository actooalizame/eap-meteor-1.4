SchoolsSubs = new SubsManager();

School = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let schoolId = FlowRouter.getParam('schoolId');
		const handle = SchoolsSubs.subscribe('singleSchool', schoolId);
  		return {
        ready: handle.ready(),
  			school: Schools.find({_id:schoolId}).fetch()
  		}
	},

	getSchoolInfo(){
    return this.data.school.map((school) =>{
      return <SchoolInfo key={school._id} school={school} />
    });
  },

  render(){
  	return(
  		<div>
        {this.data.ready ?
          <div className="app-content">
            {this.getSchoolInfo()}
          </div>
          :
          <LoadingWrap />
        }
  			
  		</div>
  		
  		)
  }

});