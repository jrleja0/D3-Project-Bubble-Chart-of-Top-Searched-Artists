import React from 'react';
import makeChart from '../d3Scripts';

/*///
 COMPONENT
*////
class Main extends React.Component {

  componentDidMount() {
    makeChart();
  }

  render() {
    return (
      <div>
        <p>Top 20 Artists</p>
        <svg width="1000" height="1000" textAnchor="middle" />
      </div>
    );
  }
}

export default Main;
