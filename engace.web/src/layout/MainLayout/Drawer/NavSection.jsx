import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { Logout, Settings } from "@mui/icons-material";
import Cookies from "js-cookie";
import { googleLogout } from "@react-oauth/google";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { chatbotActions } from "../../../redux/reducer/ChatbotReducer";
import { useDispatch } from "react-redux";

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon } = item;

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }).isRequired,
  active: PropTypes.func.isRequired,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const level = localStorage.getItem("level");
  const picture = localStorage.getItem("picture");

  const match = (path) => {
    const pathFirstPart = path.split("/")[1];
    const pathnameFirstPart = pathname.split("/")[1];
    return pathFirstPart === pathnameFirstPart;
  };

  const handleSetting = () => {
    navigate("/level");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("name");
    localStorage.removeItem("level");
    localStorage.removeItem("picture");
    googleLogout();
    dispatch(chatbotActions.resetChat());
    navigate("/auth");
  };

  return (
    <Box
      {...other}
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          padding: 1,
        }}
      >
        {picture ? (
          <Avatar alt="Avatar" src={picture}></Avatar>
        ) : (
          <AccountCircleIcon fontSize="large" sx={{ color: "black" }} />
        )}
        <Typography
          sx={{
            marginBottom: "0.2rem",
            marginTop: "0.2rem",
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Typography sx={{ marginBottom: "0.2rem" }}>
          Trình độ: {level}
        </Typography>
      </Box>
      <Divider />
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          startIcon={<Settings />}
          onClick={handleSetting}
        >
          Cài đặt
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
};
