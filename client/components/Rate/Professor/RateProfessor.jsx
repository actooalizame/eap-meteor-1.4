RateProfessor = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let professorId = FlowRouter.getParam('professorId');
		Meteor.subscribe('singleProfessor', professorId);
		return {
			user: Meteor.user(),
			userId: Meteor.userId(),
			professor: Professors.find({_id:professorId}).fetch()
		}
	},


	getProfessorForm(){
    return this.data.professor.map((professor) =>{
      return <RateProfessorForm key={professor._id} professor={professor} />
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
                          <li>Intenta especificar bien la clase.</li>
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
                          <li>No usar sobrenombres en los comentarios y no clasificarlo de manera despectiva.</li>
                          <li>No utilizar garabatos ni palabras ofensivas contra el profesor</li>
                          <li>No utilices este medio como método de descarga personal.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
            <div className="app-content-2">        
              
              {this.getProfessorForm()}
            </div>
          </div>
        :
        <div className="app-content-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1 className="text-center">Debes estar logueado para evaluar al profesor</h1>
            </div>
          </div>
        </div>
        }
      </div>
      
  		)
  }
});