import React, { useState } from 'react';
import { Typography, Button, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import repair_image from '../../Data/images/drone-repair.png';
import spraying_image from '../../Data/images/spraying-img.png';


const ServiceRequestForm = () => {
    const navigate = useNavigate();
    const handleDroneRepairRedirect = () => {
        navigate('/drone-repair-form');
    };
    const handleDroneSprayingRedirect = () => {
        navigate('/drone-spraying-form');
    };
    const handleFeedbackForm = () => {
        navigate('/feedback-form');
    };
    return (
        <div>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{
                    color: '#fff',
                    fontWeight :"bold",
                    fontSize : "3rem",
                    marginBottom: '1rem',
                    backgroundImage: `url('https://static.producer.com/wp-content/uploads/2022/06/08164957/11-3-col_GettyImages-1154644875.jpg')`,
                    backgroundSize: 'cover',
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity here

                }}
            >
                How can Agrivimaan company help you?
            </Typography>

            <Container maxWidth="lg">
                <div>
                    <Grid container spacing={4} style={{ backgroundColor: '#ccc', padding: '2rem' }}>
                        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <figure>
                                <img src={repair_image} alt="Figure" style={{ maxWidth: '80%', height: 'auto', borderRadius: '10px' }} />
                            </figure>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="body1" align="center" style={{ color: '' }}>
                                A gust of wind? Perhaps it was a telephone wire you just didn’t see. Or maybe the propeller wasn’t on all the way (this may or may not have actually happened to a Drone Repair Technician). Stuff happens. Especially to really expensive drones. Especially when you really need them. Thats why the Drone Repair Company was started. Because stuff happens. We can help. We offer a 30 day warranty on all parts and labor. Please call us to set up a diagnosis!
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleDroneRepairRedirect}>
                                Set Up a Repair
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={4} style={{ backgroundColor: '#ccc', padding: '2rem' }}>
                        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <figure>
                                <img src={spraying_image} alt="Figure" style={{ maxWidth: '80%', height: 'auto', borderRadius: '10px' }} />
                            </figure>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="body1" align="center" style={{ color: '' }}>
                                Our drone spraying service offers unparalleled efficiency and accuracy, ensuring optimal coverage and minimal waste. By leveraging state-of-the-art drones equipped with precision spraying systems, we deliver targeted application of fertilizers, pesticides, and herbicides with pinpoint accuracy.

                                Say goodbye to traditional methods that are time-consuming, labor-intensive, and often result in uneven application. With our drone spraying service, you can maximize your crop yield while minimizing costs and environmental impact.                        </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleDroneSprayingRedirect}>
                                Raise Chemical Spraiying Request
                            </Button>
                            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleFeedbackForm}>
                                FeedbacKForm</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default ServiceRequestForm;
