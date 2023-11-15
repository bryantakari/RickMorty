import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
useLocation
const DetailPage = () => {
  const location = useLocation();
  const charName = location.state.name;
  const navigate = useNavigate();
  
  

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
    const { loading, error, data,refetch } = useQuery(GET_DETAIL,{
        variables:{charName}
    });
    if(!data){
      refetch({name:charName});
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const detailChar = data.characters.results[0];
  return (
    <>
    <div className='bg-dark text-light p-2'><button className="btn btn-primary" onClick={()=>navigate(-1)}>Back</button><h1 className='text-center'>Detail Page</h1></div>
    <div className="container">
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
            </div>
        </div>
        
        
      </div>
    </div>
    </>
  )
}

export default DetailPage