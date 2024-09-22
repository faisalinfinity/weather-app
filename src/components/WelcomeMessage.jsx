import { Box, Typography, SvgIcon } from "@mui/material";
import SplashIcon from "../../public/assets/splash-icon.svg";
import { styles } from "../styles/styles";
 const WelcomeMessage = () => (
  <Box sx={styles.welcomeBox}>
    <SvgIcon
      component={SplashIcon}
      inheritViewBox
      sx={{ fontSize: { xs: "100px", sm: "120px", md: "140px" } }}
    />
    {/* <SplashIcon  sx={styles.splashIcon} /> */}
    <Typography variant="h4" component="h4" sx={styles.welcomeText}>
      Explore current weather data and 6-day forecast of more than 200,000
      cities!
    </Typography>
  </Box>
);
export default WelcomeMessage;
