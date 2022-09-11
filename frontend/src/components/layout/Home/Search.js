import React,{useState,useEffect} from 'react';
import "./search.css";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getProduct} from "../../../actions/productAction"
const Search = ({history}) => {
    const [search,setSearch]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(search)
    const searchProduct=(e)=>{
       e.preventDefault();
        console.log(search)
        let keyword=search.trim();
        if(!keyword){
            alert("place seacrh product")
            return ;

        }
        navigate(`/products/${keyword}`)
    }

  return (
    <div className='search__conteiner'>
        <div className='main__container_box'>
        <form onSubmit={searchProduct}>
        <input 
             required
             value={search}
             onChange={(e)=>setSearch(e.target.value)}
             type="text" placeholder='Search a product ...' />
             <button type ="submit" className='search__btn'>
                 Search
             </button>
        </form>
          

        </div>
    
    
    
    </div>
  )
}

export default Search