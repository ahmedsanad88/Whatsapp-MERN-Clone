import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';
import { Button } from '@material-ui/core';
import { actionTypes } from './reducer';


function Sidebar() {


    // last pulling user info from datalayer
    const [{user}, dispatch]= useStateValue();

    const handleClick =() => {
        if(user) {
            dispatch({
               type: actionTypes.SET_USER,
               user: null,
           });
        }
    }

    // create state & useEffect to state rooms change
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // coolecting data from firebase
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
        (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })
                ))
        ));

        // will act like clean up function to avoid err...

        return () => {
            unsubscribe();
        };
            
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                    <Avatar alt="Ahmed" src={user?.photoURL} />
                    <Button onClick={handleClick}>Sign Out</Button>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
               <SidebarChat addNewChat /> 
               {rooms.map(room => (
                   <SidebarChat 
                       key={room.id}
                       id={room.id}
                       name={room.data.name}
                   />
               ))}
                
            </div>
        </div>
    )
}

export default Sidebar;

// sidebar component:
// header
// avatar
// header icon
// search bar
// friends bar
