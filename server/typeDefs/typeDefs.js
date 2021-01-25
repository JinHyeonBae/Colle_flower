

import { gql } from 'apollo-server-express';

const typeDefs = gql`

type Query{
    Channel : ChannelInfo,
    Post(serverId : ID!) : Message
}

# 채널에서도 MessageID를 넣고 쓰면 편하지 않을까? 불러올 때 와장창 다 불러올 수 있음

type ChannelInfo{
    Host : String,
    ChannelTitle : String,
    ServerCode : String,
    TeamMember : [String]
}


type Message{
    From : String,
    To : String,
    CreatedAt : String,
    MessageContent : String,
    Liked : Int,
    Hated : Int,
    Notifying : Int,
    MessageId : ID!,
    ServerCode : String,
}

type CommentInfo{
    NickName : String,
    CommentContent : String,
    MessageId : ID!,
}

type Mutation{
    CreateChannel(Host : String!, ChannelTitle : String, TeamMember : String) : ChannelInfo,
    SendMessage(From:String!, To:String!, MessageContent:String!, ServerCode:String!,CreatedAt:String) : Message
}

schema{
    query : Query,
    mutation : Mutation
}`;

export default typeDefs;