import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Context/search";
import "./SearchInput.css";
// import {debounce} from "lodash";
// import SearchSuggestion from "../SearchSuggestion";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  // const [suggestion, setSuggestion] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(values.keyword === "" || values.keyword[0] === "." || values.keyword[0] === "/" || values.keyword[0] === '\\' || values.keyword[0] === "#" || values.keyword[0] === "?"){
        return;
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data.result });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchSuggestions = async(query) => {
  //   try {
  //     if(values.keyword === "" || values.keyword[0] === "." || values.keyword[0] === "/" || values.keyword[0] === '\\' || values.keyword[0] === "#" || values.keyword[0] === "?"){
  //       return;
  //     }
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
  //     );
  //     console.log(data);
  //     data?.result?.forEach((p) => {
  //       setSuggestion((prev) => [...prev, p]);
  //     })
  //     data?.categorySugg?.forEach((p) => {
  //       setSuggestion((prev) => [...prev, p]);
  //     })
  //     console.log("suggestion", suggestion)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const debouncedSearch = debounce(fetchSuggestions, 500);

  // useEffect(() => {
  //   if(values){
  //     debouncedSearch(values);
  //   }
  //   else{
  //     setSuggestion([]);
  //   }
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [values]);

  return (
    <div className="d-flex flex-column mb-100">
      <div className="search-box mb-10">
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>  
      </div>
      {/* <div className="my-auto">
      {suggestion && suggestion.map((p, i) => (
        <li key={i}>
        <SearchSuggestion key={i} product={p} />
        </li>
      ))}
      </div> */}
    </div>
  );
};

export default Search;
