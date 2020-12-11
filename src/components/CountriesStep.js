import React from 'react';
import { Select } from 'antd';

const { Option } = Select;


export default function CountryStep(props){

    return ( 
    
        <Select defaultValue={'Select a country'} style={{ width: 200 }} onChange={props.handleOnChange}>
           {props.countries.map(e=>{
               return <Option key={e.iso} value={e.iso}>{e.name}</Option>
           })}
        </Select>
    )
}