import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

//채널에 대한 정보를 다 들고 옴.

export const GET_CHANNEL_LIST = gql`    
    query getChannel($StuNumber:String){
        Channel(StuNumber:$StuNumber){
            HostMember
            ChannelTitle
            ServerCode 
            TeamMember 
        }
    }
`;

//채널에 따른 말풍선 가져오기
export const GET_MESSAGE = gql`
    query getMsg($ServerCode:String){
        getMessage(ServerCode:$ServerCode){
            MsgFrom,
            MsgTo
            CreatedAt
            MessageContent
            Liked
            Hated
            Notifying
        }
    }
`;

export const GET_CURRENT_CHANNEL = gql`
    query getCurrentChannel($ServerCode : String){
        getCurrentChannel(ServerCode : $ServerCode){
            TeamMember
        }
    }
`;

export const GET_COMMENT = gql`
    query{
        Comment(PostID : PostID){
            NickName
            CommentContent
            PostID
        }
    }
`;




