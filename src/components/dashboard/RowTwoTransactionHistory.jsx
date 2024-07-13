import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import useFetchCredential from '../../api/useFetchCredential';
import { formatter } from '../../utils/helpers';
import ProgressCircle from './ProgressCircle';

const RowTwoTransactionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, loading, error } = useFetchCredential(`general/all-donations`);

  return (
    <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recent Donations
        </Typography>
      </Box>
      {data &&
        data.data
          .sort((a, b) => b._id - a._id)
          .map((donation, i) => {
            var dateString = new Date(donation.createdAt).toString();
            var splittedDateString = dateString.split(' ');
            var day = splittedDateString[0];
            var day2 = splittedDateString[1];
            var month = splittedDateString[2];
            var year = splittedDateString[3];
            var subDate = `${day}, ${day2} ${month}, ${year}`;
            return (
              <Box
                key={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                    {`${donation.first_name} ${donation.last_name}`}
                  </Typography>
                  <Typography color={colors.grey[100]}>{donation.email}</Typography>
                </Box>
                <Box color={colors.grey[100]}>{subDate}</Box>
                <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                  {formatter.format(donation.amount)}
                </Box>
              </Box>
            );
          })}
      {loading && <ProgressCircle progress="0.5" />}
      {error && <div style={{ color: 'red !important', fontSize: '25px' }}>{error}</div>}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <Link
          to="/donations"
          style={{
            color: '#fff',
            fontSize: '18px',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          View All
        </Link>
      </Box>
    </Box>
  );
};

export default RowTwoTransactionHistory;
