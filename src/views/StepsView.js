import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Steps, Button, Result } from 'antd';
import CountryStep from '../components/CountriesStep';
import PhoneStep from '../components/PhoneStep';
import OperatorStep from '../components/OperatorStep';
import TopUpStep from '../components/TopUpStep';


const { Step } = Steps;


export default function StepsView(props){

    const [countries, setCountries] = useState([])
    const [allOperators, setAllOperators] = useState([])
    const [operators, setOperators] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [products, setProducts] =useState([])
    const [current, setCurrent] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(null)
    const [successVisible, setSuccessVisible] = useState(false)
    const [selectedOperator,setSelectedOperator] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        if (selectedCountry){
            localStorage.setItem('country', selectedCountry)
            setOperators(allOperators.filter(o=>o.iso===selectedCountry))
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedOperator){
            localStorage.setItem('operator', selectedOperator)
            // use .find() here ?
            let arr = allProducts.filter(p=>p.id===selectedOperator)
            if (arr.length ===1){
              setProducts(arr[0].products)
            }
        }
   
    }, [selectedOperator])

    useEffect(() => {
      
        if (current){
            localStorage.setItem('current',current)
        }
    }, [current]);


    const init = () => {

        let localCurrent = localStorage.getItem('current')
        if (localCurrent){
            setCurrent(parseInt(localCurrent))
        }
        let localCountry = localStorage.getItem('country')
        if (localCountry){
            setSelectedCountry(localCountry)
        }
        let localOperator = localStorage.getItem('operator')
        if (localOperator){
            setSelectedOperator(localOperator)
        }

    };


    const steps = [

        {
          title: 'Countries',
          description:'Select a country',
          content: <CountryStep countries={countries} handleOnChange={(country)=>{
              
              setSelectedCountry(country)
            }}/>,
        },
        {
          title: 'Phone number',
          description:'Enter your phone number',
          content: <PhoneStep />,
        },
    
        {
          title: 'Operator',
          description: 'Select an operator',
          content: <OperatorStep operators={operators} handleOnChange={setSelectedOperator}/>,
        },
        {
            title: 'TopUp',
            description: 'Select a price',
            content: <TopUpStep products={products} handleOnChange={setSelectedPrice}/>,
        }
    
    ]

    const next = () => {
        setCurrent(current + 1);
        
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };

    const getJSON = () =>{
        axios.get('https://app.fakejson.com/q/xdOdc9ZF?token=M37SFqOXjnZXOBpUuOCRXA')
        .then(e=>{
            if ( e.status === 200){
                setCountries(e.data.countries)
                setAllOperators(e.data.operators)
                setAllProducts(e.data.products)
                init()
            }
        }).catch(err=>{
            console.warn(err)
        })
    }

    useEffect(() => {

        getJSON()
        
    }, []);


    if (successVisible){
        return <Result
                    status="success"
                    title={`Successfully Purchased ${selectedPrice} `}
                    extra={[
                    <Button key="buy" onClick={()=>{
                        setCurrent(0)
                        setSuccessVisible(false)
                    }}>Buy Again</Button>,
                    ]}
                />
    }


    return (
        
        <>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => setSuccessVisible(true)}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </>
    )
}