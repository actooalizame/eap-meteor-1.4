CommentSchool = React.createClass({
	render(){
		return(
			<div>
				<div className="col-sm-5">
		  		<label htmlFor="comment"><h3>Esta es tu oportunidad de ser más específico</h3></label>
		  	</div>
		  	<div className="col-sm-offset-2 col-sm-5">
	        <textarea name="comment" id="comment" className="form-control" defaultValue={this.props.comment}></textarea>   
			  </div>
			</div>
			)
	}
});