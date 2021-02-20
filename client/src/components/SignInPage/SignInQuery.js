
import gql from 'graphql-tag';

export const SIGNIN = gql`{
    query authenticate($username : String, $password : String){
        authenticate(username:$username, password:$password){
            token
        }
    }
}`;