

import { gql } from 'apollo-server-express';

const typeDefs = gql`

type Query{
    Channel : ChannelInfo,
    Post(serverId : ID!) : PostInfo
}

type ChannelInfo{
    Host : String,
    ChannelTitle : String,
    ServerCode : String,
    TeamMember : [String]
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

type Mutation{
    CreateChannel(Host : String!, ChannelTitle : String, TeamMember : String) : ChannelInfo 
}

schema{
    query : Query,
    mutation : Mutation
}`;

export default typeDefs;