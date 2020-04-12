import React, { Component } from 'react';

export default class NewProduct extends Component {
    constructor(props) {
        super(props)

        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);

        this.state = {
            productImg: null,
            productName: 'Exemple name',
            productPrice: 300.00,
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

        this.setState({
            productPrice
        });
    }

    handleImgChange(event) {
        const productImg = event.target.id === 'img' ? event.target.files[0] : false;

        this.setState({
            productImg: URL.createObjectURL(productImg)
        });
    }

    render() {
        const { categories } = this.props;
        return (
            <div className="container">
                <h1>New Product</h1>
                <div className="row mt-3">
                    <div className="col-6">
                        <input className="form-control" placeholder="Product Name" id="product" onChange={this.handleNameChange} />
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <select className="custom-select" ref="category" id="category">
                                <option value="#">Select the category</option>
                                {categories.map((category) => {
                                    return (
                                        <option value={category.id}>{category.category}</option>
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
                                <label className="custom-file-label" for="img">Choose file</label>
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

                <button className="btn btn-primary btn-block">Save</button>
                <p>{JSON.stringify(this.props.categories)}</p>
            </div>
        );
    }
}