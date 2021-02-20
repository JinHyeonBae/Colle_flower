import React, { Fragment, useState } from 'react';
import FindSchool from './FindSchool';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from "@material-ui/core/Modal";

import {useQuery, useMutation,useLazyQuery} from "@apollo/client";
import {REGISTER_USER} from '../Query.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}


function SignUp(props){
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordChecker: '',
    nickname: '',
    schoolName: '',
    studentID: '',
    college: '',
    department: '',
    education: '',
    grade: '',
  });

  const { 
    email,
    password, 
    passwordChecker,
    nickname, 
    schoolName,
    studentID, 
    college,
    department,
    education,
    grade,
  } = userInfo;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //check input values and existence in database
    if (checkInputValue() && checkExistence()){
      //pass the userInfo to server to save data in DB

      alert('Succeed to Sign Up');
      props.history.push("/signin");
    }
  }

  //Check Input Valid 
  const checkInputValue = () => {
    if (!checkEmailForm(email)) {
      alert('Email Address is not Valid');
      return false;
    }
    else if (!checkPassword(password, passwordChecker)) {
      alert('Passwords are not Same');
      return false;
    }
    return true;
  }

  const checkExistence = () => {
    
  }

  const checkEmailForm = () => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(email) ? true : false;
  };
  const checkPassword = () => password === passwordChecker;
 

  //for modal
  const modalOpenHandler = () => {
    setModalOpen(true);
  };
  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  //set user school
  //let userSchoolName = useSelector(state => state.schoolName);
  // setUserInfo({
  //   ...userInfo,
  //   [schoolName]: userSchoolName
  // });
  
  //onChange Handler
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
          <input required
            name="email"
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={onChangeHandler} 
          />
          <input required
            name="password"
            type="password"
            placeholder="Password" 
            value={password} 
            onChange={onChangeHandler} 
          />
          <input required
            name="passwordChecker"
            type="password"
            placeholder="Password Checker" 
            value={passwordChecker} 
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
          <button type="button" onClick={modalOpenHandler}>Find School</button>
          <input 
            name="studentID"
            type="text" 
            placeholder="Student ID" 
            value={studentID} 
            onChange={onChangeHandler} 
          />
          <select 
            name="college"
            value={college} 
            onChange={onChangeHandler}>
            <option value="" disabled defaultValue hidden>College</option>
            <option value="Engineering">Engineering</option>  {/*for test*/}
          </select>
          <select 
            name="department"
            value={department} 
            onChange={onChangeHandler}>
            <option value="" disabled defaultValue hidden>Department</option>
            <option value="itcae">IT Conversions and Application Engineering</option>  {/*for test*/}
          </select>
          <select 
            name="education"
            value={education} 
            onChange={onChangeHandler}>
            <option value="" disabled defaultValue hidden>Education</option>
            <option value="Attending">Attending</option>
            <option value="Absence">A Leave of absence</option>
            <option value="Graduated">Graduated</option>
          </select>
          <FormControl className={classes.formControl}>
            <Select
              value={education}
              onChange={onChangeHandler}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>Education</MenuItem>
              <MenuItem value="attending">Attending</MenuItem>
              <MenuItem value="absence">A Leave of absence</MenuItem>
              <MenuItem value="graduated">Graduated</MenuItem>
            </Select>
            <FormHelperText>Placeholder</FormHelperText>
          </FormControl>
          <input 
            name="grade"
            type="number" 
            placeholder="Grade" 
            value={grade} 
            onChange={onChangeHandler} 
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Modal
        open={modalOpen}
        onClose={modalCloseHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
        <FindSchool onClose={modalCloseHandler}/>
      </div>
      </Modal>
    </Fragment>
  );
}

export default SignUp;