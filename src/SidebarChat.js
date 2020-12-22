import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import ForumIcon from '@material-ui/icons/Forum';
import { makeStyles } from '@material-ui/core/styles';
// import Login from './Login';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    // create new chat by using normal prompt
    const createChat = () => {
        const roomName = prompt("Please enter Room Name:");
        if (roomName) {
            // doing something with the data base
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    //  avatar setup

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
            margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        }));

        const classes = useStyles();

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} style={{textDecoration:"none", color:"black"}}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} className={classes.large} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <div className="sidebarChat__robo">
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} className={classes.small}/>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} className={classes.small}/>
                </div>
            </div> 
            </div>
        </Link>
    ) :  (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add Chat Room <ForumIcon /></h2>
        </div>
    );
}

export default SidebarChat;
