
import { Box, Link, Typography } from "@mui/material";
import { styles } from "../styles/styles";
import Logo from "/assets/cloudy.png";
import LinkedIn  from "@mui/icons-material/LinkedIn";
const Header = () => (
    <Box sx={styles.header}>
      <Box component="img" sx={styles.logo} alt="logo" src={Logo} />
     {/* <Typography  fontWeight={700} color="white" variant="h3">Weather App</Typography> */}
      <Link
        href="https://www.linkedin.com/in/faisal-mujtaba"
        target="_blank"
        underline="none"
        sx={styles.linkedInLink}
      >
        <LinkedIn sx={styles.linkedInIcon} />
      </Link>
  </Box>
);
export default Header;
