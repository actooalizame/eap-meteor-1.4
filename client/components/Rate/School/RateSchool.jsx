RateSchool = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let schoolId = FlowRouter.getParam('schoolId');
		Meteor.subscribe('singleSchool', schoolId);
		return {
			user: Meteor.user(),
			userId: Meteor.userId(),
			school: Schools.find({_id:schoolId}).fetch()
		}
	},


	getSchoolForm(){
    return this.data.school.map((school) =>{
      return <RateSchoolForm key={school._id} school={school} />
    });
  },

  render(){
  	return(
      <div>
        {this.data.userId ?
          <div id="rateContainer">
            <div className="row">
              <div className="col-sm-6">
                <div className="panel pestana">
                  <a className="panel-heading collapsed" data-toggle="collapse" href="#collapseOne"><span className="editContent"><h3 className="text-center">Por favor ayúdanos:</h3></span></a>
                  <div id="collapseOne" className="panel-collapse collapse">
                    <div className="panel-body">
                      <ul>
                        <li>Revisa tu evaluación antes de enviarla, no sería mala idea chequear la ortografía.</li>
                        <li>Evaluar conscientemente. </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="panel pestana">
                  <a className="panel-heading collapsed" data-toggle="collapse" href="#collapseTwo"><span className="editContent"><h3 className="text-center">Por favor no lo hagas:</h3></span></a>
                  <div id="collapseTwo" className="panel-collapse collapse">
                    <div className="panel-body">
                      <ul>
                        <li>No crear falsa reputación.</li>
                        <li>No utilices garabatos ni palabras ofensivas contra la institución académica, ni sus colaboradores.</li>
                        <li>No utilices este medio como método de descarga personal.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-content-2">
              {this.getSchoolForm()}
            </div>
          </div>
        :
        <div className="app-content-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1 className="text-center">Debes estar logueado para evaluar la Universidad</h1>
            </div>
          </div>
        </div>
        }
      </div>
  		
  		)
  }
});