import React from 'react';
import PropTypes from 'prop-types';

/*///
 COMPONENT
*////
const Main = (props) => {
  return (
    <div>
      <div>
        <h3>Bubble Chart of Top Searched Artists</h3>
      </div>
      {props.children}
      <div>
        <pre className="footer-text">
          <span className="glyphicon glyphicon-wrench" aria-hidden="true" />  J R Leja Design NYC    |    Jasiu Leja    |    2017
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
