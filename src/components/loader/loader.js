import React from 'react';
import './loader.css';

const Loader = ({ loadingMessage }) => {
    return (
        <div className="ui segment show-loader">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">{loadingMessage}</div>
          </div>
          <p></p>
          <p></p>
          <p></p>
        </div>
    );
}

export default React.memo(Loader);
