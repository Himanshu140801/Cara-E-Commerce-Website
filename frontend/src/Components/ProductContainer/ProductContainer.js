import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./ProductContainer.css";

const ProductContainer = ({filter}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mainLoad, setMainLoad] = useState(false);
  // const [filteredProduct, setFilteredProduct] = useState([]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting count");
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Can not load more!");
    }
  };
  useEffect(() => {
    if (page === 1) return;
    LoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getAllProducts = async () => {
    try {
      setMainLoad(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data?.success) {
        setProducts(data.products);
        
        
      } else {
        toast.error(data?.message);
      }
      setMainLoad(false);
    } catch (error) {
      setMainLoad(false);
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    if(page) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // const filterProducts = () => {
  //   console.log(filter);
  //   setFilteredProduct([]);
  //   products.forEach((p)=> {
  //     if(p.star === filter){
  //       setFilteredProduct((prev) => [...prev, p]);
  //     }
  //   })
  //   // products.filter((p) => p.star === filter && setFilteredProduct([...filteredProduct, p]));
  // }

  // useEffect(() => {
  //   if(filter) filterProducts();
  // }, [filter])

  return (
    <div id="home-products">
      <h1>Featured Products</h1>
       <div>
        <div className="pro-container section-p1">
          {/* {filter === "" ? products.map((p) => (
            <SingleProduct key={p._id} id={p._id} slug={p.slug} loading />
          )) : filteredProduct.map((p) => (
            <SingleProduct key={p._id} id={p._id} slug={p.slug} loading />
          ))} */}
          {products.map((p) => (
            <SingleProduct key={p._id} id={p._id} slug={p.slug} loading />
          ))}
        </div>
        <div className="loadmore">
          {products && products.length < total && (
            <button
              className="normal loadmore-btn"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "LoadMore"}
            </button>
          )}
        </div>
      </div> 
    </div> 
  );
};

export default ProductContainer;
