import { useState, useRef, useEffect,Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery, useSubscription, gql,useApolloClient } from '@apollo/client';
import { GET_MESSAGE } from '../query';
import { CREATE_MESSAGE, SUBSCRIPTION_MESSAGE } from '../Mutation'
import { GET_CHANNEL_LIST  } from '../query.js';
import {AUTH,GET_USERINFO} from '../../Query.js';
import './Message.scss';
import { User } from './TemporaryUser'


function Message() {

    const msgRef = useRef();
    const [content, setContent] = useState('');
    const client = useApolloClient();

    const time = new Date();
    const nowDate = `${time.getFullYear()}-${time.getMonth() < 10 ? '0' + time.getMonth() : time.getMonth()}-${time.getDate() < 10 ? '0' + time.getDate() : time.getDate()}`;
    const nowTime = `${(time.getHours() > 9 ? time.getHours() : '0' + time.getHours())}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds()}`;
    const date = nowDate + ' ' + nowTime;

    const param = useParams(); //servercode

    const { data, loading, subscribeToMore } = useQuery(GET_MESSAGE, {
        variables: param,
    });
    // const result = client.readQuery({
    //     query : GET_USERINFO,
    //     variables : localStorage.getItem('token')
    // })

    // console.log("query Result : ",result)
    //캐쉬말고 쿠키에 nickname이랑 토큰 저장해서 불러오자

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIPTION_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { newChat } = subscriptionData.data;
                return {
                    ...prev,
                    getMessage: [...prev.getMessage, newChat]
                }
            }
        })
    }, []);

    const [sendMsg] = useMutation(CREATE_MESSAGE)
    //받은 메시지는 왼쪽으로, 내가 보낸 메시지는 오른쪽으로 나타나야 한다.

    return (
        <div className="Chatting_container">
            <div className="Chatting_Header">
                
            </div>
            <div className="Show_Chatting">
                {data ? data.getMessage.map((e, index) => {
                    return <div key={index} style={{ "margin": "1rem" }}>{e.MsgFrom} :{e.MessageContent}</div>
                }) : ''}
            </div>
            <div className="Message_typedbox">
                <textarea ref={msgRef} placeholder="메시지를 입력해주세요." value={content}
                    onChange={(e) => { console.log("onChange"); setContent(e.currentTarget.value) }}
                    onKeyPress={(e) => {
                        if (e.code === "Enter") {
                            if (content != '') {
                                sendMsg({
                                    variables: {
                                        ...User,
                                        MessageContent: content,
                                        ServerCode: param.ServerCode,
                                        CreatedAt: date
                                    }
                                })
                                    .then(() => setContent('')) //아무래도 비동기 때문에 '' 되고난 후 setContent가 된 듯
                            }
                            setContent('')
                        }
                    }
                    }>
                </textarea>
                <button onClick={(e) => {
                     if (e.code === "Enter") {
                        if (content != '') {
                            sendMsg({
                                variables: {
                                    ...User,
                                    MessageContent: content,
                                    ServerCode : param.ServerCode,
                                    CreatedAt: date
                                }
                            })
                                .then(() => setContent('')) //아무래도 비동기 때문에 '' 되고난 후 setContent가 된 듯
                        }
                        setContent('')
                    }
                }}>확인</button>
            </div>
        </div>
    )
}

export default Message;