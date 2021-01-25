import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';


function Message() {


    const msgRef = useRef();

    const SendMsg = () => {

        const MessageContent = msgRef.current.value;
        const ServerCode = uuid();
        const now = new Date();

        const SendData = {
            "From": "nick",
            "To": "*",
            "MessageContent": MessageContent,
            ServerCode: ServerCode,
            CreatedAt: now.getHours() + '.' + now.getMinutes()
        }

    }


    return (
        <div>
            <textarea ref={msgRef} onKeyPress={(e) => { if (e.key == "Enter") SendMsg() }}>
                메시지를 입력해주세요.
            </textarea>
            <button onClick={SendMsg}>확인</button>
        </div>
    )
}

export default Message;