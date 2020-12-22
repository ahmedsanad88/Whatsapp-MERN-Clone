import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import axios from "./axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {

  const[messages, setMessages] = useState([]);

  // will use to useEffect one to fetch all messages and other will push only the new message.

  useEffect(() => {
      axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('425c30009cff9e0936e9', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    // here we need to end of subscripe to avoid new subscripe every submition or whats calling clean up function

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  // console.log(messages);

  // const [user, setUser] = useState(null);
  // now we will use context API to confirm user

    const [{user}, dispatch]= useStateValue();


  return (
    <div className="app">

      {!user? (
        <Login />
      ): (
        <div className="app__body" >
        <Router>
          <Switch>
          {/* as we need always chat to be there */}
            <Route path="/rooms/:roomId">
              <Sidebar />
              {/* sidebar */}
              <Chat messages={messages}/>
              {/* chat component */}
            </Route>
            <Route path="/">
              <Sidebar />
              <Chat messages={messages}/>
              {/* chat component */}
            </Route>
          </Switch>
        </Router>
        </div>
      )}
      
    </div>
  )
}

export default App;
