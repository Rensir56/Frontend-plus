import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SetName from './pages/SetName/SetName.tsx';
import ChatRoom from './pages/ChatRoom/ChatRoom.tsx';

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<SetName />} />
            <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
    </>
  );
}

export default App;
