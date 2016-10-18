AppLayout = React.createClass({
	componentDidMount(){
	function setHeight() {
		var windowHeight = $(window).innerHeight(),
				wrapper = $('.app-wrapper');
		wrapper.css('min-height', windowHeight);
		}
		setHeight();
		$(window).resize(function() {
		  setHeight();
		});
	},


	render(){
		return(
			<div className="app-wrapper">
					
					<AppTopbar />

					<div className="col-sm-12" id="sidebar">
						<AppSidebar />
					</div>
					
					<div className="col-md-11 col-md-offset-1">
						{this.props.content}
					</div>
      		
			</div>
			)
	}
});