import { Typography, Box, IconButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Header from '../../components/global/Header';
import axios from 'axios';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import {
  dateFormatter,
  errorNotification,
  formatter,
  successNotification,
} from '../../utils/helpers';
import LinkButton from '../../components/global/LinkButton';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useFetchCredential(`general/all-donations`);

  console.log('data:', data?.data);

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 1,
      renderCell: ({ row: { createdAt } }) => {
        return <Box>{dateFormatter(createdAt)}</Box>;
      },
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 0.7,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 0.7,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'left',
      flex: 1,
      align: 'left',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      renderCell: ({ row: { amount } }) => {
        return <Box>{formatter.format(amount)}</Box>;
      },
    },
    {
      headerName: 'Actions',
      flex: 1.2,
      align: 'left',
      field: '_id',
      renderCell: (params) => {
        return (
          <Box
            m="0 0 0 0"
            p="5px 0"
            display="flex"
            justifyContent="space-between"
            borderRadius="4px"
          >
            <Link to={`/donation-details/${params.row._id}`}>
              <IconButton>
                <RemoveRedEyeOutlined sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Head pageTitle="Donations" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DONATIONS" subtitle="Managing the donations we have received" />
          </Box>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                fontSize: '14px',
              },
              '& .name-column--cell': {
                color: colors.greenAccent[300],
                fontSize: '14px',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: colors.blueAccent[700],
                borderBottom: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: colors.primary[400],
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colors.blueAccent[700],
              },
              '& .MuiCheckbox-root': {
                color: `${colors.greenAccent[200]} !important`,
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${colors.grey[100]} !important`,
                margin: '0 0 10px 0',
              },
              '& MuiCheckbox-root': {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            {loading && <ProgressCircle progress="0.5" />}
            {error && <div style={{ color: 'red !important', fontSize: '20px' }}>{error}</div>}
            {data && (
              <DataGrid
                rows={data.data}
                columns={columns}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => {
                  return row._id;
                }}
              />
            )}
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Donations;
