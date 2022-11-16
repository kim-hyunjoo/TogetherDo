import React from 'react';
//import Addbox from './Addbox';
import Member from './Member';

const RightBar = (props) => {
  const { content } = props;
  console.log("content : ",content);
  const userList = content.map(v => <Member id = {v.id} name = {v.user_name} img={v.imageUrls}/>);
  return (
    <div className="mainRight">
      <div className="feedBox">
        {userList}
      </div>
    </div>
  );
};

export default RightBar;