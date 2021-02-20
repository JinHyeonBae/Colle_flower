

import { gql } from 'apollo-server-express';

const typeDefs = gql`


# 채널에서도 MessageID를 넣고 쓰면 편하지 않을까? 불러올 때 와장창 다 불러올 수 있음

type ChannelInfo{
    HostMember:String,
    ChannelTitle:String,
    ServerCode:String,
    TeamMember: String,
    StuNumber: String
}


type Message{
    MsgFrom:String,
    MsgTo:String,
    CreatedAt: String,
    MessageContent: String,
    Liked:Int,
    Hated: Int,
    Notifying: Int,
    MessageId: String,
    ServerCode: String,
}

type CommentInfo{
    NickName:String,
    CommentContent:String,
    MessageId:String!,
}

type User{
    username :String,
    token : String!
}

type Mutation{
    CreateChannel(HostMember:String!, ChannelTitle:String, TeamMember:String,StuNumber:String) : ChannelInfo,
    SendMessage(MsgFrom:String!, MsgTo:String!, MessageContent:String!, ServerCode:String!,CreatedAt:String) : Message
}

type Query{
    Channel(StuNumber:String): [ChannelInfo],
    getMessage(ServerCode:String) : [Message],
    authenticate(nickname:String, password :String) : User
}

type Subscription{
    newChat: Message
}

schema{
    query:Query,
    mutation:Mutation,
    subscription:Subscription
}`;

export default typeDefs;