import React from 'react'

interface PaginationProps{
    count: number;
    page: number;
    next: number;
    prev: number;
    onNavigatePrev: ()=> void;
    onNavigate: ()=> void;
    onNavigatePrecise: (page: number)=> void;
}

function Pagination({count,page,next,prev,onNavigate,onNavigatePrev,onNavigatePrecise} : PaginationProps ) {
    const numberPage = [];
    const temp = (prev)?prev:1;
    for(let i = temp; i <= temp+2;i++){
        numberPage.push(i);
    }
    return (
        <>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={(!prev)?"page-item disabled":"page-item"}>
                    <a className="page-link" href="#" onClick={onNavigatePrev}>Previous</a>
                </li>
                {numberPage.map((item)=>(
                    <li key={item} className="page-item"><a className="page-link" href="#" onClick={()=>onNavigatePrecise(item)} >{item}</a></li>
                ))}
                <li className={(!next)?"page-item disabled":"page-item"}>
                    <a className="page-link" href="#" onClick={onNavigate}>Next</a>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Pagination
