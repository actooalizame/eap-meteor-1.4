SearchSchools = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.searchSchoolsNew,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  }
});