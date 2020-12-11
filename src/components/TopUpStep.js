import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function TopUpStep(props){

    return ( 
    
        <Select defaultValue={'Select an amount'} style={{ width: 200 }} onChange={props.handleOnChange}>
           {props.products.map((e,i)=>{
               return <Option key={i} value={e}>{e}</Option>
           })}
        </Select>
    )
}