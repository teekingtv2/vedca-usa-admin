import { Box, IconButton, useTheme, InputBase } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorNotification, successNotification } from '../../utils/helpers';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const history = useNavigate();

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
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search box */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>

        <Link to="/transactions">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Link>

        <Link to="/profile">
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Link>

        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
