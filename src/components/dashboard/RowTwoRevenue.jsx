import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import LineChart from '../global/LineChart';

const RowTwoRevenue = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
      <Box mt="25px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Investments Chart
          </Typography>
          <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
            $xx,xxx.xx
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <DownloadOutlinedIcon sx={{ fontSize: '26px', color: colors.greenAccent[500] }} />
          </IconButton>
        </Box>
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        <LineChart isDashboard={true} />
      </Box>
    </Box>
  );
};

export default RowTwoRevenue;
