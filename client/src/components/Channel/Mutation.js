import { useQuery, gql } from '@apollo/client';
// import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
    mutation CreateChannel($Host:String!, $ChannelTitle:String, $TeamMember:String, $StuNumber:String){
        CreateChannel(Host: $Host, ChannelTitle:$ChannelTitle , TeamMember: $TeamMember, StuNumber:$StuNumber){
            Host,
            ChannelTitle,
            TeamMember
        }      
    }
`;

//생각해보니 채팅방에서는 *, 일대일 채팅은 To를 명시적으로 해주면 되겠구나
//
export const CREATE_MESSAGE = gql`
    mutation SendMessage($MsgFrom:String!, $MsgTo:String!, $MessageContent:String!, $ServerCode:String!,$CreatedAt:String){
        SendMessage(MsgFrom:$MsgFrom, MsgTo:$MsgTo, MessageContent:$MessageContent, ServerCode:$ServerCode, CreatedAt:$CreatedAt){
            MsgFrom,
            MsgTo
        }
    }
`;

export const SUBSCRIPTION_MESSAGE = gql`
    subscription{ 
        newChat{
            MsgFrom
            MessageContent
            CreatedAt
        }
    }
`;
