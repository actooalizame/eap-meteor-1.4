ProfessorList = React.createClass({

	mixins: [ReactMeteorData],

	
	getMeteorData(){
		Session.setDefault('algo', 'nombre');

		return {
			algo: Session.get('algo')
			
		}
	},

	handleLayoutComplete(){
		var $grid = $('.table-like').isotope({
	    itemSelector: '.table-like__item',
	    layoutMode: 'vertical',
	    getSortData: {
	      name: '.name',
	      symbol: '.symbol',
	      number: '.number',
	      help: '.help',
	      clarity: '.clarity',
	      easy: '.easy'
	    }
	  });

	  // bind sort button click
	  $('.sort-by-button-group').on( 'click', 'button', function() {
	    //var sortValue = ($(this).attr('data-sort-value')).toString();
	    var sort = ($(this).attr('data-sort-value')).toString(),
	    		reverseSort = Session.get('reverseSort');
	    $grid.isotope({
	    	sortBy: sort,
	    	sortAscending: {
			    name: !reverseSort,
			    symbol: reverseSort,
			    number: reverseSort,
			    help: reverseSort,
			    clarity: reverseSort,
			    easy: reverseSort
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
		this.handleLayoutComplete();
	},

 
	smartDisplay(){
		let sortValue = this.data.algo;
		if(sortValue==='nombre'){
			return(
				<ul className="col-md-8 col-sm-9 col-xs-12">
					<li className="scores">
						<h5 className="symbol col-sm-3"><small>Promedio: </small><span className="red">{this.props.professor.overall}</span></h5>
						<h5 className="help col-sm-2"><small>Ayuda: </small><span>{this.props.professor.help}</span></h5>
						<h5 className="clarity col-sm-2"><small>Claridad: </small><span>{this.props.professor.clarity}</span></h5>
						<h5 className="easy col-sm-3"><small>Facilidad: </small><span>{this.props.professor.easy}</span></h5>
						<h5 className="number col-sm-2"><small>Reviews: </small><span>{this.props.professor.votes}</span></h5>
					</li>
			
				</ul>
				
				)
		}
		if (sortValue==='promedio'){
			return <div className="symbol col-sm-3 col-sm-offset-4"><h3><small>Promedio: </small><span>{this.props.professor.overall}</span></h3></div>
		}
		if (sortValue==='ayuda'){
			return <div className="help col-sm-3 col-sm-offset-4"><h3><small>Ayuda: </small><span>{this.props.professor.help}</span></h3></div>
		}
		if (sortValue==='claridad'){
			return <div className="clarity col-sm-3 col-sm-offset-4"><h3><small>Claridad: </small><span>{this.props.professor.clarity}</span></h3></div>
		}
		if (sortValue==='facilidad'){
			return <div className="easy col-sm-3 col-sm-offset-4"><h3><small>Facilidad: </small><span>{this.props.professor.easy}</span></h3></div>
		}
		if (sortValue==='votos'){
			return <div className="number col-sm-3 col-sm-offset-4"><h3><small>Reviews: </small><span>{this.props.professor.votes}</span></h3></div>
		}
	},

	formatDepartment(){
		let departments = this.props.professor.department,
				multiple = this.props.professor.multiple;
		if(multiple==true){
			return departments.join(', ');
		}
		if(multiple==false){
			return this.props.professor.department;
		}
	},

	render(){
		let link = '/profesor/'+this.props.professor._id,
				sortValue = this.props.sortValue;
		return(
				<li className="table-like__item">
					<div className="name col-md-4 col-sm-3 col-xs-12">
						<h4><a href={link}>{this.props.professor.name}</a></h4>
						{this.props.showDepartment ?
							<p>{this.formatDepartment()}</p>
						:
							<p>{this.props.professor.schoolName}</p>
						}
						
					</div>

					{this.smartDisplay()}
				</li>
			)
	}
});