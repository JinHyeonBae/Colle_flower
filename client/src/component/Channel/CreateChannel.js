import { Modal } from '@material-ui/core';
import {useState, useRef} from 'react';
import {MutationData} from './SendData.js';


function CreateChannel() {

    const [open, isOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [title, setTitle] = useState('');
    
    const nickNameRef = useRef();
    const titleRef = useRef();

    const handleOpen = ()=>{
        isOpen(true);
    }

    const handleClose = ()=>{
        isOpen(false);
        
        const nickname = nickNameRef.current.value;
        const title = titleRef.current.value;
        console.log(nickname);
        console.log(title);

        if(nickname =="" || title == "")
            alert("입력하지 않은 정보가 있습니다!");
        else{
            const data ={
                "Host" : nickname,
                "ChannelTitle" : title
            }
            MutationData(data);
        }        
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>채널 만들기</button>
            <Modal
                open={open}
                onClose={handleClose}>
                <div>    
                <input ref={nickNameRef} placeholder="닉네임을 적어주세요"/>
                <input ref={titleRef} placeholder="채널명을 적어주세요"/>
                </div>
            </Modal>
        </div>
    )
}

export default CreateChannel;