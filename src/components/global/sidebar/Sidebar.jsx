import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuItemComp from './MenuItemComp';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';
import { errorNotification, successNotification } from '../../../utils/helpers';
import { Person2Outlined, WalletOutlined } from '@mui/icons-material';
import useFetchCredential from '../../../api/useFetchCredential';
import ProgressCircle from '../../dashboard/ProgressCircle';

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  const { data, loading, error } = useFetchCredential(`admin-auth/get-admin`);

  const handleLogout = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin-auth/logout`);
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => history('/login'), 2000);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#686dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <img
                  alt="admin avatar"
                  height="50px"
                  width="100px"
                  src="/assets/images/logo.png"
                  style={{ cursor: 'pointer' }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="admin avatar"
                  height="100px"
                  width="100px"
                  src={`/public/assets/images/user.avif`}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>

              {data && (
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{
                      m: '10px 0 0 0',
                    }}
                  >
                    {data.data.username}
                  </Typography>
                  <Typography variant="h5" color={colors.grey[500]}>
                    Administrator
                  </Typography>
                </Box>
              )}
              {loading && <ProgressCircle progress="0.5" />}
              {error && <div style={{ color: 'red !important', fontSize: '20px' }}>{error}</div>}
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <MenuItemComp
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Urgent Requests
            </Typography>
            <MenuItemComp
              title="Transactions"
              to="/transactions"
              icon={<NotificationImportantOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Data
            </Typography>
            <MenuItemComp
              title="Manage Team"
              to="/admins"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItemComp
              title="Users Information"
              to="/users"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Settings
            </Typography>
            <MenuItemComp
              title="Manage Wallet"
              to="/wallet"
              icon={<WalletOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItemComp
              title="Edit Profile"
              to="/profile/edit"
              icon={<Person2Outlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <IconButton onClick={handleLogout} sx={{ marginLeft: '20px' }}>
              <LogoutOutlinedIcon />
              <Typography>Logout</Typography>
            </IconButton>
          </Box>
        </Menu>
      </ProSidebar>

      {/* {loading && <div style={{ color: 'red !important', fontSize: '25px' }}>Loading...</div>}
      {error && <div style={{ color: 'red !important', fontSize: '25px' }}>{error}</div>} */}
    </Box>
  );
};

export default Sidebar;
