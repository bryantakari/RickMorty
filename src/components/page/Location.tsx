import React,{ useState } from 'react';
import LocationGroup from '../LocationGroup';
import { useQuery,gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const Location = () => {
    const navigate = useNavigate();
    const [selectedLocation,setSelectedLocation] = useState(-1);
    let GET_LOCATION_RESIDENTS = gql`
            query location($name:String){
                locations(filter:{name:$name}){
                    info {
                    count
                    pages
                    next
                    prev
                    },results {
                    id,name,residents {
                        id,name
                    }
                    }
                }
            
            }
        `;
    
    const locationGetFunction = (idLocation:number,name: string)=>{
        
        
        if(selectedLocation === idLocation){
            setSelectedLocation(-1);
        }else{
            setSelectedLocation(idLocation);
        }
    }
    const navigateLocationPage = ()=>{
       
        navigate('/');

   }
  return (
    <>
        
        <div className='bg-dark text-light p-2'><h1 className='text-center'>Location List Page</h1></div>
        <div className='container'>
        <button className="btn btn-outline-secondary" type="button" onClick={()=>navigateLocationPage()}>Go To Location List</button>
            <LocationGroup idSelectedLocation={selectedLocation} doSomething={locationGetFunction}/>
        </div>
    </>
  )
}

export default Location