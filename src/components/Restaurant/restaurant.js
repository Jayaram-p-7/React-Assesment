import React, { useEffect, useState } from 'react';
import csvdata from '../../data/restaurants.csv';
import Cardcontainer from '../Cardcontainer/cardcontainer';
import classes from './restaurant.module.css';

const Restaurant = (props) => {
    const [data, setData] = useState([]);
    const [tmpdata, setTmpData] = useState([]);
    useEffect(() => {
        getcsvData();
    }, [])
    async function getcsvData() {
        const arr = [];
        const response = await fetch(csvdata);
        const resdata = await response.text();
        const rowdata = resdata.split(/\n/).slice(1);
        rowdata.forEach(row => {
            const obj = {};
            const threedata = row.split(/"/);
            if (threedata.length === 1) {
                const val = threedata[0].split(/,/)
                obj.id = val[0];
                obj.name = val[1];
                obj.cuisines = val[2];
                obj.averagecost = val[3];
                obj.currency = val[4];
                obj.tablebooking = val[5];
                obj.onlinedelivery = val[6];
                obj.rating = val[7];
                obj.ratingcolor = val[8];
                obj.ratingtext = val[9];
                obj.votes = val[10];
            }
            else {
                const val1 = threedata[0].split(/,/)
                const val2 = threedata[2].split(/,/)
                obj.id = val1[0];
                obj.name = val1[1];
                obj.cuisines = threedata[1];
                obj.averagecost = val2[1];
                obj.currency = val2[2];
                obj.tablebooking = val2[3];
                obj.onlinedelivery = val2[4];
                obj.rating = val2[5];
                obj.ratingcolor = val2[6];
                obj.ratingtext = val2[7];
                obj.votes = val2[8];
            }
            arr.push(obj);
        })
        setData(arr);
        setTmpData(arr);
    }

    const search = (event) => {
        const tmpdata = [...data];
        const val = event.target.value;
        const v = tmpdata.filter(d => d.name.toLowerCase().includes(val));
        if (v.length === 0) setTmpData(tmpdata);
        else setTmpData(v)
    }
    const sortby = (event) => {
        const val = event.target.value;
        const tmp = [...data];
        if(val === 'rating'){
            tmp.sort((a,b) => a.rating> b.rating ? -1 : a.rating < b.rating ? 1 : 0);
        } else {
            tmp.sort((a,b) => a.averagecost< b.averagecost ? -1 : a.averagecost > b.averagecost ? 1 : 0);
        }
            
        setTmpData(tmp);
    }
    return (
        <div>
            <div className={classes.Topbar}>
                <input className={classes.Input} type="text" placeholder="Search by Retaurant name" onChange={search} />
                <div className={classes.Select}>
                    <select onChange={sortby}>
                        <option disabled selected>Sort By</option>
                        <option value="averagecost">averagecost</option>
                        <option value="rating">rating</option>
                    </select>
                </div>
            </div>
            <Cardcontainer datas={tmpdata} />
        </div>
    )
}

export default Restaurant;