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
import { formatter, successNotification } from '../../utils/helpers';
import LinkButton from '../../components/global/LinkButton';
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

const UserProfile = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`user-management/fetch-single-user/${id}`);

  const copyText = () => {
    const txt = data && data.data.wallet;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`${data && data.data.network} wallet address copied`);
  };

  return (
    <>
      <Head pageTitle="User Account" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`User - ${
                data ? data.data.name.split(' ')[0] + "'s Profile" : 'User Profile'
              }`}
              subtitle={`Here is the User Profile Page for ${data && data.data.name}`}
            />
          </Box>

          <Box marginTop="60px" display="flex" justifyContent="center" alignItems="center">
            <Box
              backgroundColor={colors.primary[400]}
              width={isNoneMobile ? '60%' : '100%'}
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
                        Access level: User
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Name:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.name}
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Country:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.country}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Phone Number:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.phone}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Wallet:</Typography>
                      <Typography
                        onClick={copyText}
                        sx={{ color: `${colors.greenAccent[200]}`, fontWeight: '600' }}
                      >
                        {data.data.wallet}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Chain network:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.network}
                      </Typography>
                    </Box>

                    <Box textAlign="center" padding="5px" sx={{ margin: '20px 0 5px 0px' }}>
                      <Typography
                        sx={{ color: `${colors.grey[200]}`, fontWeight: 'bold', fontSize: '20px' }}
                      >
                        Account Balances
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>
                        Total Deposited:
                      </Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {formatter.format(data.data.deposite_balance)}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Total Profit:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {formatter.format(data.data.profit_balance)}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Total Balance:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {formatter.format(data.data.total_balance)}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ margin: '20px 0' }}
                    >
                      <LinkButton
                        to={`/add-transaction/${data.data._id}`}
                        title="Add Transaction"
                        type="add"
                      />
                      <LinkButton
                        to={`/update-balance/${data.data._id}`}
                        title="Update Balance"
                        type="user"
                      />
                      <LinkButton
                        to={`/edit-user/${data.data._id}`}
                        title="Edit Profile"
                        type="user"
                      />
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

export default UserProfile;
