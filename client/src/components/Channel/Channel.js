import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { GET_CHANNEL_LIST, GET_POST } from './Query.js';
import { CREATE_CHANNEL } from './Mutation.js';
import CreateChannel from './CreateChannel';
import Message from './Message/Message'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import './Channel.scss'
import {StudentNumber} from './Message/TemporaryUser'

// Channel.js에서는 모든 Channel에 적용되는 basic 설정을 추가한다.
// 채널의 제목, 설명, 채팅을 칠 수 있는 공간 등이 있다.
// 입력한 사람의 이미지 및 닉네임, 게시글이 나타나야 하므로 이러한 사항을 먼저 불러온 다음, 입력할 때마다 출력을 해야할 것이다.
// 게시글은 바로 아래의 컴포넌트가 될 것이다. 

function Channel() {
    console.log(StudentNumber)

    const param = useParams();
    const { loading, data, error } = useQuery(GET_CHANNEL_LIST, {
        variables: StudentNumber
    });


    if (loading) return <div>loading...</div>
    if (error) return <div>{error}</div>
    if (data) console.log(data);
    return (
        <div className="Channel_frame">
            <div className="Channel_Content">
                <CreateChannel />
                {data.Channel.map(({ ChannelTitle, ServerCode }) =>
                    <Link to={`/Chat/colleflower/${ServerCode}`}>{ChannelTitle}</Link>
                )}
            </div>
            <div className="Channel_footer">
                <Message />
            </div>
        </div>
    )

}



export default Channel;