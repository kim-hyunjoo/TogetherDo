import React from 'react';
//import Addbox from './Addbox';
import Member from './Member';

const RightBar = (props) => {
  const { content } = props;

  return (
    <div className="mainRight">
      <div className="feedBox">
        {content.map(v => 
        <Member key={v.email} id = {v.email} name = {v.userName} img={v.profile}/>
        )}
      </div>
    </div>
  );
};

export default RightBar;