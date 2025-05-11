import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';
import './Registration.css';

function Registration() { 
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');

    const handleNicknameChange = (e) => {
        const { value } = e.target;
        setNickname(value)
    };

    const handleSave = async () => {
        try {
            const response = await fetch('https://hsebcmail.ru/api/register-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
                body: JSON.stringify({ nickname }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }
    
            navigate('/');
    
        } catch (error) {
            console.error('Error saving nickname:', error);
        }
    };
    

    return <div className="column">
        <div className="sub-column">
            <h1>your nickname?</h1>

            <div className="field" style={{position: 'relative', marginTop: '100px', left: '0'}}>
            <input
                type='text'
                placeholder={`text`}
                name={`nickname`}
                value={nickname}
                onChange={(e) => handleNicknameChange(e)}
            />
            </div>
        </div>
        <MainButton text="send" onClick={() => handleSave()} />
    </div>
}

export default Registration;