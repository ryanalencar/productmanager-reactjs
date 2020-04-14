import React, { Component } from 'react';
import axios from 'axios';

export default class Category extends Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        
        this.state = {
            products: [],
            category: ''
        }
    }

    loadData(id) {
        axios
            .get(`http://localhost:3001/products?category=${id}`)
            .then(res => {
                this.setState({
                    products: res.data
                })
            });
        
        axios
            .get(`http://localhost:3001/categories/${id}`)
            .then(res => {
                this.setState({
                    category: res.data
                })
            })
    }

    componentDidMount() {
        const id = this.props.match.params.catId;
        this.loadData(id);
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps.match.params.catId)
        this.loadData(newProps.match.params.catId);
    }

    renderProducts(product) {
        return(
            <div className="card shadow" key={product.id}>
                <div className="card-header">
                    {product.name}
                </div>
                <img src={product.imgUrl} alt="" className="card-img-top" style={{ width:'50%', margin: 10 }} />
                <div className="card-footer">
                    <h5 className="card-title">Price: {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</h5>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1 className="mb-3">{this.state.category.category}</h1>
                <div className="card-columns">
                    {this.state.products.map(this.renderProducts)}
                </div>
            </div>
        );
    }
}