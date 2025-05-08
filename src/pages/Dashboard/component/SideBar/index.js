import React from 'react'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SvgIcon,
    Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link, useLocation } from 'react-router-dom';

const items = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <DashboardIcon />
    },
    {
        title: 'Search Score',
        path: '/score',
        icon: <PeopleIcon />
    },
    {
        title: 'Report',
        path: '/report',
        icon: <LeaderboardIcon />
    }
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <Drawer
            anchor="left"
            open
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', bgcolor: "#121621", color: "#b3b9c6" },
            }}
        >
            <Box  sx={{ p: 2 }} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
                <img src="https://goldenowl.asia/_next/static/media/golden_owl.881f6e7a.svg"
                 alt="Go Logo"/>
                <Typography variant="h6" fontWeight="bold">GO Scores</Typography>
            </Box>
            <List>
                {items.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>
                                {React.cloneElement(item.icon, { sx: { color: '#fff' } })}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
