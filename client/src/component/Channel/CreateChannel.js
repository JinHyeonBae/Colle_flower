import { useState, useRef } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { MutationData } from './SendData.js';



function CreateChannel() {

    const [open, isOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [title, setTitle] = useState('');

    const nickNameRef = useRef();
    const titleRef = useRef();

    const handleOpen = () => {
        isOpen(true);
    }

    const handleClose = () => {
        console.log(nickname);
        console.log(title);

        isOpen(false);
        if (nickname == "" || title == "")
            alert("입력하지 않은 정보가 있습니다!");
        else {
            const data = {
                "Host": nickname,
                "ChannelTitle": title
            }
            MutationData(data);
        }
    }

    const handleChange = (e)=>{
        console.log(e.target);
        if(e.target.id === "Host")
            setNickname(e.target.value)
        else
            setTitle(e.target.value);
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>채널 만들기</button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">CreateChannel</DialogTitle>
                <DialogContent>
                    <DialogContentText>채널 정보를 입력해주세요.</DialogContentText>
                    <TextField ref={nickNameRef}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="Host"
                        label="Host nickname"
                        type="input"
                        fullWidth
                    />
                    <TextField ref={titleRef}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="ChannelTitle"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateChannel;