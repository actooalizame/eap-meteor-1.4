Filters = React.createClass({

	getIndex(){
		professorsIndex: () => ProfessorsIndex;
	},

	getInitialState() {
    return {
      getSchoolName: 'Todas las universidades'
    }
  },

	smartHide(){
		if(this.state.getSchoolName!=='Todas las universidades'){
			return 'btn btn-sm btn-info btn-filter'
		} else {
			return 'hidden'
		}

	},

	getOption(e){
		let selected = $(e.target).val();
		ProfessorsIndex.getComponentMethods().addProps('schoolName', selected);
		if(selected==='Pontificia Universidad Católica de Chile'){this.setState({getSchoolName:selected})}
		if(selected==='Universidad de Chile'){this.setState({getSchoolName:selected})}
		if(selected==='Universidad de Los Andes'){this.setState({getSchoolName:selected})}
		if(selected==='Universidad Diego Portales'){this.setState({getSchoolName:selected})}
		if(selected==='Universidad Mayor'){this.setState({getSchoolName:selected})}
	},

	clearFilter(){
		ProfessorsIndex.getComponentMethods().addProps('schoolName',undefined);
		this.setState({getSchoolName:'Todas las universidades'})
		jQuery('.filters').val('default');
	},

	render(){
		return(
			<div className="row">
				<div className="col-sm-12 col-xs-10 text-center">
					<select className="filters" onChange={this.getOption}>
						<option value='default'>- Selecciona una universidad -</option>
				    <option>Pontificia Universidad Católica de Chile</option>
				    <option>Universidad de Chile</option>
				    <option>Universidad de Los Andes</option>
				    <option>Universidad Diego Portales</option>
				    <option>Universidad Mayor</option>
				  </select>
			  	<h4 className="find-pf-headline">Buscando profesores en: {this.state.getSchoolName}</h4>
			  	<button className={this.smartHide()} onClick={this.clearFilter}>Ver todos</button>
			  </div>
			</div>
			
			)
	}
});