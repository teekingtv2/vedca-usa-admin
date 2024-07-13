import {
  Box,
  CardContent,
  Typography,
  Card,
  useTheme,
  Badge,
  Avatar,
  useMediaQuery,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme';
import Header from '../../components/global/Header';
import { Link, useParams } from 'react-router-dom';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { dateFormatter, errorNotification, successNotification } from '../../utils/helpers';
import LinkButton from '../../components/global/LinkButton';
import ProgressCircle from '../../components/dashboard/ProgressCircle';
import { Person2Outlined, PersonOffOutlined } from '@mui/icons-material';
import axios from 'axios';
axios.defaults.withCredentials = true;
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

const MemberProfile = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(
    `member-management/fetch-single-member/${id}`
  );

  const activateMember = async (id) => {
    console.log('clicked');
    console.log(id);
    try {
      await axios
        .put(`${import.meta.env.VITE_API_URL}/member-management/activate-member/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('done');
          console.log('response', response);
          if (response.status === 200) {
            successNotification('Member status has been successfully activated');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } catch (error) {
      console.log('error');
      console.log(error);
      errorNotification(error?.response?.data?.error);
    }
  };

  const pendMember = async (id) => {
    try {
      await axios
        .put(`${import.meta.env.VITE_API_URL}/member-management/pend-member/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('response', response);
          if (response.status === 200) {
            successNotification('Member status has been successfully pended');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Head pageTitle="Member account" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Member - ${data ? data.data.first_name + "'s Profile" : 'User Profile'}`}
              subtitle={`Here is the User Profile Page for ${data && data.data.first_name}`}
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
                      <Typography variant="h5">{`${data.data.first_name} ${data.data.first_name}`}</Typography>
                      <Typography
                        sx={{
                          color: `${colors.grey[200]}`,
                        }}
                      >
                        Access level: Member
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
                        {`${data.data.first_name} ${data.data.first_name}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Joined On:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {dateFormatter(data.data.createdAt)}
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Location:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {`${data.data.address}, ${data.data.city}, ${data.data.state}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Zip Code:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.zip_code}
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Info:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.info}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ margin: '20px 0' }}
                    >
                      {data.data.status === 'Active' ? (
                        <Button
                          onClick={() => {
                            pendMember(data.data._id);
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: colors.redAccent[700],
                              color: colors.grey[100],
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              textTransform: 'initial',
                            }}
                            className="btn"
                          >
                            <PersonOffOutlined />
                            <Typography>Pend Member</Typography>
                          </Box>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            activateMember(data.data._id);
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: colors.greenAccent[700],
                              color: colors.grey[100],
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              textTransform: 'initial',
                            }}
                            className="btn"
                          >
                            <Person2Outlined />
                            <Typography>Activate Member</Typography>
                          </Box>
                        </Button>
                      )}
                      <LinkButton
                        to={`/edit-member/${data.data._id}`}
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

export default MemberProfile;
