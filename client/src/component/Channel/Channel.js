import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CHANNEL_LIST, GET_POST } from './Query.js';
import { CREATE_CHANNEL } from './Mutation.js';
import { Modal } from '@material-ui/core';

import CreateChannel from './CreateChannel';
import {QueryData} from './SendData.js';

// Channel.js에서는 모든 Channel에 적용되는 basic 설정을 추가한다.
// 채널의 제목, 설명, 채팅을 칠 수 있는 공간 등이 있다.
// 입력한 사람의 이미지 및 닉네임, 게시글이 나타나야 하므로 이러한 사항을 먼저 불러온 다음, 입력할 때마다 출력을 해야할 것이다.
// 게시글은 바로 아래의 컴포넌트가 될 것이다. 

function Channel() {
    console.log("hihi");

    //const { loading, queryData, error } = useQuery(GET_CHANNEL_LIST);
    // const [addChannel, { mutationData }] = useMutation(CREATE_CHANNEL);
    // //이 쿼리 자체가 object object인데
    // const [title, setTitle] = useState('');

    const [Host, setHost] = useState('');
    const [ChannelTitle, setChannelTitle] = useState('');
    const [TeamMember, setTeamMember] = useState([]);


    // if (error) console.log("err ", error);
    // if (loading || !queryData) //return <div>loading...</div>
    // console.log(queryData);

    // console.log(mutationData);

    useEffect(()=>{
        QueryData();
    })
    
    return (
        <div className="Channel_frame">
            <div className="Channel_header">
            </div>
            <div className="Channel_container">
                <CreateChannel />
            </div>
            <div className="Channel_footer">

            </div>
        </div>
    );

}


export default Channel;