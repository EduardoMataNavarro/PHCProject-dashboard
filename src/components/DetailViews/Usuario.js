import React, { Component } from 'react'
import $ from 'jquery'
import {
    FaPlus,
    FaEdit,
    FaTrash
} from 'react-icons/fa'
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Usuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idUsuario: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Nombre: '',
            RFC: '',
            Correo: '',
            Password: '',
            Direccion: '',
            Telefono: '',
            Rol: '0',
            Estado: '0',
            Sucursal: '0',
            Roles: [],
            InformacionContacto: {
                id: '',
                Nombre: '',
                Puesto: '',
                Direccion: '',
                Email: '',
                Telefono: '',
                TelefonoMovil: ''
            },
            Sucursales: [],
            Estados: [],
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false,
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false
        }

        this.fileInputRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/sucursal/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Sucursales: [...response] });
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
 
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/estado/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Estados: [...response] }, ()=> console.log(this.state))
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/rol/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Roles: [...response] }, ()=> console.log(this.state))
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
        if (this.state.idUsuario != '') {
            $.ajax({
                url: `http://localhost:8000/api/usuario/${this.state.idUsuario}`,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    this.setState({ InformacionContacto: response }, () => {
                        console.log(response);
                    });
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        }
    }

    resetState() {
        if (this.state.isCreating) {
            this.setState({
                articuloid: '',
                Nombre: '',
                RFC: '',
                Correo: '',
                Password: '',
                Direccion: '',
                Rol: '0',
                Estado: '0',
                Sucursal: '0',
                isEditing: false
            });
        }
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const dataObject = {
            idusuario: this.state.idusuario != '' ? this.state.usuario : '',
            nombre: this.state.Nombre,
            rfc: this.state.RFC,
            direccion: this.state.Direccion,
            telefono: this.state.Telefono,
            correo: this.state.Correo,
            rolid: this.state.Rol,
            estadoid: this.state.Estado,
            sucursalid: this.state.Sucursal,
            infoContacto: {
                id: this.state.InformacionContacto.id,
                nombre: this.state.InformacionContacto.Nombre,
                puesto: this.state.InformacionContacto.Puesto,
                direccion: this.state.InformacionContacto.Direccion,
                email: this.state.InformacionContacto.Email,
                telefono: this.state.InformacionContacto.Telefono,
                telefonoMovil: this.state.InformacionContacto.TelefonoMovil
            }
        };

        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'http://localhost:8000/api/usuario',
            contentType: 'application/json',
            dataType: 'json',
            data: dataObject,
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
            url: 'http://localhost:8000/api/usuario/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getusuarios();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheck(e) {
        this.setState({ Activo: e.target.checked });
    }

    render() {
        return (
            <div className="container-fluid">
                <DetailviewHeader
                    Name="Usuario"
                    Value={this.state.Nombre}
                    ListViewPath='/usuarios'
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit} className="w-100 mb-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h4>Información del usuario</h4>
                            <hr />
                            <input type="hidden" name="id" value={this.state.idMarca} />
                            <div className="form-group">
                                <label htmlFor="nombreInput">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="Nombre"
                                    className="form-control"
                                    placeholder="Nombre"
                                    onChange={this.handleInput}
                                    value={this.state.Nombre} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="RFCInput">
                                    RFC
                                </label>
                                <input
                                    type="text"
                                    id="RFCInput"
                                    name="RFC"
                                    className="form-control"
                                    placeholder="RFC"
                                    onChange={this.handleInput}
                                    value={this.state.RFC} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correoInput">
                                    Correo
                                </label>
                                <input
                                    type="text"
                                    id="correoInput"
                                    name="Correo"
                                    className="form-control"
                                    placeholder="Correo"
                                    onChange={this.handleInput}
                                    value={this.state.Correo} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="direccionInput">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="Direccion"
                                    id="direccionInput"
                                    className="form-control"
                                    value={this.state.Direccion}
                                    onChange={this.handleInput}
                                    placeholder="Direccion"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefonoInput">
                                    Telefono
                                </label>
                                <input
                                    type="text"
                                    name="Telefono"
                                    id="telefonoInput"
                                    className="form-control"
                                    value={this.state.Telefono}
                                    onChange={this.handleInput}
                                    placeholder="Telefono"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rolInput">
                                    Rol
                                </label>
                                <div className="input-group">
                                    <select
                                        name="Rol"
                                        id="rolInput"
                                        className="custom-select"
                                        value={this.state.Rol}
                                        onChange={this.handleInput}>
                                        <option value="0">{"-- Sleecione un opcion --"}</option>
                                        {
                                            this.state.Roles &&
                                            this.state.Roles.map((rol, index) => {
                                                return <option value={rol.id} key={index}>{rol.Nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="estadoInput">
                                    Estado
                                </label>
                                <div className="input-group">
                                    <select
                                        name="Estado"
                                        id="estadoInput"
                                        className="custom-select"
                                        value={this.state.Estado}
                                        onChange={this.handleInput}>
                                        <option value="0">{"-- Sleecione un opcion --"}</option>
                                        {
                                            this.state.Estados &&
                                            this.state.Estados.map((estado, index) => {
                                                return <option value={estado.id} key={index}>{estado.Nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sucursalInput">
                                    Sucursal
                                </label>
                                <div className="input-group">
                                    <select
                                        name="Sucursal"
                                        id="sucursalInput"
                                        className="custom-select"
                                        value={this.state.Sucursal}
                                        onChange={this.handleInput}>
                                        <option value="0">{"-- Sleecione un opcion --"}</option>
                                        {
                                            this.state.Sucursales &&
                                            this.state.Sucursales.map((sucursal, index) => {
                                                return <option value={sucursal.id} key={index}>{sucursal.Nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Informacion de contacto</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="ColorInput">
                                    Nombre
                                </label>
                                <input type="text"
                                    id="colorInput"
                                    name="InformacionContacto.Nombre"
                                    className="form-control"
                                    placeholder="Nombre de contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.Nombre} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TecnologiaInput">
                                    Puesto
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="InformacionContacto.Puesto"
                                    className="form-control"
                                    placeholder="Puesto del contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.Puesto}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TecnologiaInput">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="InformacionContacto.Direccion"
                                    className="form-control"
                                    placeholder="Dirección del contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.Direccion}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TecnologiaInput">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="InformacionContacto.Email"
                                    className="form-control"
                                    placeholder="Correo del contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.Email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TecnologiaInput">
                                    Telefono
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="InformacionContacto.Telefono"
                                    className="form-control"
                                    placeholder="Telefono del contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.Telefono}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TecnologiaInput">
                                    Telefono movil
                                </label>
                                <input
                                    type="text"
                                    id="nombreInput"
                                    name="InformacionContacto.TelefonoMovil"
                                    className="form-control"
                                    placeholder="Telefono movil del contacto"
                                    onChange={this.handleInput}
                                    value={this.state.InformacionContacto.TelefonoMovil}
                                />
                            </div>
                            {
                                (this.state.isCreating || this.state.isEditing) ?
                                    <React.Fragment>
                                        <button
                                            type="submit"
                                            className="button button-danger"
                                            onClick={() => this.resetState()}>Cancelar</button>
                                        <button type="submit" className="button button-edit">Guardar</button>
                                    </React.Fragment>
                                    : null
                            }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
