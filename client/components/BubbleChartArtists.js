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
        <svg width="1200" height="1200" textAnchor="middle" />
      </div>
    );
  }
}

export default Main;
