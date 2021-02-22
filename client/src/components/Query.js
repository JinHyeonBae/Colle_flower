import gql from 'graphql-tag';


export const REGISTER_USER = gql`
    query register($username:String, $password : String){
        register(username:$username, password:$password){
            username
        }
    }
`;

// export const SIGNIN = gql`{
//     query signin($email : String, $username:String, $password : String){
//         signin(email : $email, username:$username, password:$password){
//             token
//         }
//     }
// }`;

export const AUTH = gql`
    query userLogin($nickname : String, $password : String){
        userLogin(nickname:$nickname, password:$password){
            AccessToken,
            NickName
        }
    }
`;

export const GET_USERINFO = gql`
    query userInfo($AccessToken : String){
        userInfo(AccessToken:$AccessToken){
            NickName
        }
    }
`