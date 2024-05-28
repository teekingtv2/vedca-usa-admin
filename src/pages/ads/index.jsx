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
import { errorNotification, formatter, successNotification } from '../../utils/helpers';
import LinkButton from '../../components/global/LinkButton';
import ProgressCircle from '../../components/dashboard/ProgressCircle';

axios.defaults.withCredentials = true;

const AdPosts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useFetchCredential(`general/all-ad-posts`);

  const deleteAdPost = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/general/delete-ad-post/${id}`, {
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
      field: 'title',
      headerName: 'Ad Title',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'slug',
      headerName: 'Ad Link',
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
            <Link to={`/ad-post/${params.row._id}`}>
              <IconButton>
                <RemoveRedEyeOutlined sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
            <Link to={`/edit-ad-post/${params.row._id}`}>
              <IconButton>
                <EditOutlinedIcon sx={{ color: `${colors.grey[100]} !important` }} />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                deleteAdPost(params.row._id);
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
              title="AD POSTS MANAGEMENT"
              subtitle="You can manage; create update and delete ad posts from here"
            />
            <Box>
              <LinkButton to="/create-ad-post" title="Create New Ad" type="add" />
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

export default AdPosts;
