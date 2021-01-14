import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { FaEdit, FaTrash, FaExpandAlt } from 'react-icons/fa';

export default class InventarioDetalle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idInventario: this.props.match.params.id,
            Inventario: {},
            Detalles: [],
            isEditing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getDetalles = this.getDetalles.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        this.getDetalles();

        $.ajax({
            method: 'GET',
            url: 'http://localhost:8001/api/inventario/' + this.state.idInventario,
            dataType: 'json',
            success: function (response) {
                this.setState({ Inventario: response });
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    resetState() {
        this.setState({
            Cantidad: 0,
            Movimiento: 'salida',
            idInventario: '',
            isEditing: false
        });
    }
    getDetalles() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8001/api/inventario/' + this.state.idInventario + '/details',
            dataType: 'json',
            success: function (response) {
                this.setState({ Detalles: [...response] }, () => {
                    console.log(response)
                })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            id: this.state.idEstado != '' ? this.state.idEstado : '',
            clave: this.state.Clave,
            sucursal: this.state.Sucursal != "0" ? this.state.Sucursal : '',
            articulo: this.state.Articulo,
            cantidad: this.state.Cantidad
        };

        let requestURL = !this.state.isEditing ?
            'http://localhost:8001/api/inventario/create' :
            'http://localhost:8001/api/inventario/edit';

        $.ajax({
            method: 'POST',
            url: requestURL,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataObject),
            success: function (response) {
                this.resetState();
                this.getDetalles();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleEdit(value) {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8001/api/inventario/' + value,
            dataType: 'json',
            success: function (response) {
                this.setState({
                    idInventario: response._id,
                    Clave: response.Clave,
                    Sucursal: response.Sucursal,
                    Articulo: response.Articulo,
                    Cantidad: response.Cantidad,
                    isEditing: true
                }, () => {
                    console.log(this.state);
                })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8001/api/inventario/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getDetalles();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log(this.state.SucursalDefault)
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h4>Detalles de inventario</h4>
                <hr />
                <div class={`alert alert-primary ${this.state.isEditing ? 'd-block': 'd-none'}`} role="alert">
                    Está editando un registro
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={this.state.idInventario} />
                    <div className="form-group">
                        <label htmlFor="nombreInput">
                            Clave del inventario
                        </label>
                        <input type="text"
                            id="nombreInput"
                            name="Clave"
                            className="form-control"
                            placeholder="Clave"
                            disabled
                            onChange={this.handleInput}
                            value={this.state.Clave} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SucursalInput">
                            Sucursal
                        </label>
                        <input type="text"
                            id="nombreInput"
                            name="Sucursal"
                            className="form-control"
                            placeholder="Sucursal"
                            disabled
                            value={this.state.Sucursal} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ArticuloInput">
                            Articulo
                        </label>
                        <input type="text"
                            id="ArticuloInput"
                            name="Articulo"
                            className="form-control"
                            placeholder="Articulo"
                            disabled
                            value={this.state.Articulo} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CantidadInput">
                            Cantidad
                        </label>
                        <input type="text"
                            id="CantidadInput"
                            name="Cantidad"
                            className="form-control"
                            placeholder="Cantidad"
                            disabled
                            value={this.state.Cantidad} />
                    </div>
                    <button
                        type="submit"
                        className="button button-danger"
                        onClick={() => this.resetState()}>Cancelar</button>
                    <button type="submit" className="button button-edit">Guardar</button>
                </form>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Clave</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Articulo</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Inventarios !== undefined &&
                                this.state.Inventarios.map((inventario, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{inventario.Clave}</td>
                                            <td>{inventario.Sucursal}</td>
                                            <td>{inventario.Articulo}</td>
                                            <td>{inventario.Cantidad}</td>
                                            <td>
                                                <button type="button" className="button button-edit">
                                                    <Link to={`/inventario/${inventario._id}`}>
                                                        <FaExpandAlt style={{ verticalAlign: 'baseline' }} />
                                                    </Link>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button button-edit"
                                                    onClick={() => this.handleEdit(inventario._id)}>
                                                    <FaEdit style={{ verticalAlign: 'baseline' }} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button button-danger"
                                                    onClick={() => this.handleDelete(inventario._id)}>
                                                    <FaTrash style={{ verticalAlign: 'baseline' }} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
