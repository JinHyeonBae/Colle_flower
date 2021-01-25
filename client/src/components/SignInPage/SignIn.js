import React, { Fragment, useState } from 'react';
/* import { useDispatch } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  comment : () => dispatch(login()),
}) */

function SignIn(){
  /* const dispatch = useDispatch(); */
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
            type="email" 
            placeholder="Email" 
            value={userEmail} 
            onChange={emailOnChangeHandler}
          />
          <input 
            type="password"
            placeholder="Password" 
            value={userPassword} 
            onChange={passwordOnChangeHandler}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Fragment>
  );
}

export default SignIn;