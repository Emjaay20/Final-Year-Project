import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme, IconButton, Drawer } from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import CloseIcon from "@mui/icons-material/Close";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const linkStyle = (item: string) => ({
    color: selected === item ? "white" : palette.grey[700],
    textDecoration: "none",
    fontWeight: selected === item ? "bold" : "normal",
    borderBottom: selected === item ? "2px solid white" : "none",
    paddingBottom: "2px", // Adds spacing for better visibility
    display: "inline-block", // Ensures underline matches text width
    width: "fit-content", // Prevents underline from stretching
  });

  return (
    <FlexBetween
      sx={{
        mb: "0.25rem",
        p: "0.5rem 1rem",
        color: palette.grey[300],
        width: "100%",
      }}
    >
      {/* Left Side */}
      <FlexBetween gap="0.75rem">
        <MonitorHeartIcon sx={{ fontSize: { xs: "22px", sm: "28px" } }} />
        <Typography variant="h5" sx={{ fontSize: { xs: "16px", sm: "20px" } }}>
          Dashboard
        </Typography>
      </FlexBetween>

      {/* Right Side - Desktop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1.5rem" }}>
        <Link to="/" onClick={() => setSelected("dashboard")} style={linkStyle("dashboard")}>
          Dashboard
        </Link>

        <Link to="/Predictions" onClick={() => setSelected("predictions")} style={linkStyle("predictions")}>
          Predictions
        </Link>

        <a href="https://sepolia.etherscan.io/address/0xcbead4bb8a2ee09b9060101fe48812db0df1a079"
          target="_blank" rel="noopener noreferrer"
          onClick={() => setSelected("blockchain")}
          style={linkStyle("blockchain")}
        >
          Blockchain
        </a>
      </Box>

      {/* Mobile Menu Icon */}
      <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer}>
        <MenuIcon sx={{ color: palette.grey[300] }} />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 200, height: "100vh", bgcolor: palette.background.default, p: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>

          <Box display="flex" flexDirection="column" gap="1rem">
            <Link to="/" 
              onClick={() => { setSelected("dashboard"); toggleDrawer(); }} 
              style={linkStyle("dashboard")}
            >
              Dashboard
            </Link>

            <Link to="/Predictions" 
              onClick={() => { setSelected("predictions"); toggleDrawer(); }} 
              style={linkStyle("predictions")}
            >
              Predictions
            </Link>

            <a href="https://sepolia.etherscan.io/address/0xcbead4bb8a2ee09b9060101fe48812db0df1a079"
              target="_blank" rel="noopener noreferrer"
              onClick={() => { setSelected("blockchain"); toggleDrawer(); }}
              style={linkStyle("blockchain")}
            >
              Blockchain
            </a>
          </Box>
        </Box>
      </Drawer>
    </FlexBetween>
  );
};

export default Navbar;
