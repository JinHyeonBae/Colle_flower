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
    query authenticate($nickname : String, $password : String){
        authenticate(nickname:$nickname, password:$password){
            token
        }
    }
`;