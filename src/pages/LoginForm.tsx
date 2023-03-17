import { useForm, SubmitHandler } from "react-hook-form";
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
type LoginFormProps = {
    loginUser: {email : string, password : string};
    saveUser: any;
    setLoginUser : React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
    }>>;
    setChanged : React.Dispatch<React.SetStateAction<boolean>>;
    setLoginChecked : React.Dispatch<React.SetStateAction<boolean>>;
  };

interface FormValue  {
    email : string
    password : string
}

const LoginForm = (props : LoginFormProps) => {
    const { loginUser, saveUser, setLoginUser, setChanged, setLoginChecked } = props;
    //console.log("saveUser : ",saveUser);
    
    const {
		register, //리액트훅폼에게, 이 인풋에 대해 이러한 항목을 입력받을 것이라는 것을 등록해준다.
		handleSubmit, //리액트훅폼에서 각 항목이 입력되었을 때 submit 이벤트를 처리하는 역할을 한다.
        watch, //register 한 항목의 변경사항을 추적한다
		formState: { errors }, //유효성이 통과되지 않으면 에러 상태를 내보내준다.
	} = useForm<FormValue>();

    const onSubmit : SubmitHandler<FormValue> = (data) => {
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
            saveUser.map((users: { email: string; password: string; }) => {
                if(users.email === loginUser.email && users.password === loginUser.password) {
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
                                    type="email"
                                    placeholder="test@email.com"
                                    {...register("email", {
                                        required: true,
                                        pattern: /\S+@\S+\.\S+/
                                    })}
                                    />
                                    {errors.email && errors.email.type === "required" && (
                                        <p>* 이메일은 필수 입력 입니다. *</p>
        	                        )}
                            </div>
                            <div>
                                <label className="Label" htmlFor="password">비밀번호</label>
                                <input 
                                    className="Input"
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: "비밀번호는 필수입력입니다.",
                                    })}
                                />
                                <SubmitWrapper onClick={handleSubmit(onSubmit)}>
                                    로그인
                                {/* <button className="SubmitWrapper" type="submit">로그인</button> */}
                                </SubmitWrapper>
                                <div className="Aligner">
                                    <StyledLink to="" onClick={signUp}>회원가입</StyledLink>
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