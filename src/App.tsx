import { Routes, Route } from 'react-router-dom';
import SetName from './pages/SetName/SetName.tsx';
import ChatRoom from './pages/ChatRoom/ChatRoom.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SetName />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
