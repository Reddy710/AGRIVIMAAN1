// Transitions.js
import React from 'react';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" timeout={{ enter: 1000, exit: 1000 }} ref={ref} {...props} />;
});

export default Transition;
