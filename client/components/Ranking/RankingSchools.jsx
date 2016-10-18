var Masonry = require('react-masonry-component');

RankingSchools = React.createClass({
	mixins: [ReactMeteorData],


	getMeteorData(){

		return {
			schools: Schools.find({voted: true},{sort:{overall:-1}}).fetch()
		}
	},

	componentWillUnmount(){
		Session.set('sortisValue','name');
	},

	getSchools(){
		return this.data.schools.map((school) =>{
      return <SchoolsList key={school._id} school={school} />
    });
	},

	sortBy(sortisValue){
		Session.set('sortisValue',sortisValue);
	},
	render(){
		var masonryOptions = {
	    itemSelector: '.table-like__item-2',
	    layoutMode: 'vertical',
	    getSortData: {
	    	name: '.name',
	    	overall: '.overall-2',
	      reputation: '.reputation',
	      location: '.location',
	      opportunities: '.opportunities',
	      library: '.library',
	      infrastructure: '.infrastructure',
	      internet: '.internet',
	      food: '.food',
	      social: '.social',
	      sports: '.sports',
	      happiness: '.happiness',
	      votes: '.votes'
	    }
		};
		return(
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="">
							<div className="btn-group sort-by-button-group-2" role="group">
							  
							  <button className="btn btn-xs" data-sort-value="overall" onClick={()=>this.sortBy('overall')}>Promedio</button>
							  <button className="btn btn-xs" data-sort-value="reputation" onClick={()=>this.sortBy('reputation')}>Reputacion</button>
							  <button className="btn btn-xs" data-sort-value="location" onClick={()=>this.sortBy('location')}>Ubicacion</button>
							  <button className="btn btn-xs" data-sort-value="opportunities" onClick={()=>this.sortBy('opportunities')}>Oportunidades</button>
							  <button className="btn btn-xs" data-sort-value="library" onClick={()=>this.sortBy('library')}>Biblioteca</button>
							  <button className="btn btn-xs" data-sort-value="infrastructure" onClick={()=>this.sortBy('infrastructure')}>Infraestructura</button>

							  <button className="btn btn-xs" data-sort-value="internet" onClick={()=>this.sortBy('internet')}>Internet</button>
							  <button className="btn btn-xs" data-sort-value="food" onClick={()=>this.sortBy('food')}>Comida</button>
							  <button className="btn btn-xs" data-sort-value="social" onClick={()=>this.sortBy('social')}>Actividades</button>
							  <button className="btn btn-xs" data-sort-value="sports" onClick={()=>this.sortBy('sports')}>Deportes</button>
							  <button className="btn btn-xs" data-sort-value="happiness" onClick={()=>this.sortBy('happiness')}>Felicidad</button>
							  <button className="btn btn-xs" data-sort-value="votes" onClick={()=>this.sortBy('votes')}>Populares</button>
							</div>
		        </div>
		      </div>
	      </div>
	      <div className="row">
	      	<div className="col-md-12">
	      		
    				<div>
      				
    					<Masonry
			          className={'table-like-2'} // default ''
			          elementType={'ul'} // default 'div'
			          options={masonryOptions} // default {}

			        >
			        
				       
			        <div>
			         	{this.getSchools()}
			        </div>
				        
      				
			      	</Masonry>

      			</div>
	      			
	      	</div>
				</div>
			</div>
			)
	}
});