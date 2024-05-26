'use client';

import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import Head from '../../components/global/Head';
import Header from '../../components/global/Header';
import RowOne from '../../components/dashboard/RowOne';
import RowTwo from '../../components/dashboard/RowTwo';
import RowThree from '../../components/dashboard/RowThree';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Head pageTitle="Welcome Admin" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to Hedge Funds admin dashboard" />
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                }}
              >
                <DownloadOutlinedIcon sx={{ mr: '10px' }} />
                Download Reports
              </Button>
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            mt="30px"
          >
            <RowOne />

            <RowTwo />

            {/* <RowThree /> */}
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Dashboard;
