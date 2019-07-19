class Menu extends React.Component {
  render() {
    return (
      <nav className="menu">
        <ul>
          <li className="lightBlue"><MenuItem text="Contact & Social Media" link="aboutme.html" /></li>
          <li className="veryBlue"><MenuItem text="Github Profile & Contributions" link="aboutme.html" /></li>
          <li className="darkBlue"><MenuItem text="Thomas Wade Denton III" link="aboutme.html" /></li>
          <li className="lightBlue"><MenuItem text="Projects & Showcase" link="aboutme.html" /></li>
          <li className="veryBlue"><MenuItem text="Download Resume" link="aboutme.html" /></li>
        </ul>
      </nav>
    );
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <a href={this.props.link} className="menu-item-link">
        <span className="menu-item-text">{this.props.text}</span>
      </a>
    );
  }
}

ReactDOM.render(
  <Menu />,
  document.body
);
