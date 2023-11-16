import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Pagination from './Pagination';
import ListLocation from './ListLocation';

interface LocationGroupProp{
    doSomething : (idSelected:number,name:string)=> void;
    idSelectedLocation: number;
}

const LocationGroup = ({doSomething,idSelectedLocation}:LocationGroupProp) => {
    const [currentPage,setCurrentPage] = useState(1);
    let GET_LOCATION = gql`
      query location($page: Int){
        locations(page:$page){
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
    const { loading, error, data, fetchMore } = useQuery(GET_LOCATION,{
        variables:{currentPage}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  const navigatePage = ()=>{
        fetchMore({
            variables:{page: currentPage+1},
            updateQuery:(prevResult,{fetchMoreResult})=>{
                return fetchMoreResult;
            }
            
        });
        setCurrentPage(currentPage+1);
    }

    const navigatePagePrev = ()=>{
        
        
        fetchMore({
            variables:{page: currentPage-1},
            updateQuery:(prevResult,{fetchMoreResult})=>{
                return fetchMoreResult;
            }
        });
        
        setCurrentPage(currentPage-1);
    }
    const navigatePagePrecise = (destinationPage : number)=>{
        fetchMore({
            variables:{page: destinationPage},
            updateQuery:(prevResult,{fetchMoreResult})=>{
                return fetchMoreResult;
            }
        });
        
        setCurrentPage(destinationPage);
    }
    
    console.log("idSelectionGroup: "+idSelectedLocation);

    return (
        <>
            <div className="container">
                
                <div className="row">
                    <ListLocation idSelected={idSelectedLocation} doSomething={doSomething} locations={data.locations.results}></ListLocation>
                </div>
                <Pagination onNavigatePrecise={navigatePagePrecise} onNavigate={navigatePage} onNavigatePrev={navigatePagePrev} count={data.locations.info.count} page={data.locations.info.pages} next={data.locations.info.next} prev={data.locations.info.prev}/>
            </div>
            
        </>
    )
    }
export default LocationGroup