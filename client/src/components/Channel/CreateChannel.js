import { useState, useRef } from 'react';
import { CREATE_CHANNEL } from './Mutation'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function CreateChannel({ n }) {

    const [open, isOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [title, setTitle] = useState('');

    const nickNameRef = useRef();
    const titleRef = useRef();

    const [addChannel] = useMutation(CREATE_CHANNEL);

    const handleOpen = () => {
        isOpen(true);
    }

    const handleClose = () => {
        isOpen(false);
    }

    const handleChange = (e) => {
        console.log("dd")
        if (e.target.id === "Host")
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
                        type="input"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => {
                        console.log(title)
                        if (nickNameRef.current.value != '' && titleRef.current.value != '') {
                            addChannel({
                                variables: {
                                    "Host": nickname,
                                    "ChannelTitle": title,
                                    "TeamMember": nickname,
                                    "StuNumber": n.StuNumber
                                }
                            })
                        }
                    }} color="primary">
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateChannel;