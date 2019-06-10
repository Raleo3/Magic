import React from 'react';
import './messageSegment.css';

const MessageSegment = ({ messageText }) => {
    return (
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <div>
                <i className="close icon"></i>
                <i className="magic icon"></i>
            </div>
            {messageText}
          </div>
        </div>
    );
}

export default React.memo(MessageSegment);
