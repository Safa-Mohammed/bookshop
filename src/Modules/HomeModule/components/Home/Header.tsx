import { Facebook, Instagram, LinkedIn, Phone, RssFeed, Twitter } from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <div>
        {/* Top bar */}
            <AppBar
              position="static"
              sx={{
                backgroundColor: "#2e2172",
                height: 40,
                justifyContent: "center",
              }}
              elevation={0}
            >
              <Toolbar sx={{ minHeight: 40, px: 2 }}>
                <Box
                  sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Phone fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    +91 8374902234
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton color="inherit" size="small">
                    <Facebook fontSize="inherit" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <Instagram fontSize="inherit" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <LinkedIn fontSize="inherit" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <Twitter fontSize="inherit" />
                  </IconButton>
                  <IconButton color="inherit" size="small">
                    <RssFeed fontSize="inherit" />
                  </IconButton>
                </Stack>
              </Toolbar>
            </AppBar>
    </div>
  )
}
