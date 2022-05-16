import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MovieCard() {
  return (
    <div>
      <h1>MovieCard</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRahMdIAUM-EOFYqEUdg55XHG4JQYaskXKhDG8WeHkyZH2DXZVz"
          alt="Inception"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Inception
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Cobb steals information from his targets by entering their dreams
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Book</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default MovieCard;
