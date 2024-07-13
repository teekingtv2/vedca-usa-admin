import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/index.jsx';
import NotFound from './pages/404.jsx';
import Admins from './pages/admins/index.jsx';
import AddAdmin from './pages/admins/AddAdmin.jsx';
import AdminProfile from './pages/admins/admin-profile.jsx';
import EditAdmin from './pages/admins/edit-admin.jsx';
import Login from './pages/auth/login/index.jsx';
import Profile from './pages/settings/profile.jsx';
import EditProfile from './pages/settings/edit-profile.jsx';
import Donations from './pages/donations/index.jsx';
import DonationDetails from './pages/donations/donation-details.jsx';
import Enquiries from './pages/enquiries/index.jsx';
import EnquiryDetails from './pages/enquiries/enquiry-details.jsx';
import Members from './pages/members/index.jsx';
import MemberProfile from './pages/members/member-profile.jsx';
import EditMember from './pages/members/edit-member.jsx';
import AddMember from './pages/members/add-member.jsx';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <div className="app">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              // theme="colored"
            />
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Dashboard />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/admin-profile/:id" element={<AdminProfile />} />
              <Route path="/edit-profile/:id" element={<EditAdmin />} />

              <Route path="/members" element={<Members />} />
              <Route path="/add-member" element={<AddMember />} />
              <Route path="/member-profile/:id" element={<MemberProfile />} />
              <Route path="/edit-member/:id" element={<EditMember />} />

              <Route path="/donations" element={<Donations />} />
              <Route path="/donation-details/:id" element={<DonationDetails />} />

              <Route path="/enquiries" element={<Enquiries />} />
              <Route path="/enquiry-details/:id" element={<EnquiryDetails />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
