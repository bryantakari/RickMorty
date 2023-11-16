import React from 'react'
interface LocationChangeProp{
    changeLocation : (name:string)=> void;
    nameLocation : string;
    id:number;
}
const LocationChange = ({changeLocation,nameLocation,id} : LocationChangeProp) => {
  return (
    <>
        <div key={id} className=" col-12 border m-1 location-item" onClick={()=>{changeLocation}}>
            <div className="row">
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            <h5>{nameLocation}</h5>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </>
  )
}

export default LocationChange