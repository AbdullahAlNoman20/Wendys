import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import axios from "axios";

const Products = () => {
    const [products , setProducts] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/products')
  //     .then((response) => response.json())
  //     .then((products) => setProducts(products))
      
  // }, []);

  useEffect(()=>{
    axios.get('http://localhost:5000/products',{withCredentials:true})
    .then(res => {
      setProducts(res.data)
    })
  },[])


    return (
        <div>
            <div className="text-center p-5">
        
        <h1 className="font-extrabold text-3xl">Recently We have {products.length} Products</h1>
        <p className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab animi
          quidem, nisi natus dolorem repellendus voluptas reiciendis soluta
          repellat porro doloribus assumenda quod non id cupiditate modi sit!
          Quis, odio?
        </p>
      
    </div>
    <section className="grid grid-cols-1 lg:grid-cols-3">
    {products.map(product => 
      <ProductsCard key={product.p_id} product={product}></ProductsCard>
    )}
    </section>
            
        </div>
    );
};

export default Products;