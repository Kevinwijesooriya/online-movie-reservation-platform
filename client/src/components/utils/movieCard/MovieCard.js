import React from 'react';
import BtnRender from './BtnRender';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MovieCard({movie, isAdmin, deleteMovie, handleCheck}) {

    return (
        <div className="product_card">
            

        <div className="cardItem">
        {
                isAdmin && <input type="checkbox" checked={movie.checked}
                onChange={() => handleCheck(movie._id)} />
            }
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          //image={movie.images.url}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {movie.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
          {movie.duration}h
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {movie.description}
          </Typography>
        </CardContent>
        <CardActions>
        <BtnRender movie={movie} deleteMovie={deleteMovie} />
        </CardActions>
      </Card>
        </div>
    
       
           
        </div>
    )
}

export default MovieCard;