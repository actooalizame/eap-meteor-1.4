var Masonry = require('react-masonry-component');
var LoadingSpin = require('react-loading-animation');

RankingProfessors = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState() {
    return {
      spinning: false,
      filter: undefined,
      showDepartment: false,
      //reverseSort: false
    }
  },
	
	getMeteorData(){
		Session.setDefault('filter', undefined);
		Session.setDefault('reverseSort', false);

		var filter = this.state.filter,
				reverseSort = Session.get('reverseSort');

		if(filter==undefined){
      var query = {voted: true,votes:{$gte:2}}
    }
    if(filter!==undefined){
      var query = {voted: true,schoolName:filter};
    }

		if (reverseSort==true){
			var order = 1
		}
		if (reverseSort==false){
			var order = -1
		}

		return {
			professors: Professors.find(query,{sort:{overall:order}}).fetch()
		}
	},

	componentWillUnmount(){
		Session.set('algo','nombre');
		Session.set('reverseSort', false);
	},

	getProfessors(){
		return this.data.professors.map((professor) =>{
      return <ProfessorList key={professor._id} professor={professor} sortValue={this.state.sortValue} showDepartment={this.state.showDepartment} />
    });
	},

	filterProf(){
		var selected = jQuery('.filter-professors').val();
    if(selected!==''){
      this.setState({filter: selected});
    }
    var $this = this;
		$this.setState({
			spinning:true,
			showDepartment: true
		});
		var close = function(){ $this.setState({spinning:false}); }
		Meteor.setTimeout(close, 600);
		Session.set('algo','nombre');
	},

	clearFilter(){
		this.setState({filter:undefined});
		jQuery('.filter-professors').val('');
		var $this = this;
		$this.setState({
			spinning:true,
			showDepartment: false
		});
		var close = function(){ $this.setState({spinning:false}); }
		Meteor.setTimeout(close, 600);
		Session.set('algo','nombre');
	},

	reverseSort(){
		let reverseSort = Session.get('reverseSort');
		Session.set('reverseSort', !reverseSort);
		var $this = this;
		$this.setState({
			spinning:true,
		});
		var close = function(){ $this.setState({spinning:false}); }
		Meteor.setTimeout(close, 600);
		
		Session.set('algo','nombre');
	},

	sortButton(){
		let reverseSort = Session.get('reverseSort');
		if(reverseSort==true){ return <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>}
		if(reverseSort==false){ return <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>}
	},

	sortBy(sortValue){
		Session.set('algo',sortValue);
	},
	render(){
		var masonryOptions = {
	    itemSelector: '.table-like__item',
	    layoutMode: 'vertical',
	    getSortData: {
	      name: '.name',
	      symbol: '.symbol',
	      number: '.number',
	      help: '.help',
	      clarity: '.clarity',
	      easy: '.easy'
	    },
	    fitRows: {
        gutter: 7
      }
		};
		return(
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-7 col-lg-6">
							<div className="btn-group sort-by-button-group" role="group">
							  
							  <button className="btn" data-sort-value="symbol" onClick={()=>this.sortBy('promedio')}>Promedio</button>
							  <button className="btn" data-sort-value="help" onClick={()=>this.sortBy('ayuda')}>Ayuda</button>
							  <button className="btn" data-sort-value="clarity" onClick={()=>this.sortBy('claridad')}>Claridad</button>
							  <button className="btn" data-sort-value="easy" onClick={()=>this.sortBy('facilidad')}>Facilidad</button>
							  <button className="btn" data-sort-value="number" onClick={()=>this.sortBy('votos')}>Populares</button>
							</div>
		        </div>
		        <div className="col-md-1">
		        	<button className="btn btn-info" onClick={this.reverseSort}>{this.sortButton()}</button>
		        </div>
						<div className="col-md-3">
							<select className="form-control filter-professors" onChange={this.filterProf}>
		            <option value="">Elige universidad</option>
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
						<div className="col-lg-2 col-md-12 col-md-offset-5 col-lg-offset-0">
							{this.state.filter!==undefined ? <button className="btn btn-warning" onClick={this.clearFilter}>Borrar Filtro</button> : <span></span> }
						</div>
		      </div>
	      </div>

	      <div className="row">
	      	<div className="col-md-12">
	      			
	      			{this.state.spinning ?
	      				<LoadingSpin style={{ display: this.state.spinning ? 'block' : 'none' }}/>
	      			: 
	      				<div>
		      				
		      					<Masonry
						          className={'table-like'} 
						          elementType={'ul'}
						          options={masonryOptions}

						        >
						        
							        {this.data.professors.length>0 ?
							        <div>
							         	{this.getProfessors()}
							        </div>
							        :
			      					<h2 className="text-center brand-txt">La universidad {this.state.filter} aún no posee profesores evaluados</h2>
			      					}
			      				
						      	</Masonry>
		      			</div>
				      }
			      									
	      	</div>
				</div>
			</div>
			)
	}
});