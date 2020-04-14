import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Api from '../../api';

export default class NewProduct extends Component {
    constructor(props) {
        super(props)

        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleNewProduct = this.handleNewProduct.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);

        this.state = {
            productImg: null,
            productName: 'Exemple name',
            productPrice: 300.00,
            productCategory: '',
            redirect: false
        }
    }

    handleNameChange(event) {
        const productName = event.target.id === 'product' ? event.target.value : false;

        this.setState({
            productName
        });
    }

    handlePriceChange(event) {
        const productPrice = event.target.id === 'price' ? Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(event.target.value) : false;

        // var priceReplace = productPrice.replace('US$', '');
        // var newPrice = parseFloat(priceReplace);

        this.setState({
            productPrice: productPrice
        });
    }

    handleImgChange(event) {
        const productImg = event.target.id === 'img' ? event.target.files[0] : false;

        this.setState({
            productImg: URL.createObjectURL(productImg)
        });
    }

    handleCategoryChange(event) {
        const productCategory = event.target.id === 'category' ? event.target.value : false;

        this.setState({
            productCategory
        });
        
        console.log(productCategory)
    }

    handleNewProduct() {
        const product = { 
            imgUrl: this.state.productImg, 
            name: this.state.productName,
            price: parseFloat(this.state.productPrice.replace('US$', '')),
            category: this.state.productCategory
        };

        console.log(product)

        Api.createProduct(product).then((res) => {
            this.setState({
                redirect: `/products/category/${product.category}`,
            })
        });
    }

    render() {
        const { categories } = this.props;

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="container">
                <h1>New Product</h1>
                <div className="row mt-3">
                    <div className="col-6">
                        <input className="form-control" placeholder="Product Name" id="product" onChange={this.handleNameChange} />
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <select className="custom-select" id="category" onChange={this.handleCategoryChange}>
                                <option value="#">Select the category</option>
                                {categories.map((category) => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.category}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <input className="form-control" maxLength="8" id="price" placeholder="Price" onChange={this.handlePriceChange} />
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <div className="custom-file text-left">
                                <input type="file" className="custom-file-input" id="img" onChange={this.handleImgChange} />
                                <label className="custom-file-label" htmlFor="img">Choose file</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Preview */}
                <div className="">
                    <div className="card shadow my-5">
                        <div className="card-header">
                            {this.state.productName}
                        </div>
                        <img src={this.state.productImg} alt="Product Img" className="card-img-top my-3" style={{ maxWidth: '50%', margin: '0 auto' }} />
                        <div className="card-footer">
                            <h5 className="card-title">Price: {this.state.productPrice}</h5>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary btn-block" onClick={this.handleNewProduct}>Save</button>
                {/* <p>{JSON.stringify(this.props.categories)}</p> */}
            </div>
        );
    }
}