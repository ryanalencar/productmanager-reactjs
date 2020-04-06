import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <div className="">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex bd-highlight mb-3">
                    <div className="container">
                        <Link to="/" className="navbar-brand">Product Manager</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Produtos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">Sobre</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
} 