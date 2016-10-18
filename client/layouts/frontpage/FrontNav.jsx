FrontNav = React.createClass({

	componentDidMount(){
		$('.nav a').on('click', function(){ 
        if($('.navbar-toggle').css('display') !='none'){
            $('.navbar-toggle').click()
        }
    });
	},

	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			user: Meteor.user()
		}
	},

	render(){
		return(
			<nav className="navbar navbar-fixed-top navbar-transparent bg-color1 dark-bg">
				<div className="container"> <a data-scroll className="navbar-brand" href="/"></a>
					<button className="round-toggle navbar-toggle menu-collapse-btn collapsed" data-toggle="collapse" data-target=".navMenuCollapse"> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
					<div className="navbar-collapse navMenuCollapse collapse">
						<ul className="nav">
							<li><a data-scroll className="brand-txt" href="#evaluar">Evaluar</a></li>
							<li><a data-scroll className="brand-txt" href="#que-es">¿Qué es?</a></li>
							<li><a data-scroll className="brand-txt" href="#faq">Preguntas</a></li>
							<li><a data-scroll className="brand-txt" href="#contacto">Contacto</a></li>
							{this.data.user ?
								<li><a className="login-nav" href="#"><LoginWrap /></a></li>
								:
								''
							}
							
						</ul>
					</div>
				</div>
			</nav>
			)
	}
});