import { Box, Typography, Card, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/global/Header';
import { useParams } from 'react-router-dom';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { successNotification } from '../../utils/helpers';
import LinkButton from '../../components/global/LinkButton';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

const SingleAdPost = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { data, loading, error } = useFetchCredential(`general/single-ad-post/${id}`);

  const copyAdLink = () => {
    const txt = data && `${import.meta.env.VITE_AD_WEBSITE_URL}/${data.data.slug}`;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`Ad post link copied`);
  };
  const copyWhatsAppLink = () => {
    const txt = data && data.data.whatsapp;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`WhatsApp Group link copied`);
  };
  const copyTelegramLink = () => {
    const txt = data && data.data.telegram;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`Telegram Group link copied`);
  };

  return (
    <>
      <Head pageTitle="Ad Post" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box>
            <Header
              title={`Managing Ad - ${data ? data.data.title.split(' ')[0] : 'Managing Ad Post'}`}
              subtitle={`You can manage this ad post - ${data && data.data.title} here`}
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
                      background: `${colors.primary[500]} !important`,
                      width: '100%',
                      padding: '13px 40px',
                    }}
                  >
                    <Box
                      // display="flex"
                      justifyContent="center"
                      padding="5px"
                      sx={{
                        border: `1px dashed ${colors.grey[600]}`,
                        margin: '5px 0',
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        sx={{ color: `${colors.grey[200]}`, fontSize: '24px', fontWeight: '600' }}
                      >
                        {data.data.title}
                      </Typography>
                      (Tap on links to copy them)
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Ad Post Link:</Typography>
                      <Typography
                        onClick={copyAdLink}
                        sx={{ color: `${colors.greenAccent[600]}`, fontWeight: '600' }}
                      >
                        {`${import.meta.env.VITE_AD_WEBSITE_URL}/${data.data.slug}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>WhatsApp Group:</Typography>
                      <Typography
                        onClick={copyWhatsAppLink}
                        sx={{ color: `${colors.greenAccent[600]}`, fontWeight: '600' }}
                      >
                        {data.data.whatsapp}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Typography sx={{ color: `${colors.grey[200]}` }}>Telegram Group:</Typography>
                      <Typography
                        onClick={copyTelegramLink}
                        sx={{ color: `${colors.greenAccent[600]}`, fontWeight: '600' }}
                      >
                        {data.data.telegram}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="5px"
                      sx={{ border: `1px dashed ${colors.grey[600]}`, margin: '5px 0' }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: data.data.content,
                        }}
                      ></Box>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      padding="5px"
                      sx={{ margin: '20px 0' }}
                    >
                      {/* <LinkButton
                        to={`/edit-ad-post/${data.data._id}`}
                        title="Edit Add"
                        type="pen"
                      /> */}
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

export default SingleAdPost;
