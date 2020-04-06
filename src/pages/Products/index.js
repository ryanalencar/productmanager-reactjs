import React, { Component } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { Route, Link } from 'react-router-dom';

import Api from '../../api';

import './styles.css'

import NavBar from '../../NavBar';
import Home from './Home';
import Category from './Category';

export default class Products extends Component {
    constructor(props) {
        super(props)

        this.loadCategories = this.loadCategories.bind(this);
        this.handleNewCategory = this.handleNewCategory.bind(this);
        this.renderCategories = this.renderCategories.bind(this);

        this.state = {
            categories: []
        }
    }

    loadCategories() {
        Api.load().then(res => {
            this.setState({
                categories: res.data
            });
        });
    }

    handleNewCategory(key) {
        const keyCode = key.keyCode;
        var inputCategory = this.refs.category.value;

        if (keyCode === 13) {
            Api.create(inputCategory).then(res => {
                this.refs.category.value = ''
                this.loadCategories()
            });
        }
    }

    renderCategories(cat) {
        return (
            <li className="list-group-item categoryList" key={cat.id}>
                <Link to={`/products/category/${cat.id}`} className="categoryItem">{cat.category}</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => this.removeCategory(cat)}>
                    <AiFillDelete />
                </button>
            </li>
        );
    }

    removeCategory(cat) {
        const { id } = cat;
        const confirm = window.confirm("Are you sure about this?");

        if (confirm) {
            console.log(confirm)
            Api.delete(id).then((res) => this.loadCategories());
        }
    }

    componentDidMount() {
        this.loadCategories();
    }


    render() {
        const { match } = this.props;
        const { categories } = this.state;

        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group my-3">
                                <input
                                    onKeyUp={this.handleNewCategory}
                                    className="form-control"
                                    placeholder="New Category"
                                    ref="category"
                                />
                            </div>
                            <div className="dropdown nav flex-column nav-pills">
                                <ul className="list-group">
                                    {categories.map(this.renderCategories)}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="container text-center">
                                <h1>Products</h1>
                                <Route path={match.url} component={Home} exact />
                                <Route path={match.url + '/category/:catId'} component={Category} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}