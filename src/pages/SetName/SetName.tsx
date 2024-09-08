import { useNavigate } from 'react-router-dom';
import './SetName.css'
import {useState} from 'react';

function SetName() {
  const [username, setUsername] = useState('');
  const Navigate = useNavigate();

  function JumpToChatRoom(){
    localStorage.setItem('username', username); 
    Navigate('/chatroom')
  }

  return (
      <>
        <p className="title"></p>
        <div className="container">
            <input  
                className="input" 
                placeholder="Name"  
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="name" className="form__label">Name</label>
        </div>
        <button className="login" onClick={JumpToChatRoom}>
            <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">Login</span>
        </button>
      </>
    )
  }
  
export default SetName