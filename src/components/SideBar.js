import ExtraEvent from "./ExtraEvent";

const SideBar = (props) => {
    const {extraEventArr, extraEventDelete, extraEventAdd, extraEventRef} = props;
 return(
    <ExtraEvent 
    extraEventArr = {extraEventArr}
    extraEventDelete={extraEventDelete}
    extraEVentAdd={extraEventAdd}
    extraEventRef={extraEventRef}
    />
    //오늘 안한 중요한 일!!!
    //오늘 안한일들 쭉 출력해주면서 핀되어있는 일은 중요도 높다고 알려주기
    //검색기능?
    //타이틀검색시 그 타이틀이 포함된 event의 날짜&시간이 보여지도록
    //마이페이지에서 나에게 달린 댓글 볼 수 있도록하기 약간 방명록 느낌..?
    //friend에 뜨는 calendar는 sidebar안보이도록 하고, calendar접근 못하도록 만들기(editable같은속성을 false)
    //.css
    //차라리 friends쪽에서 팔로잉 목록을 왼쪽에 띄우고, 오른쪽에 방명록(스크롤가능하게) 만들어놓고 그 유저data에 방명록이 저장되도록 하는게 어떨까...
    )
}

export default SideBar;