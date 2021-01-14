import React, { Component } from 'react'
import $ from 'jquery';
import { } from 'react-icons';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ToastProvider } from 'react-toast-notifications';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Sucursal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idSucursal: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            NombreMostrador: '',
            Telefono: '',
            Ubicacion: '',
            Clave: '',
            Estado: '0',
            Sucursales: [],
            Estados: [],
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false, 
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false,
            ToastList: []
        }
        this.saveButtonRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        if (this.state.idSucursal != '') {
            $.ajax({
                method: 'GET',
                url: `https://pchproject-api.herokuapp.com/api/sucursal/${this.state.idSucursal}`,
                dataType: 'json',
                success: function (response) {
                    this.setState({
                        Clave: response.Clave,
                        NombreMostrador: response.Nombre != undefined ? response.Nombre : '',
                        Telefono: response.Telefono != undefined ? response.Telefono : '',
                        Ubicacion: response.Direccion != undefined ? response.Direccion : '',
                        Estado: response.estado_id != undefined ? response.estado_id : '0'
                    })
                }.bind(this),
                fail: function (error) {
                    console.log(error);
                }.bind(this)
            });
        }

        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/estado',
            dataType: 'json',
            success: function (response) {
                this.setState({ Estados: [...response] })
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
                NombreMostrador: '',
                Ubicacion: '',
                Telefono: '',
                idSucursal: '',
                Estado: '0',
                isEditing: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Entrò al submit');

        let dataObject = {
            sucursalid: this.state.idSucursal != '' ? this.state.idSucursal : '',
            clave: this.state.Clave,
            nombre: this.state.NombreMostrador,
            telefono: this.state.Telefono,
            direccion: this.state.Ubicacion,
            estado: this.state.Estado != "0" ? this.state.Estado : ''
        };

        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
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

    handleEdit() {
        this.setState({isEditing: true});
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'https://pchproject-api.herokuapp.com/api/sucursal/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getSucursales();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="container">
                <DetailviewHeader
                    Name="Sucursal"
                    Value={this.state.Clave}
                    ListViewPath='/sucursales'
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={ !(this.state.isEditing || this.state.isCreating) }>
                        <input type="hidden" name="id" value={this.state.idSucursal} />
                        <div className="form-group">
                            <label htmlFor="claveInput">
                                Clave
                        </label>
                            <input type="text"
                                id="claveInput"
                                name="Clave"
                                className="form-control"
                                placeholder="Clave"
                                onChange={this.handleInput}
                                value={this.state.Clave} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreInput">
                                Nombre de la sucursal
                        </label>
                            <input type="text"
                                id="nombreInput"
                                name="NombreMostrador"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.handleInput}
                                value={this.state.NombreMostrador} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="TelefonoInput">
                                Telefono
                        </label>
                            <input type="text"
                                id="TelefonoInput"
                                name="Telefono"
                                className="form-control"
                                placeholder="Telefono"
                                onChange={this.handleInput}
                                value={this.state.Telefono} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="UbicacionInput">
                                Dirección
                        </label>
                            <input type="text"
                                id="UbicacionInput"
                                name="Ubicacion"
                                className="form-control"
                                placeholder="Direccion"
                                onChange={this.handleInput}
                                value={this.state.Ubicacion} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="EstadoInput">
                                Estado
                        </label>
                            <select
                                name="Estado"
                                id="EstadoInput"
                                className="form-control"
                                value={this.state.Estado}
                                onChange={this.handleInput}>
                                <option value="0">{"--- Seleccione algun estado ---"}</option>
                                {
                                    this.state.Estados !== undefined &&
                                    this.state.Estados.map((estado, index) => {
                                        return <option value={estado.id} key={index}>{estado.Clave}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            {
                                (this.state.isEditing || this.state.isCreating) &&
                                <React.Fragment>
                                    <button
                                        type="submit"
                                        className="button button-danger"
                                        ref={this.saveButtonRef}
                                        onClick={() => this.resetState()}>Cancelar</button>

                                    <button type="submit" className="button button-edit">Guardar</button>
                                </React.Fragment>
                            }
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
