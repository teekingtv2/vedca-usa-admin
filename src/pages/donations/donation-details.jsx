import { Box, Typography, Card, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/global/Header';
import { useParams } from 'react-router-dom';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { dateFormatter, formatter } from '../../utils/helpers';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

const DonationDetails = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`general/single-donation/${id}`);

  return (
    <>
      <Head pageTitle="Donation Details" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Details of - ${
                data ? data.data.first_name + "'s donation" : 'Donation details'
              }`}
              subtitle={`Here is the donation details as done by ${data && data.data.first_name}`}
            />
          </Box>

          <Box marginTop="60px" display="flex" justifyContent="center" alignItems="center">
            <Box
              backgroundColor={colors.primary[400]}
              width={isNoneMobile ? '50%' : '100%'}
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Donated by:</Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {`${data.data.first_name} ${data.data.last_name}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Done on:</Typography>
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Amount donated:</Typography>
                      <Typography
                        sx={{
                          color: `${colors.greenAccent[200]}`,
                          fontWeight: '600',
                          fontSize: '18px',
                        }}
                      >
                        {formatter.format(data.data.amount)}
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
                      <Typography sx={{ color: `${colors.grey[200]}` }}>
                        Donator's address:
                      </Typography>
                      <Typography sx={{ color: `${colors.grey[200]}`, fontWeight: '600' }}>
                        {data.data.address}
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

export default DonationDetails;
