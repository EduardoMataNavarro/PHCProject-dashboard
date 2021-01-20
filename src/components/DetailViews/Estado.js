import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Estado extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idEstado: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Nombre: '',
            Capital: '',
            Clave: '',
            SucursalDefault: '0',
            Sucursales: [],
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false,
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        if (this.state.idEstado != '') {
            $.ajax({
                method: 'GET',
                url: `https://pchproject-api.herokuapp.com/api/estado/${this.state.idEstado}`,
                dataType: 'json',
                success: function (response) {
                    this.setState({
                        Nombre: response.Nombre,
                        Capital: response.Capital,
                        Clave: response.Clave,
                        SucursalDefault: response.SucursalDefault,
                        Estado: response.Estado != undefined ? response.Estado : '0'
                    })
                }.bind(this),
                fail: function (error) {
                    console.log(error);
                }.bind(this)
            });
        }

        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            dataType: 'json',
            success: function (response) {
                this.setState({ Sucursales: [...response] })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    resetState() {
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
        if (this.state.isCreating) {
            this.setState({
                Clave: '',
                Nombre: '',
                Capital: '',
                isEstado: '',
                SucursalDefault: '0',
                isEditing: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            estadoid: this.state.idEstado != '' ? this.state.idEstado : '',
            nombre: this.state.Nombre,
            capital: this.state.Capital,
            clave: this.state.Clave,
            sucursal: this.state.SucursalDefault != "0" ? this.state.SucursalDefault : ''
        };
        console.log(dataObject);
        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'https://pchproject-api.herokuapp.com/api/estado',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataObject),
            success: function (response) {
                console.log(response);
                this.resetState();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleEdit(value) {
        this.setState({ isEditing: true });
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8001/api/estado/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getEstados();
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
            <div className="container">
                <DetailviewHeader
                    Name="Estado"
                    Value={this.state.Clave}
                    ListViewPath='/estados'
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={!(this.state.isEditing || this.state.isCreating)}>
                        <input type="hidden" name="id" value={this.state.idEstado} />
                        <div className="form-group">
                            <label htmlFor="UbicacionInput">
                                Clave
                            </label>
                            <input type="text"
                                id="ClaveInput"
                                name="Clave"
                                className="form-control"
                                placeholder="Clave"
                                onChange={this.handleInput}
                                value={this.state.Clave} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreInput">
                                Nombre del estado
                            </label>
                            <input type="text"
                                id="nombreInput"
                                name="Nombre"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.handleInput}
                                value={this.state.Nombre} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="CapitalInput">
                                Capital del estado
                        </label>
                            <input type="text"
                                id="CapitalInput"
                                name="Capital"
                                className="form-control"
                                placeholder="Capital"
                                onChange={this.handleInput}
                                value={this.state.Capital} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SucursalInput">
                                Sucursal default
                        </label>
                            <select
                                name="SucursalDefault"
                                id="SucursalInput"
                                className="form-control"
                                value={this.state.SucursalDefault}
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
                        {
                            (this.state.isEditing || this.state.isCreating) &&
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
            </div>
        );
    }
}
