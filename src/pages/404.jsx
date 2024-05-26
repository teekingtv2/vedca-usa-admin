import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #70d8bd
`;

const NotFound = () => {
    return <Box 
        height="100%" 
        width="100%" 
        display="flex" 
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingBottom="200px"
    >
        <Typography variant="h1" paddingBottom="20px">
            Error 404!!!
        </Typography>
        <Typography textAlign="center" sx={{fontSize:"16px"}}>
            The page you are trying to reach does not exist. <br />
        </Typography>
        <Typography variant="h4" textAlign="center" paddingTop="10px">
            Go backe to <StyledLink to="/" >Homepage</StyledLink>
        </Typography>
    </Box>
}
 
export default NotFound;