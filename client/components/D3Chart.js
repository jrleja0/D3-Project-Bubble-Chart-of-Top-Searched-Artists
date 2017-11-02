import React from 'react';
import makeBubbleChart from '../d3ScriptsBubbleChart';
import makeTreeMap from '../d3ScriptsTreeMap';

/*///
 COMPONENT
*////
class Main extends React.Component {

  componentDidMount() {
    //makeBubbleChart();
    makeTreeMap();
  }

  render() {
    return (
      <div>
        <p className="chart-type">Bubble Chart</p>
        <svg width="1200" height="1200" textAnchor="middle" />
      </div>
    );
  }
}

export default Main;
