const INITIAL_STATE = { 
  schoolName : ''
 };

const userReducer = (state = INITIAL_STATE, action) => {

  switch(action.type){
/*     case 'LOGIN_USER' : 
      return{
        ...state,
        login : 'login try' //temp
      }; */
    case 'SET_USER_SCHOOL' : 
      return{
        schoolName : state.schoolName
      };
    default : 
      return state;
  }

}

export default userReducer;