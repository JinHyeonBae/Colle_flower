import UserActionTypes from './types';

/* export const login = ({email, password}) => {
  return {
    type : UserActionTypes.LOGIN_USER,
    payload : true  //temp
  }
} */
export const setUserSchool = schoolName => {
  return {
    type : UserActionTypes.SET_USER_SCHOOL,
    schoolName
  }
}
