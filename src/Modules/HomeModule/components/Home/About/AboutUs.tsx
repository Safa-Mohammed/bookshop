
import {
  Box,
  Typography,
  Container,
  
} from "@mui/material";

 import Grid from "@mui/material/GridLegacy";

export default function AboutUs() {
  return (
    <div>
        
          <Box>
  {/* Hero Section */}
  <Box
    sx={{
      backgroundColor: "#f5f5f5",
      py: 6,
      textAlign: "center",
    }}
  >
    <Typography variant="h3" fontWeight="bold" gutterBottom color="#393280">
      About Us
    </Typography>
    <Typography variant="h6" color="textSecondary">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    </Typography>
  </Box>

  {/* Description Section with Image Left */}
  <Container sx={{ py: 5 }}>
    <Grid container spacing={2} alignItems="center">
      {/* Image Left */}
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src="../../../../../public/aboutimg1s.jpg" 
          alt="About Us"
          sx={{ width: "100%",maxHeight:'440px', borderRadius: 1 }}
        />
      </Grid>

      {/* Text Right */}
      <Grid item xs={12} md={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#393280">
          Who We Are
        </Typography>
        <Typography variant="body1" color="textSecondary" paddingY={2}  lineHeight={2}>
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
         Dolor, minima veniam est nihil dolore dignissimos aliquid mollitia aperiam
          . Itaque hic deleniti vero in ratione autem?
          Ipsa quam dignissimos aliquam eveniet.
         . Itaque hic deleniti vero in ratione autem?
          Ipsa quam dignissimos aliquam eveniet.
        </Typography>
      </Grid>
    </Grid>
  </Container>
</Box>

    </div>
  )
}
