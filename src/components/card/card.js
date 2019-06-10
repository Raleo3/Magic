import React from 'react';

const Card = props => {
    const {name, imageUrl, setName, originalType, artist} = props.card;

    return (
        <div className="ui card single-card">
          <div className="image">
            <img alt={name} src={imageUrl} />
          </div>
          <div className="content">
            <h3 className="header">{name}</h3>
            <div className="description">
                <div className="set-name">
                  Set: {setName}
                </div>
                <div className="original-type">
                  Original Type: {originalType}
                </div>
            </div>
          </div>
          <div className="extra content">
            <span>Artist: {artist}</span>
          </div>
        </div>
    );
}

export default React.memo(Card);
