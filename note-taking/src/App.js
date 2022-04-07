import './App.css';
import { Navbar, SideNav } from './component/component-index';
import { Routes, Route } from 'react-router-dom';
import { Archive, HomePage, Login, Signup } from './page/page-index';
import Mockman from 'mockman-js';
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="body">
        <SideNav />
        <Routes>
          <Route path="/archive" element={<Archive />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/mock" element={<Mockman />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
