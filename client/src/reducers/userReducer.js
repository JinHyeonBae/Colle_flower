const INITIAL_STATE = { val : 0, };

const userReducer = (state = INITIAL_STATE, action) => {

  switch(action.type){
    case 'LOGIN_USER' : 
      return{
        ...state,
        login : 'login try' //temp
      };
    default : 
      return state;
  }

}

export default userReducer;