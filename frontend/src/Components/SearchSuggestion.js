// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSearch } from '../Context/search';
// import axios from 'axios';
// import { result } from 'lodash';

// const SearchSuggestion = ({product}) => {
//     const navigate = useNavigate();
//     const [values, setValues] = useSearch();
//     const handleClick = async () => {
//         if(product?.category){
//             navigate(`/product/${product.slug}/${product._id}`)
//         }
//         else{
//             const { data } = await axios.get(
//                 `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
//             );
//             setValues({ ...values, results: data.result });
//             navigate("/search");
//         }
//     }
//   return (
//     <div className='bg-primary dropdown-item' onClick={handleClick}>
//         <div>{product?.name}</div>
//         <div>{product?.category?.name}</div>
//         <hr/>
//     </div>
//   )
// }

// export default SearchSuggestion
