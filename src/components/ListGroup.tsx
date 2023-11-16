import { useNavigate } from "react-router-dom";

interface ListGroupProps{
    characters: [];
    charNamePass: (name:string)=> void;
}

function ListGroup({characters,charNamePass}: ListGroupProps){
    const navigate = useNavigate();
   const navigateDetailPage = (idChar:number,charName:string)=>{
        charNamePass(charName);
        navigate('/detail',{state:{id:idChar,name:charName}});

   }
    
    
    return characters.map(({ id, name, image }) => (
        <div key={id} className=" col-sm-3">
            <div className="d-flex justify-content-center">
                <div  className="character-card card m-3 p-2" style={{width: "15rem"}} onClick={()=>{navigateDetailPage(id,name)}}>
                    <img className="card-img-top " src={`${image}`}/>
                    <div className="card-body">
                        <h5 className="card-title text-center">{name}</h5>
                    </div>
                </div>
            </div>
        </div>
        
    ));
    
}
export default ListGroup;