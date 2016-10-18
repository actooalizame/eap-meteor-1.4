FoldSearch = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		
		return {
			currentUser: Meteor.user()
		}
	},

	/*componentDidMount(){
		 
	  function setHeight() {
	    var windowHeight = $(window).innerHeight(),
	      wrapper = $('.intro-block');
	    wrapper.css('height', windowHeight);
	  }

	  setHeight();
	},*/

	render(){
		return(
			<div>
				<div className="row dark-bg">
					<div className="col-sm-6 col-lg-5 col-lg-offset-1">
						<img className="img-responsive fold-img" src="/images/home/logo-eap.png" alt=""/>
					</div>
					<div className="col-sm-6 hidden-xs">
						<img className="img-responsive fold-img" src="/images/home/banner-evalua-al-profe.jpg" alt=""/>
					</div>
				</div>

				<div className="row fold-search">
					<div className="col-sm-12">
						<SearchProfessors />
					</div>
					
					<div className="col-sm-12">
						{this.data.currentUser ?
							<h4><a className="btn btn-lg btn-rate center-block brand-txt" href="/ranking">¡ Ver Ranking !</a></h4>
							:
							<div className="login-front">
								<h3 className="text-center">Inicia sesión con Facebook para entrar al sitio</h3>
								<div className="col-md-offset-5">
									<LoginWrap />
								</div>
							</div>
						}
					</div>
				</div>
						
			</div>
			)
	}
});