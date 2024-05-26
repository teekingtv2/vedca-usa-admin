import { Typography, Box, IconButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import Header from '../../components/global/Header';
import styled from 'styled-components';

import axios from 'axios';
import useFetchCredential from '../../api/useFetchCredential';
import Head from '../../components/global/Head';
import Sidebar from '../../components/global/sidebar/Sidebar';
import Topbar from '../../components/global/Topbar';
import { errorNotification, successNotification } from '../../utils/helpers';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Admins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useFetchCredential(`admin-management/fetch-all-admins`);

  const deleteTeamMember = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/admin-management/delete-admin/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('response', response);
          if (response.status === 200) {
            successNotification('Successfully deleted admin record');
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
      // field: 'username',
      headerName: 'Avatar',
      flex: 0.6,
      renderCell: () => {
        return (
          <Box>
            <img
              height="30px"
              width="30px"
              src="/assets/images/user.avif"
              alt=""
              style={{ cursor: 'pointer' }}
            />
          </Box>
        );
      },
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
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
      field: 'status',
      headerName: 'Status',
      flex: 1.3,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 0 0 0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={status === 'Active' ? colors.blueAccent[400] : colors.redAccent[700]}
            borderRadius="4px"
          >
            {status === 'Active' ? <AdminPanelSettingsOutlinedIcon /> : <LockOpenOutlinedIcon />}
            <Typography
              color={status === 'Active' ? colors.grey[100] : colors.grey[100]}
              sx={{ ml: '5px' }}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Actions',
      flex: 0.7,
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
            <Link to={`/admin-profile/${params.row._id}`}>
              <IconButton>
                <RemoveRedEyeOutlined sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
            <Link to={`/edit-profile/${params.row._id}`}>
              <IconButton>
                <EditOutlinedIcon sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                deleteTeamMember(params.row._id);
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
      <Head pageTitle="App Admins" />
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box className="main" m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="APP ADMINS" subtitle="Managing the Team Members" />
            <Box>
              <StyledLink to="/add-admin">
                <Box
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textDecoration: 'none !important',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 20px',
                    borderRadius: '4px',
                  }}
                >
                  <PersonAddOutlined sx={{ mr: '10px' }} />
                  Add New Team Member
                </Box>
              </StyledLink>
            </Box>
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
                  return row.email;
                }}
              />
            )}
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Admins;
