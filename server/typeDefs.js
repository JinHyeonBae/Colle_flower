

import { gql } from 'apollo-server-express';

const typeDefs = gql`

type Query{
    Channel : ChannelInfo,
    Post(serverId : ID!) : PostInfo
}

type ChannelInfo{
    host : String!,
    channelTitle : String,
    serverCode : String,
    teamMember : [String]!
}


type PostInfo{
    Writer : String,
    CreatedAt : String,
    NickName : String,
    PostContent : String,
    Liked : Int,
    Hated : Int,
    Notifying : Int,
    PostID : ID!,
    Comment : [CommentInfo]
}

type CommentInfo{
    NickName : String,
    CommentContent : String,
    PostID : ID!,

}

schema{
    query : Query,
}`;

export default typeDefs;