SchoolsList = React.createClass({

	mixins: [ReactMeteorData],

	
	getMeteorData(){
		Session.setDefault('sortisValue', 'name');

		return {
			sortisValue: Session.get('sortisValue')
			
		}
	},

	handleLayoutComplete2(){
		var $grid = $('.table-like-2').isotope({
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
	    },
	  });

	  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if(e.target.hash == '#universidades') {
          $grid.isotope();
        }
    });


	  // bind sort button click
	  $('.sort-by-button-group-2').on( 'click', 'button', function() {
	    //var sortisValue = ($(this).attr('data-sort-value')).toString();
	    var sort = ($(this).attr('data-sort-value')).toString();
	    $grid.isotope({
	    	sortBy: sort,
	    	sortAscending: {
			    name: false,
			    overall: false,
			    reputation: false,
			    location: false,
			    opportunities: false,
			    library: false,
			    infrastructure: false,
			    internet: false,
			    food: false,
			    social: false,
			    sports: false,
			    happiness: false,
			    votes: false
			  }
	    });
	  });
	  // change is-checked class on buttons
	  $('.button-group').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', 'button', function() {
	      $buttonGroup.find('.is-checked').removeClass('is-checked');
	      $( this ).addClass('is-checked');
	    });
	  });
	},

	componentDidMount(){
		this.handleLayoutComplete2();

	},

 
	smartDisplay(){
		let sortisValue = this.data.sortisValue;
		if(sortisValue==='name'){
			return(
		
					<ul className="col-sm-3">
						<li className="overall-2"><h3><small>Promedio: </small><span>{this.props.school.overall}</span></h3></li>
						<li className="scores hidden">
							<h5 className="reputation"><small>Reputacion: </small><span>{this.props.school.reputation}</span></h5>
							<h5 className="location"><small>Ubicacion: </small><span>{this.props.school.location}</span></h5>
							<h5 className="opportunities"><small>Oportunidades: </small><span>{this.props.school.oportunidades}</span></h5>
							<h5 className="library"><small>Biblioteca: </small><span>{this.props.school.library}</span></h5>
							<h5 className="infrastructure"><small>Infraestructura: </small><span>{this.props.school.infrastructure}</span></h5>
							<h5 className="internet"><small>Internet: </small><span>{this.props.school.internet}</span></h5>
							<h5 className="food"><small>Comida: </small><span>{this.props.school.food}</span></h5>
							<h5 className="social"><small>Actividades: </small><span>{this.props.school.activities}</span></h5>
							<h5 className="sports"><small>Deportes: </small><span>{this.props.school.sports}</span></h5>
							<h5 className="happiness"><small>Felicidad: </small><span>{this.props.school.happiness}</span></h5>
							<h5 className="votes"><small>Populares: </small><span>{this.props.school.votes}</span></h5>
						</li>
				
					</ul>
				)
		}
		if (sortisValue==='overall'){
			return <div className="overall-2 col-sm-3"><h3><small>Promedio: </small><span>{this.props.school.overall}</span></h3></div>
		}
		if (sortisValue==='reputation'){
			return <div className="reputation col-sm-3"><h3><small>Reputacion: </small><span>{this.props.school.reputation}</span></h3></div>
		}
		if (sortisValue==='location'){
			return <div className="location col-sm-3"><h3><small>Ubicacion: </small><span>{this.props.school.location}</span></h3></div>
		}
		if (sortisValue==='opportunities'){
			return <div className="easy col-sm-3"><h3><small>Oportunidades: </small><span>{this.props.school.oportunidades}</span></h3></div>
		}
		if (sortisValue==='library'){
			return <div className="library col-sm-3"><h3><small>Biblioteca: </small><span>{this.props.school.library}</span></h3></div>
		}

		if (sortisValue==='infrastructure'){
			return <div className="infrastructure col-sm-3"><h3><small>Infraestructura: </small><span>{this.props.school.infrastructure}</span></h3></div>
		}
		if (sortisValue==='internet'){
			return <div className="internet col-sm-3"><h3><small>Internet: </small><span>{this.props.school.internet}</span></h3></div>
		}
		if (sortisValue==='food'){
			return <div className="food col-sm-3"><h3><small>Comida: </small><span>{this.props.school.food}</span></h3></div>
		}

		if (sortisValue==='social'){
			return <div className="social col-sm-3"><h3><small>Actividades: </small><span>{this.props.school.activities}</span></h3></div>
		}
		if (sortisValue==='sports'){
			return <div className="sports col-sm-3"><h3><small>Deportes: </small><span>{this.props.school.sports}</span></h3></div>
		}
		if (sortisValue==='happiness'){
			return <div className="happiness col-sm-3"><h3><small>Felicidad: </small><span>{this.props.school.happiness}</span></h3></div>
		}
		if (sortisValue==='votes'){
			return <div className="votes col-sm-3"><h3><small>Populares: </small><span>{this.props.school.votes}</span></h3></div>
		}
	},

	render(){
		let link = '/universidad/'+this.props.school._id,
				sortisValue = this.props.sortisValue;
		return(
				<li className="table-like__item-2">
					<div className="name col-xs-6">
						<h4><a href={link}>{this.props.school.name}</a></h4>
						<p>{this.props.school.schoolName}</p>
					</div>

					{this.smartDisplay()}
				</li>
			)
	}
});