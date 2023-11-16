import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import LocationGroup from '../LocationGroup'
interface DetailPageProp{
  charName: string;
}
const DetailPage = ({charName} : DetailPageProp) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [characterStorage,setCharacterStorage] = useState();
  
  let GET_DETAIL = gql`
        query Detail($name:String){
          characters(filter:{name: $name}){
            results {
              id,
              name,
              image,
              location{
                name,type,dimension,
                created
              },
              species,
              type,
              gender,
              origin{
                name,type,dimension
              },
              episode{
                episode
              },
              created
            }
          }
        }
        `;
    const { loading, error, data, refetch } = useQuery(GET_DETAIL,{
        variables:{charName}
    });
    console.log(charName);

    useEffect(()=>{
     const test = refetch({name:charName});
    },[charName]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    
    const detailChar = (localStorage.getItem(charName))?JSON.parse(localStorage.getItem(charName)):data.characters.results[0];
    console.log(detailChar);
    console.log(charName);
    localStorage.setItem(charName,JSON.stringify(detailChar));

    const changeLocation = (idSelected:number, name:string)=>{
      console.log("test");
      detailChar.location.name = name;
      setCharacterStorage(detailChar);
      localStorage.setItem(charName,JSON.stringify(detailChar));
    
    }

  return (
    <>
    <div className='bg-dark text-light p-2'><h1 className='text-center'>Detail Page</h1></div>
    
    <div className="container">
    <button className="btn btn-primary" onClick={()=>navigate('/')}>Back</button>
      <div className='d-flex justify-content-center'>
        <div  className="character-card card m-3 p-2" style={{width: "18rem"}}>
            <div className='row'>
              <div className='col'>
              <img className="card-img-top" src={`${detailChar.image}`}/>
              </div>
              
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-5">
                  <h6 className="card-title text-left">Name: </h6>
                </div>
                <div className="col-7">
                  <h6>{detailChar.name}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-title text-left">Current Location: </h6>
                </div>
                <div className="col-7">
                  <h6>{detailChar.location.name}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-title text-left">Species: </h6>
                </div>
                <div className="col-7">
                  <h6>{detailChar.species}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-title text-left">Gender: </h6>
                </div>
                <div className="col-7">
                  <h6>{detailChar.gender}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-title text-left">Origin: </h6>
                </div>
                <div className="col-7">
                  <h6>{detailChar.origin.name}</h6>
                </div>
              </div>
              <div className='row'>
                <div className="col">
                  <h5>Episode</h5>
                  <hr className='p-0 m-0' />
                </div>
                
              </div>
              <div className='row'>
                <div className="col">
                  <p>{detailChar.episode.map((item) => (item.episode+', '))}</p>
                </div>
                
              </div>
              <div>
              <div >
                    <h6>Click To Change Location</h6>
                    <hr />
                </div>
                <LocationGroup idSelectedLocation={-1} doSomething={changeLocation}></LocationGroup>
              </div>
              
            </div>
        </div>
        
        
      </div>
    </div>
    </>
  )
}

export default DetailPage