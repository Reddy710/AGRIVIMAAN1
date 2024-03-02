import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Card from '../Card';
import { services, additionalImages, carouselImages } from '../../Data/servicesData';
import Carousel from '../Carousel';
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
      <Container maxWidth="lg" style={{ height: '100vh', marginTop: '100px', marginBottom: '100px' }}>
        <Grid container spacing={10} style={{ height: '70%' }}>
          {/* Left Container (30%) */}
          <Grid item xs={12} sm={5} style={{ zIndex: 2 }}>
            <Typography variant="h4">What services are you looking for?</Typography>
            <Paper elevation={1} style={{ height: '50%', padding: '20px', boxShadow: 'none' }}>
              {/* Displaying services as cards */}
              <Grid container spacing={3}>
                {services.map((service, index) => (
                  <Grid item key={index} xs={12}>
                    <Card image={service.image} title={service.title} path={service.path} description={service.description} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Right Container (60%) */}
          <Grid item xs={12} sm={6} style={{ zIndex: 1 }}>
            <Paper elevation={3} style={{ height: '70%', width:'123%', padding: '20px', border: 'none', boxShadow: 'none' }}>
              <Grid container spacing={5}>
                {additionalImages.map((imageUrl, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <img
                      src={imageUrl}
                      alt={`Additional Image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Ensure the image covers the entire container
                        borderRadius: '10px', // Add border radius as needed
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Full-width Carousel */}
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3} style={{ height: '100%' }}>
          <Grid item xs={12}>
            <Carousel images={carouselImages} />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default LandingPage;
