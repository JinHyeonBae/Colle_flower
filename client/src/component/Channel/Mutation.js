import { useQuery,gql } from '@apollo/client';
// import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
    mutation CreateChannel($Host : String!, $ChannelTitle : String, $TeamMember : String){
        CreateChannel(Host: $Host, ChannelTitle:$ChannelTitle , TeamMember: $TeamMember){
            Host,
            ChannelTitle,
            TeamMember
        }      
    }
`;



