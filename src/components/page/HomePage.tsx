import {useState}from 'react'

import ListGroup from '../ListGroup'
import { useQuery, gql } from '@apollo/client'
import Pagination from '../Pagination';
const HomePage = () => {
    const [currentPage,setCurrentPage] = useState(1);
    
    let GET_LOCATIONS = gql`
        query Char1($page: Int){
            characters(page: $page){
                info {
                    count
                    pages
                    next
                    prev
                },
                results {
                    id,
                    name,
                    image
                }
            }
        }
        `;
    const { loading, error, data,fetchMore } = useQuery(GET_LOCATIONS,{
        variables:{currentPage}
    });
    console.log("Page: "+currentPage);
    console.log(data);
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
  return (
    <>
    <div className='bg-dark text-light p-2'><h1 className='text-center'>Home Page</h1></div>
    
    <div className="container">
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search Characters Name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={()=>{console.log()}}>Button</button>
            </div>
        </div>
        <div className='row'>
            <ListGroup characters={data.characters.results}/>
        </div>

        <Pagination onNavigatePrecise={navigatePagePrecise} onNavigate={navigatePage} onNavigatePrev={navigatePagePrev} count={data.characters.info.count} page={data.characters.info.pages} next={data.characters.info.next} prev={data.characters.info.prev}/>
    </div>
    
    
    </>
  )
}

export default HomePage