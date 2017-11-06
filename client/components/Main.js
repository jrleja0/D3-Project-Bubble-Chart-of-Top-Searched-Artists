import React from 'react';
import PropTypes from 'prop-types';

/*///
 COMPONENT
*////
const Main = (props) => {
  return (
    <div>
      <div>
        <h1>Top 20 Most Searched Artists, Sept 2017</h1>
      </div>
      {props.children}
      <div>
        <pre className="footer-text">
          <i className="fa fa-wrench" aria-hidden="true" />  J R Leja Design NYC    |    Jasiu Leja    |    2017
        </pre>
      </div>
    </div>
  );
};

export default Main;

/*///
 PROP TYPES
*////
Main.propTypes = {
  children: PropTypes.object,
};
