import { styles } from "../styles/styles";
import LoadingBox from "./LoadingBox";
import { Box, Typography } from "@mui/material";
const LoadingMessage = () => (
  <Box sx={styles.loadingBox}>
    <LoadingBox value="1">
      <Typography variant="h3" component="h3" sx={styles.loadingText}>
        Loading...
      </Typography>
    </LoadingBox>
  </Box>
);
export default LoadingMessage;
