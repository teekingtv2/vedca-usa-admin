import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import PersonPincon from '@mui/icons-material/PersonPin';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StatBox from './StatBox';
import useFetchCredential from '../../api/useFetchCredential';
import { formatter } from '../../utils/helpers';
import ProgressCircle from './ProgressCircle';

const RowOne = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: userCountData,
    loading: userCountLoading,
    error: userCountError,
  } = useFetchCredential(`user-management/fetch-all-users`);
  const {
    data: adminCountData,
    loading: adminCountLoading,
    error: adminCountError,
  } = useFetchCredential(`admin-management/fetch-all-admins`);
  const {
    data: transactionCountData,
    loading: transactionCountLoading,
    error: transactionCountError,
  } = useFetchCredential(`user-management/fetch-all-transactions`);

  return (
    <>
      {/* ROW 1 */}

      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {userCountData && (
          <StatBox
            title={userCountData.data.length}
            subtitle="Registered Users"
            progress="0.75"
            increase="+14%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {userCountLoading && <ProgressCircle progress="0.5" />}
        {adminCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{adminCountError}</div>
        )}
      </Box>

      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {adminCountData && (
          <StatBox
            title={adminCountData.data.length}
            subtitle="Registered admins"
            progress="0.75"
            increase="+14%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {adminCountLoading && <ProgressCircle progress="0.5" />}
        {adminCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{adminCountError}</div>
        )}
      </Box>

      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {transactionCountData && (
          <StatBox
            title={transactionCountData.data.length}
            subtitle="Number of transactions"
            progress="0.50"
            increase="+21%"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {transactionCountLoading && <ProgressCircle progress="0.5" />}
        {transactionCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{transactionCountError}</div>
        )}
      </Box>
    </>
  );
};

export default RowOne;
