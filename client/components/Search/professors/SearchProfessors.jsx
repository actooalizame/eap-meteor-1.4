FilterSubsHome = new SubsManager();

SearchProfessors = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData(){
    let selected = Session.get('filterSchool');
    if(selected!==undefined){
      FilterSubsHome.subscribe('filteredProf',selected);
    }
    return {
      selected: selected
    }
  },

  componentDidMount() {
    this.view = Blaze.render(Template.searchProfessorsNew,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  }
});
