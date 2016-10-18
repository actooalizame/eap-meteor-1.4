AppTopbar = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		
		return {
			currentUser: Meteor.user()
		}
	},

	getTitle(){
		let routeName = FlowRouter.getRouteName()
		if(routeName=='todosLosReviews'){return( <h3 className="app-title"><i className="fa fa-files-o title-icon"></i> <span>Reviews</span></h3>)}
		if(routeName=='misReviews'){return( <h3 className="app-title"><i className="fa fa-file-o title-icon"></i> <span>Mis Reviews</span></h3>)}
		if(routeName=='infoProfesor'){return( <h3 className="app-title"><i className="fa fa-bar-chart title-icon"></i> <span>Evaluaciones</span></h3>)}
	},

	render(){
		return(
			<nav className="navbar navbar-inverse navbar-fixed-top app-topbar">
					  
		    <div className="navbar-header">
		      <a className="navbar-brand" href={FlowRouter.path('home')} >
		        <img alt="Logo ETP" className="img-nav" src='/images/home/logo-new.png' />
		      </a>
		      {this.getTitle()}
		    </div>
		    <ul className="nav navbar-nav navbar-right">
	        <li><a href="https://www.facebook.com/evaluaalprofe/" target="_blank"><i className="fa fa-facebook-official fa-2x"></i></a></li>
	        <li><a href="https://www.instagram.com/evalua_al_profe/" target="_blank"><i className="fa fa-instagram fa-2x"></i></a></li>
	        {this.data.currentUser ?
	        	<li className="dropdown">
		          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user fa-2x"></i> <i className="fa fa-caret-down"></i></a>
		          <ul className="dropdown-menu">
		            <li><a href="#"><LoginWrap /></a></li>
		          </ul>
		        </li>
		        :
		        <li className="dropdown">
		          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <i className="fa fa-caret-down"></i></a>
		          <ul className="dropdown-menu">
		            <li><a href="#"><LoginWrap /></a></li>
		          </ul>
		        </li>
	        }
	        
	      </ul>
		    
			</nav>
			)
	}
});