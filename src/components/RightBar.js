import React from 'react';
//import Addbox from './Addbox';
import Member from './Member';

const RightBar = (props) => {
  const { content } = props;
  console.log("content : ",content);
  const userList = content.map(v => <Member key={v.email} id = {v.email} name = {v.userName} img={v.profile}/>);
  return (
    <div className="mainRight">
      <div className="feedBox">
        {userList}
      </div>
    </div>
  );
};

export default RightBar;