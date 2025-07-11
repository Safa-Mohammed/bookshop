
import { Box, Typography, Paper } from '@mui/material';

export default function Confirm() {
  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #FFE5E5, #F5FFFE)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h5" component="h2" color="success.main" gutterBottom>
          Payment Confirmed
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you! Your payment has been successfully processed.
        </Typography>
      </Paper>
    </Box>
  );
}
