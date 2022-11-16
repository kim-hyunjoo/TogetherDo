import React from 'react';

const Member = props => {
  return (
    <div className="memberBox">
      <div className="member">
        <img className={props.class} width = "70px" height= "70px"  src={props.img} />
          {/* <span className="text id">{props.id}</span> */}
          <span className="text name">{props.name}</span>
      </div>
      <a href="#" className="link">
        {props.followBtn}
      </a>
    </div>
  );
};

export default Member;