import { useForm } from "react-hook-form";
import styled from 'styled-components';
import "../styles/Login.css"
import { Link } from 'react-router-dom';
import { useEffect } from "react";

const SubmitWrapper = styled.div`
	margin-top: 1rem;
	padding-top: 0.6rem;
	padding-bottom: 0.5rem;

	background: #BCC0F2;
	color: white;

	text-align: center;
	font-size: 1.25rem;
	font-weight: 500;

	cursor: pointer;
	user-select: none;
	transition: .2s all;

    &:hover {
        background: #BCC0F2;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }

    &:active {
        background: #BCC0F2;
    }
`;
const StyledLink = styled(Link)`
    color: #868e96;
    font-size: 1.25rem;
    &:hover {
        color: #495057;
    }
`;

const LoginForm = (props) => {
    const { loginUser, saveUser, setLoginUser, setChanged, setLoginChecked } = props;
    //console.log("saveUser : ",saveUser);
    
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const onSubmit = (data) => {
		//console.log(data);
		setLoginUser(data);
	}
    const signUp = () => {
        setChanged(false);
        console.log("clicked!!");
    }
    useEffect(()=>{
        console.log(loginUser)
        if(saveUser.length == 0){
            console.log("회원가입한 유저가 없습니다 회원가입을 먼저 해주십시오");
        }else{
            saveUser.map((users) => {
                if(users.email === loginUser.email && users.passward === loginUser.passward) {
                    console.log("계정이 일치합니다.");
                    setLoginChecked(true);
                }else{
                    console.log("아이디나 비밀번호가 일치하지 않습니다.");
                }
            })
        }  
    }, [loginUser]);
    return (
        <div className="Positioner">
            <div className="ShadowedBox">
                <div className="LogoWrapper">
                    <div className="Logo">
                        Together Do
                    </div>
                </div>
                <div className="Contents">
                    <div className="Title">	
                        <form id="frm">
                            <div>
                                <label className="Label" htmlFor="email">이메일</label>
                                <input
                                    className="Input"
                                    id="email"
                                    type="text"
                                    placeholder="test@email.com"
                                    {...register("email", {
                                        required: "이메일은 필수 입력입니다.",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "이메일 형식에 맞지 않습니다.",
                                        },
                                    })}
                                    />
                            </div>
                            <div>
                                <label className="Label" htmlFor="email">비밀번호</label>
                                <input 
                                    className="Input"
                                    id="passward"
                                    type="password"
                                    placeholder="password"
                                    {...register("passward", {
                                        required: "비밀번호는 필수입력입니다.",
                                    })}
                                />
                                <SubmitWrapper onClick={handleSubmit(onSubmit)}>
                                    로그인
                                {/* <button className="SubmitWrapper" type="submit">로그인</button> */}
                                </SubmitWrapper>
                                <div className="Aligner">
                                    <StyledLink onClick={signUp}>회원가입</StyledLink>
                                </div>
                            </div>
                            {/* {errors.email && <small role="alert">{errors.email.message}</small>} */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;