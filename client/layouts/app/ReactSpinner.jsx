ReactSpinner = React.createClass({
	componentDidMount() {
    this.view = Blaze.render(Template.spinnercont,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  },
});