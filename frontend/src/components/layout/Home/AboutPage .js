import React from 'react';
import "./About.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AboutPage  = () => {
  return (
     <section>
           <div className='about__hero'>
                  <h1>About Me</h1>  
                  <p>What I Do ?</p> 
           </div>

           <div className='row'>

              <div className='content__box'>
                   <h3>SUVA DULEY</h3>
                   <p>Hi , I am Suva Duley . I am  currently pursuing my B.E in computer science Engineering  in Burdwan.
                    I Love to do competitive programing and buildig web & mobile application . 
                    Always curious and  hungry to learn more with positive atttitude .
                   </p>


                   <div className='content__row'>

    <Card className='card'>
     
      <CardContent>
        <Typography className="text" gutterBottom variant="h5" component="div">
      Full satck Web developer
        </Typography>
        <Typography className="text" variant="body2" color="text.secondary">
          Html , css , javascript , React.js , Node.js , Dajngo , Docker ,
          Git and Github , Tailwindcss , matrial -ui 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Hire Me</Button>
       
      </CardActions>
    </Card>

    <Card className='card'>
     
     <CardContent>
       <Typography className="text" gutterBottom variant="h5" component="div">
       software Engineer
       </Typography>
       <Typography className="text" variant="body2" color="text.secondary">
         DBMS , Networking , Windows , Linux , OOPS , OS
       </Typography>
     </CardContent>
     <CardActions>
       <Button size="small">Hire Me</Button>
      
     </CardActions>
   </Card>

   <Card className='card'>
     
     <CardContent>
       <Typography gutterBottom variant="h5" component="div">
        Competitive programer
       </Typography>
       <Typography variant="body2" color="text.secondary">
        C++ , python
       </Typography>
     </CardContent>
     <CardActions>
       <Button size="small">Hire Me</Button>
      
     </CardActions>
   </Card>
                      
                   </div>



                  
              </div>

           </div>

    
    
     </section>
  )
}

export default AboutPage 