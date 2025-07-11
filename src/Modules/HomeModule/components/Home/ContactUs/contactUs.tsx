
import Grid from "@mui/material/GridLegacy";
import {
  Box,
  Typography,
  Container,
  Stack,
  Divider,
  IconButton
} from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram } from "@mui/icons-material";

export default function ContactUs() {
  return (
    <div>
    
      
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom color="#393280">
          Contact Us
        </Typography>
        <Typography variant="h6" color="textSecondary">
          We'd love to hear from you! Get in touch with our team.
        </Typography>
      </Box>

    {/* Main Content Section */}
<Container sx={{ py: 4 }}>
  <Grid container spacing={4}>
    {/* Image Left - Half Width */}
    <Grid item xs={12} md={6}>
      <Box
        component="img"
        src="../../../../../public/img-contact.jpg" 
        alt="About Us"
        sx={{ 
          width: "100%",
          maxHeight: '440px', 
          borderRadius: 1,
          objectFit: 'cover'
        }}
      />
    </Grid>

    {/* Contact Information Right - Half Width */}
    <Grid item xs={12} md={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="#393280">
        Our Contact Details
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Stack spacing={3}>
          {/* Email */}
          <Box display="flex" alignItems="center">
            <Email color="primary" sx={{ mr: 2, fontSize: 30 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold">Email</Typography>
              <Typography variant="body2" color="textSecondary">
                info@bookstore.com
              </Typography>
            </Box>
          </Box>
          
          {/* Phone */}
          <Box display="flex" alignItems="center">
            <Phone color="primary" sx={{ mr: 2, fontSize: 30 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold">Phone</Typography>
              <Typography variant="body2" color="textSecondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Box>
          
          {/* Address */}
          <Box display="flex" alignItems="center">
            <LocationOn color="primary" sx={{ mr: 2, fontSize: 30 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold">Address</Typography>
              <Typography variant="body2" color="textSecondary">
                123 Book Street, Library District<br />
                New York, NY 10001
              </Typography>
            </Box>
          </Box>
        </Stack>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Social Media */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Facebook" color="primary">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" color="primary">
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram" color="primary">
              <Instagram />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Grid>
  </Grid>
</Container>

      {/* Map Section */}
      <Box sx={{ py: 5, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#393280" textAlign="center">
            Our Location
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510234!2d-73.9878449241641!3d40.74844047138961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sx={{ mt: 3 }}
          />
        </Container>
      </Box>
    </div>
  );
}