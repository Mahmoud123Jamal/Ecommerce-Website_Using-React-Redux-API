import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addCart } from '../redux/action';

const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    useEffect(() => {

        const getProduct = async () => {
            setLoading(true);

            const response = await fetch (`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }

        getProduct();

    }, [id]);

    const Loading = () => {
        return (
            <>
                <p className='loading'>Loading...</p>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="col">
                    <h2>{product.title}</h2>
                    <span>{product.category}</span>
                    <p>Rating {product.rating && product.rating.rate} <FontAwesomeIcon icon={faStar} /></p>
                    <p>{product.description}</p>
                    <h1>$ {product.price}</h1>
                    <button className='add' onClick={() => addProduct(product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
                </div>
            </>
        )
    }

  return (
    <div className='container product'>
        <div className="row">
            {loading ? <Loading/> : <ShowProduct/>}
        </div>
    </div>
  )
}

export default Product
