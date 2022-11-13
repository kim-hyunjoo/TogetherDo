import React from 'react';
//import Addbox from './Addbox';
import Member from './Member';

const RightBar = () => {
  return (
    <div className="mainRight">
      <div className="feedBox">
        <Member
          id="hasang0.0"
          class="myProfile"
          name="하상원"
          //image="images/sangwon/mypic.jpeg"
        />
      </div>
      <div className="boxes">
        <div className="addLine">
          <span className="text type1">스토리</span>
          <a className="seeAll">
            <span className="text">모두보기</span>
          </a>
        </div>
        <Member
          id="id1"
          class="profile"
          name="사람1"
          //image="images/sangwon/pic1.jpg"
        />
        <Member
          id="id2"
          class="profile"
          name="사람2"
          //image="images/sangwon/pic1.jpg"
        />
        <Member
          id="id3"
          class="profile"
          name="사람3"
          //image="images/sangwon/pic1.jpg"
        />
      </div>

      <div className="boxes">
        <div className="addLine">
          <span className="text type1">회원님을 위한 추천</span>
          <a className="seeAll">
            <span className="text">모두보기</span>
          </a>
        </div>

        <Member
          id="id4"
          name="사람4"
          class="profile"
          //image="images/sangwon/pic1.jpg"
          followBtn="팔로우"
        />
        <Member
          id="id5"
          name="사람5"
          class="profile"
          //image="images/sangwon/pic1.jpg"
          followBtn="팔로우"
        />
      </div>
      {/* <Addbox /> */}
    </div>
  );
};

export default RightBar;