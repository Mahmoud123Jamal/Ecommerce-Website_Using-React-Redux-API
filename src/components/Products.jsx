import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    console.log(filter);

    let componentMounted = true;

    useEffect(() => {

        const getProducts = async () => {
            setLoading(true);

            const response = await fetch ("https://fakestoreapi.com/products");
            if(componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();

    }, []);

    const Loading = () => {
        return (
            <>
                <p className='loading'>Loading...</p>
            </>
        )
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons">
                    <button className='btn' type='submit' onClick={() => setFilter(data)}>All</button>
                    <button className='btn' type='submit' onClick={() => filterProduct("men's clothing")}>Men's clothing</button>
                    <button className='btn' type='submit' onClick={() => filterProduct("women's clothing")}>Wen's clothing</button>
                    <button className='btn' type='submit' onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className='btn' type='submit' onClick={() => filterProduct("electronics")}>Electronics</button>
                </div>
                <div className="cards">
                        {filter.map((product) => {
                            return(
                                <>
                                    <div className="card" key={product.id}>
                                        <div className="card-header">
                                            <img src={product.image} alt={product.title} />
                                        </div>
                                        <div className="card-body">
                                            <h3 className="title">{product.title.substring(0, 15)}...</h3>
                                            <div className="other">
                                                <span>Rate: {product.rating.rate}</span>
                                                <span>${product.price}</span>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <Link to={`/products/${product.id}`} className='buyNow'>Buy Now</Link>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                </div>   
            </>
        )
    }

  return (
    <div className='products'>
        <div className="container">
            <div className="row rowTitle">
                <div className="col">
                    <h1 className='title'>Latest Products</h1>
                    <hr />
                </div>
            </div>
            <div className="row productsRow">
                <div className="col">
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products
