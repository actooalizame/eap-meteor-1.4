SideBar = React.createClass({
	render(){
		return(
			<div className="pure-drawer" data-position="right">
		    	<nav>
						<h4 className="invisible">Evalua a tu Profe</h4>
						<ul>
							<li className="sidebar-item"><a href="/evalua-profesores/"><i className="fa fa-graduation-cap fa-3x"></i><br /><p><small>Profesores</small></p></a></li>
							<li className="sidebar-item"><a href="/evalua-universidades/"><i className="fa fa-university fa-3x"></i><br /><p><small>Universidades</small></p></a></li>
							<li className="sidebar-item"><a href="/todos-los-reviews/"><i className="fa fa-bar-chart fa-3x"></i><br /><p><small>Reviews</small></p></a></li>
							<li className="sidebar-item"><a href="/mis-reviews/"><i className="fa fa-files-o fa-3x"></i><br /><p><small>Mis Reviews</small></p></a></li>
						</ul>
					</nav>
		    </div>
			)
	}
});