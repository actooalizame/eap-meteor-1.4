AddProfessor = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			userId: Meteor.userId()
		}
	},

	componentWillMount(){
		Session.setDefault('multiple', false);
	},

	componentWillUnmount(){
  	Session.set('multiple', undefined);
   	Session.set('filterSchool', undefined);
   	Session.set('filterId', undefined);
  },

	multipleYes(){
		Session.set('multiple', true);
	},

	multipleNo(){
		Session.set('multiple', false);
	},

	setSchoolName(){
		let selected = jQuery('.filter-name').val();
    if(selected!==''){
      Session.set('filterSchool', selected);
    }
	},

	setSchoolId(){
		let selected = jQuery('.filter-id').val();
    if(selected!==''){
      Session.set('filterId', selected);
    }
	},

	addProfessor(e){
		e.preventDefault();
		let data = {
			name: e.target.name.value,
			slug: e.target.slug.value,
			schoolName: Session.get('filterSchool'),
			department: e.target.department.value,
			schoolId: Session.get('filterId'),
			multiple: Session.get('multiple')
		};
		Meteor.call('addProfessor', data);
	},

	isAdmin(){
		let userId = this.data.userId;
		if(userId=='h7X93Pu9EmMYrM8gP'||userId=='DwYMw2ji8g4BSmAWF'||userId=='i3vg2rYuXFrv8s39e'||userId=='T8CACR2zzKkkqZz9L'){
			return true;
		}
		if(userId==null){
			return false;
		}
	},

	render(){
		return(
			<div className="app-content-2">
				{this.isAdmin()? 
					<form onSubmit={this.addProfessor}>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="name"><h4><strong>Nombre completo</strong></h4></label>
							<input type="text" className="form-control" name="name" id="name" required/>
						</div>
						<div className="col-md-6">
							<label htmlFor="slug"><h4><strong>slug</strong></h4></label>
							<input type="text" className="form-control" name="slug" id="slug" required/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<h4><strong>Universidad</strong></h4>
							<select className="form-control filter-name" name="schoolName" id="schoolName" onChange={this.setSchoolName}>
		            <option value="">Universidad del profesor</option>
		            <option>Pontificia Universidad Católica de Chile</option>
		            <option>Universidad de Chile</option>
		            <option>Universidad Nacional Andrés Bello</option>
		            <option>Universidad de Los Andes</option>
		            <option>Universidad Adolfo Ibáñez</option>
		            <option>Universidad Diego Portales</option>
		            <option>Universidad Mayor</option>
		            <option>Universidad Arturo Prat</option>
		            <option>Universidad San Sebastián</option>
		            <option>Universidad Católica de La Santísima Concepción</option>
		            <option>Pontificia Universidad Católica de Valparaíso</option>
		            <option>Universidad Gabriela Mistral</option>
		            <option>Universidad Finis Terrae</option>
		            <option>Universidad del Desarrollo</option>
		          </select>
						</div>
						<div className="col-md-6">
							<label htmlFor="department"><h4><strong>Facultad</strong></h4></label>
							<input type="text" className="form-control" name="department" id="department" required/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<label htmlFor="schoolId"><h4><strong>Id de Universidad</strong></h4></label>
							<select className="form-control filter-id" name="schoolId" id="schoolId" onChange={this.setSchoolId}>
		            <option value="">Id de Universidad</option>
		            <option value="8o9atdgwjQ5jTXpiS">Pontificia Universidad Católica de Chile</option>
		            <option value="Lwcir4K3XYrDicGFM">Universidad de Chile</option>
		            <option value="tJk8yG2MRKYfT8CWu">Universidad Nacional Andrés Bello</option>
		            <option value="MRu7vCMffQqcCZQpA">Universidad de Los Andes</option>
		            <option value="GhESf3YNM8uPX8qu2">Universidad Adolfo Ibáñez</option>
		            <option value="C2iTbAgLY7mP3y2Xm">Universidad Diego Portales</option>
		            <option value="6mnkYDixQzvY7RpZz">Universidad Mayor</option>
		            <option value="bEXPX73dZBDAquWWz">Universidad Arturo Prat</option>
		            <option value="jPSFr5o9fyky7hdig">Universidad San Sebastián</option>
		            <option value="DRW6d7WxgqY8PD6Y7">Universidad Católica de La Santísima Concepción</option>
		            <option value="SFwYXfYd8jjjrSALd">Pontificia Universidad Católica de Valparaíso</option>
		            <option value="uzSHoAumAscyHtbn2">Universidad Gabriela Mistral</option>
		            <option value="FQdLSYcLyJK55vJ4e">Universidad Finis Terrae</option>
		            <option value="Bt2QpLQX6tvxQauKk">Universidad del Desarrollo</option>
		          </select>
						</div>
						<div className="col-md-6">
							<h4><strong>Multiple</strong></h4>
							<div className="radio radio-inline radio-success">
			        	<input type="radio" name="multiple" id="radio" value="Si" onClick={this.multipleYes}/>
							  <label htmlFor="radio">Si</label>
							</div>
							<div className="radio radio-inline radio-danger">
								<input type="radio" name="multiple" id="radio2" value="No" onClick={this.multipleNo} defaultChecked/>
							  <label htmlFor="radio2">No</label>
							</div>
						</div>
					</div>
					<button type="submit" className="btn btn-success btn-md">Agregar Profesor</button>
					}
					
				</form>
				:
				<h1>You don't belong here</h1>
				}

			</div>
			
			)
	}
});