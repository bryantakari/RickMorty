import {useState}from 'react'

import ListGroup from '../ListGroup'
import { useQuery, gql } from '@apollo/client'
import Pagination from '../Pagination';
import {useNavigate } from 'react-router-dom';

interface HomePageProp{
    charNamePass : (name:string) => void;

}

const HomePage = ({charNamePass}: HomePageProp) => {
    const [currentPage,setCurrentPage] = useState(1);
    const navigate = useNavigate();
    let GET_CHARACTERS = gql`
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
    const { loading, error, data,fetchMore } = useQuery(GET_CHARACTERS,{
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
    const navigateLocationPage = ()=>{
       
        navigate('/location-list');

   }

   const charNamePassing = (name:string)=>{
        charNamePass(name);
   }
  return (
    <>
    <div className='bg-dark text-light p-2'><h1 className='text-center'>Home Page</h1></div>
    
    <div className="container">
        <button className="btn btn-outline-secondary" type="button" onClick={()=>navigateLocationPage()}>Go To Location List</button>
        <div className='row'>
            <ListGroup charNamePass={charNamePassing} characters={data.characters.results}/>
        </div>

        <Pagination onNavigatePrecise={navigatePagePrecise} onNavigate={navigatePage} onNavigatePrev={navigatePagePrev} count={data.characters.info.count} page={data.characters.info.pages} next={data.characters.info.next} prev={data.characters.info.prev}/>
    </div>
    
    
    </>
  )
}

export default HomePage