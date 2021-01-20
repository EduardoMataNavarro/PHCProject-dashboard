import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { FaEdit, FaTrash, FaExpandAlt, FaPlus } from 'react-icons/fa';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Inventario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idInventario: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Clave: '',
            Articulo: '',
            Sucursal: '',
            Cantidad: 0,
            Detalles: [],
            Articulos: [],
            Sucursales: [],
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false,
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/articulo',
            dataType: 'json',
            success: function (response) {
                this.setState({ Articulos: [...response] }, () => {
                    console.log(response)
                })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            dataType: 'json',
            success: function (response) {
                this.setState({ Sucursales: [...response] }, () => {
                    console.log(response)
                })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
        if (this.state.idInventario != '') {
            $.ajax({
                method: 'GET',
                url: `https://pchproject-api.herokuapp.com/api/inventario/${this.state.idInventario}`,
                dataType: 'json',
                success: function (response) {
                    this.setState({
                        Clave: response.Clave,
                        Articulo: response.articulo_id,
                        Sucursal: response.sucursal_id,
                        Cantidad: response.Cantidad,
                        Detalles: [...response.detalles]
                    }, () => console.log(this.state));
                }.bind(this),
                fail: function (error) {
                    console.log(error);
                }.bind(this)
            });
        }
    }

    resetState() {
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
        else {
            this.setState({
                Clave: '',
                Sucursal: '',
                Articulo: '',
                Cantidad: '',
                idInventario: '',
                isEditing: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            inventarioid: this.state.idInventario != '' ? this.state.idInventario : '',
            clave: this.state.Clave,
            sucursal: this.state.Sucursal != "0" ? this.state.Sucursal : '',
            articulo: this.state.Articulo != "0" ? this.state.Articulo : '',
            cantidad: this.state.Cantidad
        };
        console.log(dataObject);
        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'https://pchproject-api.herokuapp.com/api/inventario',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataObject),
            success: function (response) {
                this.resetState();
                console.log(response);
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleEdit(value) {
        this.setState({ isEditing: true })
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'https://pchproject-api.herokuapp.com/api/inventario/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getInventarios();
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
                <DetailviewHeader
                    Name="Inventario"
                    Value={this.state.Clave}
                    ListViewPath="/inventarios"
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={!(this.state.isCreating || this.state.isEditing)}>
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
                                onChange={this.handleInput}
                                value={this.state.Clave} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SucursalInput">
                                Sucursal
                        </label>
                            <select
                                name="Sucursal"
                                id="SucursalInput"
                                className="form-control"
                                value={this.state.Sucursal}
                                onChange={this.handleInput}>
                                <option value="0">{"--- Seleccione alguna sucursal ---"}</option>
                                {
                                    this.state.Sucursales !== undefined &&
                                    this.state.Sucursales.map((sucursal, index) => {
                                        return <option value={sucursal.id} key={index}>{sucursal.Clave}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="SucursalInput">
                                Articulo
                        </label>
                            <select
                                name="Articulo"
                                id="SucursalInput"
                                className="form-control"
                                value={this.state.Articulo}
                                onChange={this.handleInput}>
                                <option value="0">{"--- Seleccione alguna sucursal ---"}</option>
                                {
                                    this.state.Articulos !== undefined &&
                                    this.state.Articulos.map((articulo, index) => {
                                        return <option value={articulo.id} key={index}>{articulo.SKU}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="UbicacionInput">
                                Cantidad
                        </label>
                            <input type="number"
                                id="ClaveInput"
                                name="Cantidad"
                                className="form-control"
                                min="0"
                                max="99999999"
                                placeholder="Cantidad"
                                onChange={this.handleInput}
                                value={this.state.Cantidad} />
                        </div>
                        {
                            (this.state.isCreating || this.state.isEditing) &&
                            <React.Fragment>
                                <button
                                    type="submit"
                                    className="button button-danger"
                                    onClick={() => this.resetState()}>Cancelar</button>
                                <button type="submit" className="button button-edit">Guardar</button>
                            </React.Fragment>
                        }
                    </fieldset>
                </form>
                <div className="table-container">
                    <h3>Detalles</h3>
                    <hr />
                    <table className="table table-hover">
                        <thead>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Fecha</th>
                        </thead>
                        <tbody>
                            {
                                this.state.Detalles.length > 0 &&
                                this.state.Detalles.map((detalle, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{detalle.Cantidad}</td>
                                            <td>{detalle.Tipo}</td>
                                            <td>{new Date(detalle.created_at).toLocaleString("es-MX")}</td>
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
