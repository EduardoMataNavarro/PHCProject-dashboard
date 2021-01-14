import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import DetailviewHeader from '../Singles/DetailviewHeader'

export default class Venta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ventaid: '',
            Folio: '',
            Usuario: '',
            MetodoEnvio: '',
            MetodoPago: '',
            DireccionEnvio: '',
            Total: '',
            Estatus: ''
        };

    }
    componentDidMount(){
        $.ajax({
            url: 'http://localhost:8000/api/venta',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({Ventas: [...response]});
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
                    <fieldset disabled={!(this.state.isCreating || this.state.isEditing)}>
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
                                Total
                        </label>
                            <input type="number"
                                id="ClaveInput"
                                name="Cantidad"
                                className="form-control"
                                min="0"
                                max="99999999"
                                placeholder="Cantidad"
                                onChange={this.handleInput}
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
                            <th scope="col">SKU</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Monto</th>
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
        )
    }
}
