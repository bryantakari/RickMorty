import LocationChange from './LocationChange';
import ResidentLocation from './ResidentLocation';
interface ListLocationProps{
    locations: [];
    doSomething : (idSelect:number,name:string)=>void;
    idSelected : number;
}
const ListLocation = ({locations,idSelected,doSomething} : ListLocationProps) => {
  console.log(idSelected);
  return locations.map(({ id,name,residents }) => (
    <ResidentLocation idSelected={idSelected} nameResident={name} id={id} resident={residents} doSomething={doSomething}/>
));
}


export default ListLocation