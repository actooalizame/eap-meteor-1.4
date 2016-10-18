Recommend = React.createClass({

	componentWillMount(){
		Session.setDefault('recommend', undefined);
	},

	componentWillUnmount(){
		Session.set('recommend', undefined);
	},

	recommendYes(){
		Session.set('recommend', 'Si');
	},

	recommendNo(){
		Session.set('recommend', 'No');
	},

	getOptions(){
		return(
				<div>
					<div className="radio radio-inline radio-success">
	        	<input type="radio" name="recommend" id="radio3" value="Si" onClick={this.recommendYes}/>
					  <label htmlFor="radio3"><h3 className="brand-txt">Si</h3></label>
					</div>
					<div className="radio radio-inline radio-danger">
						<input type="radio" name="recommend" id="radio4" value="No" onClick={this.recommendNo} />
					  <label htmlFor="radio4"><h3 className="brand-txt">No</h3></label>
					</div>
				</div>
			)
	},

	render(){
		return(
			<div>
				<div className="col-sm-4">
		  		<label htmlFor="recommend"><h3>¿Recomendarías el profesor a otro alumno?</h3></label>
		  	</div>
		  	{this.props.recommend ?
		  		<div>
			  		<div className="col-sm-4">
			  			<h4 className="text-center">Elegiste: <strong>{this.props.recommend}</strong></h4>
			  		</div>
			  		<div className="col-sm-offset-4">
			        {this.getOptions()}
					  </div>
					</div>
		  		:
		  		<div className="col-md-offset-5 col-sm-offset-4 col-md-3 col-sm-4">
		        {this.getOptions()}
				  </div>
		  	}
		  	
			</div>
		)
	}
});