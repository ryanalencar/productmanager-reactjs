import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const [products, setProducts] = useState(['']);
    useEffect(() => {
        axios.get(`http://localhost:3001/products`).then(res => {
            setProducts(res.data)
        });
    }, [])


    return (
        <div>
            <h1>All products</h1>
            <div className="card-columns">
                {products.map(product => (
                    <div className="card shadow" key={product.id}>
                        <div className="card-header">
                            {product.name}
                        </div>
                        <img src={product.imgUrl} alt="" className="card-img-top" style={{ width: '50%', margin: 10 }} />
                        <div className="card-footer">
                            <h5 className="card-title">Price: {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;