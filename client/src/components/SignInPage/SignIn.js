import React, { Fragment, useState } from 'react';
import {useQuery, useMutation,useLazyQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";

import {AUTH} from '../Query.js'
/* import { useDispatch } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  comment : () => dispatch(login()),
}) */

function SignIn(){
  /* const dispatch = useDispatch(); */
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const history = useHistory();

  //여기서 토큰을 받고
  const [getUserInfo, {loading, data }] = useLazyQuery(AUTH,{
    onError : (err)=> console.log(err),
    onCompleted(data){
      console.log(data)
      localStorage.setItem('token', data.userLogin.AccessToken);
      history.push('/')
    }
  })

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //check Email and Password

/*     dispatch(login({userEmail, userPassword})).then((response) => {
      if (response.payload.loginSuccess) {
      } 
    }); */
  }

  const emailOnChangeHandler = (e) =>{
    setUserEmail(e.target.value);
  }
  const passwordOnChangeHandler = (e) =>{
    setUserPassword(e.target.value);
  }


  return (
    <Fragment>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input 
            type="input"  
            value={userEmail} 
            onChange={emailOnChangeHandler}
          />
          <input 
            type="password"
            placeholder="Password" 
            value={userPassword} 
            onChange={passwordOnChangeHandler}
          />
          <button type="submit" onClick={()=>getUserInfo({variables : {
            nickname : userEmail,
            password : userPassword
          }})}>Login</button>
        </form>
      </div>
    </Fragment>
  );
}

export default SignIn;