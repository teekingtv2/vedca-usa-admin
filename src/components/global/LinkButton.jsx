import { Box, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tokens } from '../../theme';
import { DeleteForever, PersonAddOutlined, PlusOne, Settings } from '@mui/icons-material';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LinkButton = ({ to, title, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <StyledLink to={to}>
      <Box
        sx={
          type === 'add'
            ? {
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
              }
            : type === 'user'
            ? {
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }
            : type === 'delete'
            ? {
                backgroundColor: colors.redAccent[700],
                color: colors.grey[100],
              }
            : {
                backgroundColor: colors.pinkAccent[700],
                color: colors.grey[100],
              }
        }
        className="btn"
      >
        {type === 'add' ? (
          <PlusOne sx={{ mr: '10px' }} />
        ) : type === 'user' ? (
          <PersonAddOutlined sx={{ mr: '10px' }} />
        ) : type === 'delete' ? (
          <DeleteForever sx={{ mr: '10px' }} />
        ) : (
          <Settings sx={{ mr: '10px' }} />
        )}
        {title}
      </Box>
    </StyledLink>
  );
};

export default LinkButton;
