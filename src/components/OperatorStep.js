import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function OperatorStep(props){
   
    return ( 
    
        <Select defaultValue={'Select an operator'} style={{ width: 200 }} onChange={props.handleOnChange}>
           {props.operators.map(e=>{
               return <Option key={e.id} value={e.id}>{e.name}</Option>
           })}
        </Select>
    )
}