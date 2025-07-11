import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} >
      <Toolbar sx={{ justifyContent: 'space-between' ,padding:1}}>
        {/* Left: Red Grid Icon */}
        <IconButton sx={{ bgcolor: '#F4511E', color: 'white', borderRadius: 2 }}>
          <GridViewRoundedIcon />
        </IconButton>

        {/* Center: Grey Circle (Placeholder) */}
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'lightgray',
            borderRadius: '50%',
            margin:'auto'
          }}
        />

        {/* Right: Icons with vertical dividers */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <PersonOutlineOutlinedIcon sx={{ color: 'indigo' }} />
          </IconButton>

          <Divider orientation="vertical" flexItem />

          <IconButton>
            <ShoppingBagOutlinedIcon sx={{ color: 'indigo' }} />
          </IconButton>

          <Divider orientation="vertical" flexItem />

          <IconButton>
            <FavoriteBorderOutlinedIcon sx={{ color: 'indigo' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
