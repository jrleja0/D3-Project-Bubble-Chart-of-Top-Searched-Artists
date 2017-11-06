import React from 'react';
import makeBubbleChart from '../d3ScriptsBubbleChart';
import makePlainList from '../d3ScriptsPlainList';
import makeTreeMap from '../d3ScriptsTreeMap';

/*///
 COMPONENT
*////
class Main extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    makeTreeMap();
    makeBubbleChart();
    makePlainList();
  }

  handleClick(event) {
    const svgs = [...document.getElementsByTagName('svg')];
    svgs.forEach(svg => {
      const displayState = svg.id === 'svg' + event.target.id ? 'block' : 'none';
      svg.style.display = displayState;
    });
    const buttons = [...document.getElementsByTagName('button')];
    buttons.forEach(button => {
      const selectedState = button.id === event.target.id ? 'button-selected' : '';
      button.className = selectedState;
    });
  }

  render() {
    return (
      <div>
        <p>Click on an artist's name to search for them on Google. Artist search data from <a href="http://www.artnet.com/artists/top-300-artists/">artnet</a>.
        </p>
        <div className="div-chart-type-menu-buttons">
          <span className="span-display-as">Display as:</span>
          <button id="TreeMap" className="button-selected" onClick={this.handleClick}>Tree Map</button>
          <button id="BubbleChart" className="" onClick={this.handleClick}>Bubble Chart</button>
          <button id="PlainList" className="" onClick={this.handleClick}>Artist List</button>
          <div className="line-horiz" />
        </div>
        <svg id="svgTreeMap" width="1200" height="1200" textAnchor="middle" display="block" />
        <svg id="svgBubbleChart" width="1200" height="1200" textAnchor="middle" display="none" />
        <svg id="svgPlainList" width="600" height="2400" textAnchor="left" display="none" />
      </div>
    );
  }
}

export default Main;
