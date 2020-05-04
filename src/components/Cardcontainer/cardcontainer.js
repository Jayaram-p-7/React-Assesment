import React from 'react';
import Card from '../Card/card';
import classes from './cardcontainer.module.css';

const Cardcontainer = props => {
    const datas = props.datas;
    return <div className={classes.Cardcontainer}>
        {datas.map((row,ind)=><Card key={ind} data={row}/>)}
    </div>
}

export default Cardcontainer;