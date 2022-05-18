import React from 'react';
import BtnRender from './BtnRender';
import './theatercard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TheaterCard({theater, isAdmin, deleteTheater, handleCheck}) {

    return (
        <div className="product_card">
            

        <div className="cardItem">
        {
                isAdmin && <input type="checkbox" checked={theater.checked}
                onChange={() => handleCheck(product._id)} />
            }
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={theater.images.url}
          alt={theater.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {theater.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {theater.name}
          </Typography>
        </CardContent>
        <CardActions>
        <BtnRender theater={theater} deleteTheater={deleteTheater} />
        </CardActions>
      </Card>
        </div>
    
       
           
        </div>
    )
}

export default TheaterCard;