import React, { useState } from 'react'
interface ResidentLocationProp{
    nameResident:string;
    id:number;
    resident:[];
    doSomething: (idSelected: number,name:string)=> void;
    idSelected: number;
}
const ResidentLocation = ({nameResident,id,resident,doSomething,idSelected} : ResidentLocationProp) => {
    const [hidden,setHidden] = useState(false);
  return (
    <div key={id} className=" col-12 border m-1 location-item" onClick={()=>{
        doSomething(id,nameResident);
        console.log(id+" "+idSelected);
        
        }}>
        <div className="row">
            <div className='col'>
                <div className='row'>
                    <div className='col'>
                        <h5>{nameResident}</h5>
                    </div>
                </div>
                {(idSelected === id)&&(
                <div className='row'>
                    <div className='col'>
                        <hr className='m-0'/>
                        <h6 className='ml-2'>List Residents</h6>
                        <hr className='m-0'/>
                        <ul>
                            {resident.map(({id,name})=>(
                                <li key={id}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>)}
            </div>
            
        </div>
    </div>
    
  )
}

export default ResidentLocation