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
import Users from './pages/users/index.jsx';
import AddUser from './pages/users/add-user.jsx';
import UserProfile from './pages/users/user-profile.jsx';
import EditUser from './pages/users/edit-user.jsx';
import UserTransactions from './pages/transactions/index.jsx';
import AddTransaction from './pages/transactions/add-transaction.jsx';
import EditTransaction from './pages/transactions/edit-transaction.jsx';
import TransactionDetails from './pages/transactions/transaction-details.jsx';
import EditUserBalance from './pages/users/edit-balance.jsx';
import Login from './pages/auth/login/index.jsx';
import Profile from './pages/settings/profile.jsx';
import EditProfile from './pages/settings/edit-profile.jsx';
import WalletAddress from './pages/settings/wallet-address.jsx';

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

              <Route path="/users" element={<Users />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/user-profile/:id" element={<UserProfile />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/update-balance/:id" element={<EditUserBalance />} />

              <Route path="/transactions" element={<UserTransactions />} />
              <Route path="/add-transaction/:id" element={<AddTransaction />} />
              <Route path="/edit-transaction/:id" element={<EditTransaction />} />
              <Route path="/transaction-details/:id" element={<TransactionDetails />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/wallet" element={<WalletAddress />} />

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
