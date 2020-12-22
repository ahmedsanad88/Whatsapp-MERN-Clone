import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Chat({messages}) {

    const today = new Date();
    const date = today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const [{user}, dispatch]= useStateValue();

    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    // useEffect for room id to get the right room
    useEffect(() => {
        if(roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name));
        }
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            name: user.displayName,
            message: input,
            timestamp: dateTime,
            received: false,
            room: roomName,
        });
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen...{dateTime}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
               
                {messages.map((message) => (
                    message.room === roomName && (
                        <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                            { message.message }
                        <span className="chat___timestamp">
                            {dateTime}
                        </span>
                        </p>
                    )
                ))}
                {/*             
                <p className="chat__message">
                    <span className="chat__name">Ahmed</span>
                Message will be here....
                    <span className="chat___timestamp">
                        {}
                    </span>
                </p> */}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a Message
                    </button>
                </form>
                <IconButton>
                    <MicIcon /> 
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;

