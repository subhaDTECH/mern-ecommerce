import React from "react";
import "./Contact.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ContactPage = () => {
  return (
    <section>
      <div className="contact__hero">
        <h1>Contact Me</h1>
      </div>
      <div  className="row">
        <span>Email</span>
        <h1>subhaduleygba@gmail.com</h1>

        
      </div>
    </section>
  );
};

export default ContactPage;
