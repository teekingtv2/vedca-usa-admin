import {
  Box,
  CardContent,
  Typography,
  Card,
  useTheme,
  Badge,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme';
import Header from '../../components/global/Header';
import { Link, useParams } from 'react-router-dom';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const AdminProfile = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`admin-management/fetch-single-admin/${id}`);

  return (
    <>
      <Head pageTitle="App Admins" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Team member - ${
                data ? data.data.username + "'s Profile" : 'Team Member Profile'
              }`}
              subtitle={`Here is the User Profile Page for ${data && data.data.username}`}
            />
          </Box>

          <Box marginTop="60px" display="flex" justifyContent="center" alignItems="center">
            <Box
              backgroundColor={colors.primary[400]}
              width={isNoneMobile ? '40%' : '100%'}
              sx={{
                margin: '0px 0px 50px 0px',
              }}
            >
              {loading && <ProgressCircle progress="0.5" />}
              {error && <div style={{ color: 'red !important', fontSize: '20px' }}>{error}</div>}
              {data && (
                <Card
                  sx={{
                    background: `${colors.primary[400]} !important`,
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '1px 5px 12px 5px #000c02d8 !important;',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '50px 30px',
                    }}
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Link to={`/assets/images/user.avif`}>
                        <Avatar
                          alt={`/assets/images/user.avif`}
                          src={`/assets/images/user.avif`}
                          sx={{ width: 200, height: 200 }}
                        />
                      </Link>
                    </StyledBadge>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="h5">{data.data.fullName}</Typography>
                      <Typography
                        sx={{
                          color: `${colors.grey[200]}`,
                        }}
                      >
                        Access level: administrator
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: `${
                            data.data.status === 'Active'
                              ? colors.greenAccent[200]
                              : colors.redAccent[500]
                          }`,
                        }}
                      >
                        {data.data.status}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      background: `${colors.primary[500]} !important`,
                      width: '100%',
                      padding: '13px 40px',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Username:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.username}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Email:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.email}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              )}
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default AdminProfile;
