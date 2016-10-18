NewFilters = React.createClass({

	componentDidMount() {
    this.view = Blaze.render(Template.filteredProfessors,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  },

  /*mixins: [ReactMeteorData],

  getMeteorData(){
    let schoolName = Session.get('filterSchool');
    if(schoolName!==undefined){
      Meteor.subscribe('topProfessorsSchool', schoolName);
    }
    return {
      topProfessors: Professors.find({'schoolName':filter, 'voted':true}, {sort:{'overall':-1},limit:5})
    }
  },*/
});