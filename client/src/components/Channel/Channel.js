import { useQuery } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery, gql } from '@apollo/client';
import {query} from './query'

// Channel.js에서는 모든 Channel에 적용되는 basic 설정을 추가한다.
// 채널의 제목, 설명, 채팅을 칠 수 있는 공간 등이 있다.
// 입력한 사람의 이미지 및 닉네임, 게시글이 나타나야 하므로 이러한 사항을 먼저 불러온 다음, 입력할 때마다 출력을 해야할 것이다.
// 게시글은 바로 아래의 컴포넌트가 될 것이다. 


export const serverRequest = () => {

    //게시글들을 불러오는 코드(코드에 따라 뭐 다르겠죠)

}

function Channel() {

    const [title, setTitle] = useQuery(GET_CHANNELINFO);
    
    /*  
        ChannelInfo에 대한 정보는 생성하자마자 다 만들어야한다.
        그러므로 ChannelInfo
    */


    return (
        <div className="Channel_frame">
            <div className="Channel_header">

            </div>
            <div className="Channel_container">

            </div>
            <div className="Channel_footer">

            </div>
        </div>
    )

}


export default Channel;