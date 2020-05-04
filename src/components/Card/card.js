import React from 'react';
import classes from './card.module.css';
import img from '../../assets/oa.jpeg';

const Card = props => {
    const data = props.data;
    return <div className={classes.Card}>
        <img className={classes.Img} src={img} alt="res"/>
        <h3>{data.name}</h3>
        <p>{data.cuisines}</p>
        <p><b>Average cost : </b>{data.averagecost}</p>
        <p><b>Rating :</b> {data.rating}</p>
    </div>
}

export default Card;