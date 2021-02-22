import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { GET_CHANNEL_LIST, GET_POST } from './query.js';
import CreateChannel from './CreateChannel';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import { Popover, Typography, Button, Box } from '@material-ui/core';

import { StudentNumber } from './Message/TemporaryUser'
import Message from './Message/Message'
import './Channel.scss'

// Channel.js에서는 모든 Channel에 적용되는 basic 설정을 추가한다.
// 채널의 제목, 설명, 채팅을 칠 수 있는 공간 등이 있다.
// 입력한 사람의 이미지 및 닉네임, 게시글이 나타나야 하므로 이러한 사항을 먼저 불러온 다음, 입력할 때마다 출력을 해야할 것이다.
// 게시글은 바로 아래의 컴포넌트가 될 것이다. 

function Channel() {

    const [anchorEl, setAnchorEl] = useState(null);
    const client = useApolloClient();
    const param = useParams();
    const { loading, data, error } = useQuery(GET_CHANNEL_LIST, {
        variables: StudentNumber
    });

    // console.log("client :", client);

    const result = client.readQuery({
        query : GET_CHANNEL_LIST
    })
    console.log("result :",result);
    console.log(param);

    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>
    if (data) console.log(data);
    

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="Channel_frame">
            <div className="Channel_List">
                <CreateChannel />
                <Button onClick={()=>alert(param.ServerCode)}>
                    서버 코드 보기
                </Button>
                {data ? data.Channel.map(({ ChannelTitle, ServerCode }) =>
                    <Link to={`/Chat/colleflower/${ServerCode}`}>{ChannelTitle}</Link>
                ) : ' '}
                <div className="Chatting_EachOther">
                    <Button>1대1채팅</Button>
                </div>
            </div>
            <div className="Message_container">
                <Message />
            </div>
        </div>
    )

}



export default Channel;