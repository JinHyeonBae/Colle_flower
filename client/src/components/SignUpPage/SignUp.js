import React, { Fragment,useState } from 'react';

function SignUp(){
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    nickname: '',
    schoolName: '',
    studentID: '',
    department: '',
    grade: '',
    credits: '',
  });

  const { 
    email,
    password, 
    nickname, 
    schoolName,
    studentID, 
    department,
    grade,  
    credits 
  } = userInfo;


  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input 
            name="email"
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={onChangeHandler} 
          />
          <input 
            name="password"
            type="password"
            placeholder="Password" 
            value={password} 
            onChange={onChangeHandler} 
          />
          <input 
            name="nickname"
            type="text" 
            placeholder="Nickname" 
            value={nickname} 
            onChange={onChangeHandler} 
          />
          <input 
            name="schoolName"
            type="text"
            placeholder="School Name" 
            value={schoolName} 
            onChange={onChangeHandler} 
          />
          <input 
            name="studentID"
            type="text" 
            placeholder="Student ID" 
            value={studentID} 
            onChange={onChangeHandler} 
          />
          <input 
            name="department"
            type="text"
            placeholder="Department" 
            value={department} 
            onChange={onChangeHandler} 
          />
          <input 
            name="grade"
            type="number" 
            placeholder="Grade" 
            value={grade} 
            onChange={onChangeHandler} 
          />
          <input 
            name="credits"
            type="number" 
            placeholder="Credits" 
            value={credits} 
            onChange={onChangeHandler} 
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Fragment>
  );
}

export default SignUp;