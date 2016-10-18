MultipleProfInfo = React.createClass({
	render(){
		let link = 'http://evaluaalprofe.cl/profesor/'+this.props.professor._id;
		return(
			<h5 className="list-group-item"><a href={link}>{this.props.professor.department}: <strong>{this.props.professor.overall}</strong></a></h5>
			)
	}
});