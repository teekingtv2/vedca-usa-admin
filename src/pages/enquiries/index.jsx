import { Box, IconButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Header from '../../components/global/Header';

import axios from 'axios';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { dateFormatter, errorNotification, successNotification } from '../../utils/helpers';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const Enquiries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useFetchCredential(`general/all-contacts`);

  const deleteEnquiry = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/general/delete-contact/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('response', response);
          if (response.status === 200) {
            successNotification('Successfully deleted the ad post');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Made On',
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
            <Link to={`/enquiry-details/${params.row._id}`}>
              <IconButton>
                <RemoveRedEyeOutlined sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                deleteEnquiry(params.row._id);
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Head pageTitle="Ad Posts" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header
              title="Enquiries"
              subtitle="You can manage all enquiries made by people through the website from here"
            />
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

export default Enquiries;
