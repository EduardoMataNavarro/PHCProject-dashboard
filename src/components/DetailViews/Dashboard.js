import React, { Component } from 'react'
import ReactJoyride from 'react-joyride';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import ChartInfo from '../Singles/ChartInfo';
import '../../dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [{
                target: '.dashboard-link',
                content: 'Aquí encontrarás todo'
            }, {
                target: '.dashboard-link',
                content: 'Podrás registrar, editar y eliminar'
            }, {
                target: '.dashboard-link',
                content: 'En cada sección encontrarás el listado de objetos'
            }, {
                target: '.dashboard-link',
                content: 'Comienza a usarlo ahora!'
            }
            ],
            articulos: [],
            totalesmes: {},
            totales: {}
        };
        this.cookies = new Cookies();
    }
    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8000/api/dashboard/toparticulos',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ articulos: [...response] });
                console.log(response);
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
        $.ajax({
            url: 'http://localhost:8000/api/dashboard/totalcompras',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ totales: response[0] });
                console.log(response);
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
        $.ajax({
            url: 'http://localhost:8000/api/dashboard/totalmes',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({ totalesmes: response[0] });
                console.log(response);
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="container-fluid">
                {
                    this.cookies.get('hasPassedOnboarding') == undefined ?
                        <ReactJoyride
                            run={true}
                            steps={this.state.steps}
                            position={'right'}
                            styles={{
                                options: {
                                    zIndex: 5000
                                }
                            }}
                            continuous={true}
                        /> :
                        ''
                }
                <div className="container">
                    <h2>Articulos más comprados</h2>
                    <hr />
                    <div className="row justify-content-center mb-4">
                        {
                            this.state.articulos != undefined &&
                            this.state.articulos.map((articulo, index) => {
                                return (
                                    <div className="col-md-4 col-lg-3" key={index}>
                                        <div className="shadow-box p-4">
                                            <p className="product-card-name">
                                                <a href={`http://localhost:3000/product/${articulo.id}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="blue-text font-weight-lighter">
                                                    {articulo.Nombre}
                                                </a>
                                            </p>
                                            <h6 className="product-card-price">Comprados: {articulo.Cantidad}</h6>
                                            <h6 className="product-card-price">Total: {articulo.TotalComprados}</h6>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <h2>Ventas</h2>
                    <hr />
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="container">
                                <div className="shadow-box info-card p-4 mt-4 mb-4">
                                    <h4 className="text-center">Totales de ventas</h4>
                                    {
                                        this.state.totales != undefined ?
                                            <div>
                                                <h5>Cantidad de compras:
                                                    <span className="blue-text">{this.state.totales.CantidadVentas}</span>
                                                </h5>
                                                <h5>Subtotal:
                                                    <span className="blue-text">{this.state.totales.SubtotalVentas}</span>
                                                </h5>
                                                <h5>Total:
                                                    <span className="blue-text">{this.state.totales.TotalVentas}</span>
                                                </h5>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="container">
                                <div className="shadow-box info-card p-4 mt-4 mb-4">
                                    <h4 className="text-center">Totales de ventas de este mes</h4>
                                    {
                                        this.state.totalesmes != undefined ?
                                            <div>
                                                <h5>Cantidad de compras:
                                                    <span className="blue-text">{this.state.totalesmes.CantidadVentas}</span>
                                                </h5>
                                                <h5>Subtotal:
                                                    <span className="blue-text">{this.state.totalesmes.SubtotalVentas}</span>
                                                </h5>
                                                <h5>Total:
                                                    <span className="blue-text">{this.state.totalesmes.TotalVentas}</span>
                                                </h5>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
