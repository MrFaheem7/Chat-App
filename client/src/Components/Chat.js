import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000'; // Point to your server
const socket = io(ENDPOINT);

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const user = { id: socket.id, name: `User : ${socket.id}` };
        socket.emit('userConnected', user);
        socket.on('updateUserList', (updatedUsers) => {
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        });
        // Listen for messages from the server
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Clean up the event listener
        return () => {
            socket.off('updateUserList');
            socket.off('message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input === '') return;

        // Emit the message to the server
        socket.emit('message', input);
        setInput(''); // Clear the input field
    };

    return (
        <>
            <div>Chat App</div>

            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input
                    autoComplete='off'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </>
    );
};

export default Chat;
