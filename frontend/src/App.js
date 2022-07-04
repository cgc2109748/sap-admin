import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <>
      <MantineProvider>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <ModalsProvider>
            <Router>
              <div className="container">
                {/* <Header /> */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
            </Router>
            <ToastContainer />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default App;
