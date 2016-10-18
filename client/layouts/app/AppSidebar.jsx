AppSidebar = React.createClass({
	componentDidMount(){

		function setHeight() {
			var windowHeight = $(window).innerHeight(),
					windowWidth = $(window).innerWidth(),
					sidebar = $('.sidebar-nav'),
					nav = $('.sidebar-nav ul'),
					links = $('.sidebar-nav li a');

			if(windowHeight<550){
				nav.css({marginTop: '3.5em'});
				links.css({'padding-bottom': '3px'});
			}
			if(windowHeight<475){
				nav.css({marginTop: '3.5em'});
				links.css({'padding-bottom': '3px', 'padding-top': '6px'});
			}
			if(windowWidth>=992){
				nav.css('min-height', windowHeight);
			}
			if(windowWidth>=992&&windowHeight>551){
				nav.css({marginTop: '5.5em'});
			}
			/*if(windowHeight>1008){
				nav.css({marginTop: '5.5em'});
			}*/
		}
	setHeight();
		/*if(windowHeight<652&&windowWidth>992){
			sidebar.css('overflow-y', 'scroll');
		}
		if(windowHeight>652){
			sidebar.css('overflow-y', 'hidden');
		}
		if(windowWidth<992){
			nav.css('min-height', windowHeight/2);
			sidebar.css('overflow-y', 'hidden');
		}
		if(windowHeight<565){
			sidebar.css('')
		}
		//$('.sidebar-nav ul').height($(document).height());
		}
		*/

		$(window).resize(function() {
		  setHeight();
		});
	},
	mixins: [ReactMeteorData],

	getMeteorData(){
		
		return {
			currentUser: Meteor.user()
		}
	},

	render(){
		return(
			<div className="sidebar-nav" id="sidebarNav">
			  <div className="navbar-inverse" role="navigation">
			    <div className="navbar-header">
			      <a href="#" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
			        <span className="brand-txt">Menu</span>
			      </a>
			      <span className="hidden-md hidden-lg text-hide logo-link"><a href="/"><img src="/images/home/logo-minii.png" alt="logo" className="img-nav img-responsive" /></a></span>
			    </div>
			    <div className="navbar-collapse collapse sidebar-navbar-collapse">
			      <ul className="nav navbar-nav ">
			        <li className="logo-link hidden"><a href="/"><img src="/images/logo.png" alt="logo" className="logo" /></a></li>
			        <li><a href="/busca-profesores/" className={FlowHelpers.currentRoute( 'buscaProfesores' )}><i className="fa fa-graduation-cap fa-3x"></i><br/><span>Profesores</span></a></li>
			        <li>
			        	<a href="/busca-universidades/" className={FlowHelpers.currentRoute( 'buscaUniversidades' )}><i className="fa fa-university fa-3x"></i><br/><span>Universidades</span></a>
			        </li>

			        <li><a href="/ranking" className={FlowHelpers.currentRoute( 'ranking' )}><i className="fa fa-line-chart fa-3x"></i><br/><span>Ranking</span></a></li>
			        {this.data.currentUser ?
			        	<li><a href="/mis-reviews" className={FlowHelpers.currentRoute( 'misReviews' )}><i className="fa fa-files-o fa-3x"></i><br/><span className="last">Mis evaluaciones</span></a></li>
			        	:
			        	<span className="hidden"></span>
			        }

			        <li className="visible-xs visible-sm"><a href="#"><LoginWrap /></a></li>
			       	
			        
			      </ul>
			    </div>
			  </div>
			</div>
			)
	}
});