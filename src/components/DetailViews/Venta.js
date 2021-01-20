import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import DetailviewHeader from '../Singles/DetailviewHeader'

export default class Venta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ventaid: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Detalles: [],
            Usuarios: [],
            MetodosPago: [],
            MetodosEnvio: [],
            Folio: '',
            Usuario: '',
            MetodoEnvio: '',
            MetodoPago: '',
            DireccionEnvio: ' ',
            Total: '',
            Estatus: '',
            isCreating: false,
            isEditing: false,
        };
        this.getDetalles = this.getDetalles.bind(this);
    }
    componentDidMount() {
        $.ajax({
            url: `http://localhost:8000/api/venta/get/${this.state.ventaid}`,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                this.setState({
                    Folio: response.Folio,
                    Usuario: response.user_id,
                    MetodoPago: response.metodopago_id,
                    MetodoEnvio: response.metodoenvio_id,
                    DireccionEnvio: response.DireccionEnvio,
                    Total: response.Total,
                    Subtotal: response.Subtotal,
                    Estatus: response.Estatus
                }, () => {
                    this.getDetalles();
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
        $.ajax({
            url: `http://localhost:8000/api/user`,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                this.setState({
                    Usuarios: [...response]
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
        $.ajax({
            url: `http://localhost:8000/api/metodoenvio`,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                this.setState({
                    MetodosEnvio: [...response]
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
        $.ajax({
            url: `http://localhost:8000/api/metodopago`,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                this.setState({
                    MetodosPago: [...response]
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    getDetalles() {
        $.ajax({
            url: `http://localhost:8000/api/ventadetalles/${this.state.ventaid}`,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (response) {
                this.setState({
                    Detalles: [...response]
                });
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <DetailviewHeader
                    Name="Venta"
                    Value={this.state.Folio}
                    ListViewPath="/inventarios"
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit}>
                        <input type="hidden" name="id" value={this.state.idInventario} />
                        <div className="form-group">
                            <label htmlFor="nombreInput">
                                Folio
                        </label>
                            <input type="text"
                                id="nombreInput"
                                name="Folio"
                                className="form-control"
                                placeholder="Clave"
                                disabled="disabled"
                                defaultValue={this.state.Folio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SucursalInput">
                                Usuario
                            </label>
                            <select
                                name="Sucursal"
                                id="SucursalInput"
                                className="form-control"
                                value={this.state.Usuario}
                                onChange={this.handleInput}
                                disabled="disabled">
                                <option value="0">{"--- Seleccione alguna sucursal ---"}</option>
                                {
                                    this.state.Usuarios !== undefined &&
                                    this.state.Usuarios.map((usuario, index) => {
                                        return <option value={usuario.id} key={index}>{usuario.name}</option>;
                                    })
                                }
                            </select>
                        </div>
                    <fieldset disabled={!(this.state.isCreating || this.state.isEditing)}>
                        <div className="form-group">
                            <label htmlFor="metodoEnvioInput">
                                Metodo envio
                            </label>
                            <select
                                name="Articulo"
                                id="metodoEnvioInput"
                                className="form-control"
                                value={this.state.MetodoEnvio}
                                onChange={this.handleInput}>
                                <option value="0">{"--- Seleccione alguna sucursal ---"}</option>
                                {
                                    this.state.MetodosEnvio !== undefined &&
                                    this.state.MetodosEnvio.map((metodoenvio, index) => {
                                        return <option value={metodoenvio.id} key={index}>{metodoenvio.Nombre}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="metodoPagoInput">
                                Metodo pago
                            </label>
                            <select
                                name="Articulo"
                                id="metodoPagoInput"
                                className="form-control"
                                value={this.state.MetodoPago}
                                onChange={this.handleInput}>
                                <option value="0">{"--- Seleccione algún metodo de pago ---"}</option>
                                {
                                    this.state.MetodosPago !== undefined &&
                                    this.state.MetodosPago.map((metodopago, index) => {
                                        return <option value={metodopago.id} key={index}>{metodopago.Nombre}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccionEnvioInput">
                                Direccion de envio
                            </label>
                            <input type="text"
                                id="direccionEnvioInput"
                                name="DireccionEnvio"
                                className="form-control"
                                placeholder="Direccion de envio"
                                onChange={this.handleInput}
                                value={this.state.DireccionEnvio} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subtotalInput">
                                Subtotal
                            </label>
                            <input type="number"
                                id="subtotalInput"
                                name="Subtotal"
                                className="form-control"
                                min="0"
                                max="99999999"
                                placeholder="Subtotal"
                                onChange={this.handleChange}
                                value={this.state.Subtotal} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalInput">
                                Total
                            </label>
                            <input type="number"
                                id="totalInput"
                                name="Total"
                                className="form-control"
                                min="0"
                                max="99999999"
                                placeholder="Total"
                                onChange={this.handleChange}
                                value={this.state.Total} />
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
                            <tr>
                                <th scope="col">Articulo</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Detalles.length > 0 &&
                                this.state.Detalles.map((detalle, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{detalle.articulo.SKU}</td>
                                            <td>{detalle.sucursal.Nombre}</td>
                                            <td>{detalle.Cantidad}</td>
                                            <td>{detalle.Monto}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
