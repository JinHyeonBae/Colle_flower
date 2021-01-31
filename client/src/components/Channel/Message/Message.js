import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_MESSAGE } from '../Query';
import { CREATE_MESSAGE } from '../Mutation'
import './Message.scss';

function Message() {

    const [msgContent, setMsgContent] = useState([{
        MsgFrom: '',
        MsgTo: '',
        MessageContent: '',
        Notifying: '',
        CreatedAt: ''
    }]);

    const msgRef = useRef();
    const time = new Date();

    const sc = { "ServerCode": 'http://colleflower/pknu201811111/9033ab36-cb94-4fd4-a548-e89676e571ec' }
    const now = `${time.getHours()} : ${time.getMinutes()}`;

    const { loading, data, error } = useQuery(GET_MESSAGE, {
        variables: sc
    });

    const [sendMsg] = useMutation(CREATE_MESSAGE);

    const onChanged = (e) => {
        console.log(e.target.value)
        setMsgContent(e.tatget.value);
    }

    if (loading) return <div>loading..</div>
    if (error) console.log(error);
    if (data) 

    return (
        <div className="Message_box">
            <div className="Messages">
                {data.getMessage.map((e, index) => {
                    return <div key ={index} style={{ "margin": "1rem" }}>{e.MsgFrom} :{e.MessageContent}</div>
                })}
            </div>
            <textarea ref={msgRef} placeholder="메시지를 입력해주세요."
                onKeyPress={(e) => {
                    if (e.key === "Enter" && msgRef.current.value != '') {
                        console.log(msgRef.current.value)
                        sendMsg({
                            variables: {
                                "MsgFrom": "nick",
                                "MsgTo": "*",
                                "MessageContent": msgRef.current.value,
                                "ServerCode": "http://colleflower/pknu201811111/9033ab36-cb94-4fd4-a548-e89676e571ec",
                                "CreatedAt": now
                            }
                        })
                        msgRef.current.innerText = "";
                    }
                }}>
            </textarea>
            <button onClick={(e) => {
                if (msgRef.current.value != '') {
                    sendMsg({
                        variables: {
                            "MsgFrom": "nick",
                            "MsgTo": "*",
                            "MessageContent": msgRef.current.value,
                            "ServerCode": "http://colleflower/pknu201811111/9033ab36-cb94-4fd4-a548-e89676e571ec",
                            "CreatedAt": now
                        }
                    })
                }
            }}>확인</button>
        </div>
    )
}

export default Message;