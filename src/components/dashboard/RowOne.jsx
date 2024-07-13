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
    data: memberCountData,
    loading: memberCountLoading,
    error: memberCountError,
  } = useFetchCredential(`member-management/fetch-all-members`);
  const {
    data: donationCountData,
    loading: donationCountLoading,
    error: donationCountError,
  } = useFetchCredential(`general/all-donations`);
  const {
    data: contactCountData,
    loading: contactCountLoading,
    error: contactCountError,
  } = useFetchCredential(`general/all-contacts`);

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
        {memberCountData && (
          <StatBox
            title={memberCountData.data.length}
            subtitle="Registered members"
            progress="0.75"
            increase="+14%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {memberCountLoading && <ProgressCircle progress="0.5" />}
        {memberCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{memberCountError}</div>
        )}
      </Box>

      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {donationCountData && (
          <StatBox
            title={donationCountData.data.length}
            subtitle="Number of donations"
            progress="0.75"
            increase="+14%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {donationCountLoading && <ProgressCircle progress="0.5" />}
        {donationCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{donationCountError}</div>
        )}
      </Box>

      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {contactCountData && (
          <StatBox
            title={contactCountData.data.length}
            subtitle="Number of queries"
            progress="0.50"
            increase="+21%"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        )}
        {contactCountLoading && <ProgressCircle progress="0.5" />}
        {contactCountError && (
          <div style={{ color: 'red !important', fontSize: '20px' }}>{contactCountError}</div>
        )}
      </Box>
    </>
  );
};

export default RowOne;
