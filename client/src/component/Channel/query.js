import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

//채널에 대한 정보를 다 들고 옴.

export const GET_CHANNEL_LIST = gql`    
    query{
        Channel{
            host
            channelTitle
            serverCode 
            teamMember 
        }
    }
`;


//채널에 따른 말풍선 가져오기
export const GET_POST = gql`
    query{
        PostInfo(Host : $Host, ChannelTitle : $ChannelTitle){
            Writer,
            CreatedAt,
            NickName,
            PostContent,
            Liked,
            Hated,
            Notifying,
            PostID,
            PostComment
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


