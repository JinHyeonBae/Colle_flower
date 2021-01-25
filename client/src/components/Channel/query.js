import { useQuery, gql } from '@apollo/client';


//채널에 대한 정보를 다 들고 옴. 배열로 올 것이고 이는 옆 쪽의 채널 목록에 들어감
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
        PostInfo(host, channelTitle){
            Writer,
            CreatedAt,
            NickName,
            PostContent,
            Liked,
            Hated,
            Notifying,
            PostID,
            Comment
        }
    }
`;

export const GET_COMMENT = gql`
    query{
        Comment(PostID){
            NickName
            CommentContent
            PostID
        }
    }

`;

