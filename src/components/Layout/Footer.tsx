import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom>
              FerrellCatManager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Making cat management simple and effective
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-end' },
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                About
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Privacy
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5 }}
        >
          Made with <Heart size={16} color="red" fill="red" /> by Ferrell Shelters
          <br />
          © {currentYear} FerrellCatManager. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;