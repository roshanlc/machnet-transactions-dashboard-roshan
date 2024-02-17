import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentIcon from "@mui/icons-material/Payment";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function AppDrawer() {

    // For highlighting the active link
    const location = useLocation();
    const pathname = location.pathname;

    const navigate = useNavigate();

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem key="home" disablePadding className={pathname === "/home" ? "active" : ""}>
                    <ListItemButton
                        onClick={() => {
                            navigate("/home");
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key="transx" disablePadding className={pathname === "/" ? "active" : ""} >
                    <ListItemButton
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <ListItemIcon>
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Transactions *"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key="payments" disablePadding className={pathname === "/payments" ? "active" : ""}>
                    <ListItemButton
                        onClick={() => {
                            navigate("/payments");
                        }}
                    >
                        <ListItemIcon>
                            <LocalAtmIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Payments"} />
                        <KeyboardArrowDown />
                    </ListItemButton>
                </ListItem>

                <ListItem key="cards" disablePadding className={pathname === "/cards" ? "active" : ""}>
                    <ListItemButton
                        onClick={() => {
                            navigate("/cards");
                        }}
                    >
                        <ListItemIcon>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Cards"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key="capital" disablePadding className={pathname === "/capital" ? "active" : ""}>
                    <ListItemButton
                        onClick={() => {
                            navigate("/capital");
                        }}
                    >
                        <ListItemIcon>
                            <QueryStatsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Capital"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key="accounts" disablePadding className={pathname === "/accounts" ? "active" : ""}>
                    <ListItemButton
                        onClick={() => {
                            navigate("/accounts");
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Accounts"} />
                        <KeyboardArrowDown />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="logout" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}