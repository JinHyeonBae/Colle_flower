import { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery, useSubscription, gql } from '@apollo/client';
import { GET_MESSAGE } from '../Query';
import { CREATE_MESSAGE, SUBSCRIPTION_MESSAGE } from '../Mutation'
import './Message.scss';
import { User } from './TemporaryUser'

function Message() {

    const msgRef = useRef();
    const [content, setContent] = useState('');

    const time = new Date();
    const now = `${time.getHours()} : ${time.getMinutes()}`;
    const { ServerCode } = useParams(); //servercode
    
    const { data, loading, subscribeToMore } = useQuery(GET_MESSAGE, {
        variables: { "ServerCode": ServerCode },
    });
    const result = useSubscription(SUBSCRIPTION_MESSAGE)
    console.log("subResult :",result);


    useEffect(() => {
        console.log("there is useEffect")
        subscribeToMore({
            document: SUBSCRIPTION_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                console.log("hhi")
                console.log("prev :",prev);
                const {newChat} = subscriptionData.data;
                console.log("newChat :",newChat)
                return {
                    ...prev,
                    getMessage : [...prev.getMessage, newChat]
                }
            }
        })
    },[]);
    
    const [sendMsg] = useMutation(CREATE_MESSAGE);

    if (loading) return <div>loading..</div>

    return (
        <div className="Message_box">
            <div className="Messages">
                {data ? data.getMessage.map((e, index) => {
                    return <div key={index} style={{ "margin": "1rem" }}>{e.MsgFrom} :{e.MessageContent}</div>
                }) : ''}
            </div>
            <textarea ref={msgRef} placeholder="메시지를 입력해주세요." value={content} 
                onChange={(e)=>setContent(e.currentTarget.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter" && content != '') {
                        sendMsg({
                            variables: {
                                ...User,
                                MessageContent: content,
                                ServerCode: ServerCode,
                                CreatedAt: now
                            }
                        })
                        setContent('');
                    }
                }}>
            </textarea>
            <button onClick={(e) => {
                if (content != '') {
                    sendMsg({
                        variables: {
                            ...User,
                            "MessageContent": content,
                            "ServerCode": ServerCode,
                            "CreatedAt": now
                        }
                    })
                    setContent('');
                }
            }}>확인</button>
        </div>
    )
}

export default Message;