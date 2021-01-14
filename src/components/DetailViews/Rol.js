import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaExpandAlt, FaPlus } from 'react-icons/fa';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Rol extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idRol: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Nombre: '',
            Descripcion: '',
            Peso: '0',
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false,
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount() {
        if (this.state.idRol != '') {
            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/rol/${this.state.idRol}`,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    this.setState({
                        idRol: response.id,
                        Clave: response.Clave,
                        Nombre: response.Nombre,
                        Descripcion: response.Descripcion,
                        Peso: response.Peso
                    });
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            })
        }
    }

    resetState() {
        if (this.state.isCreating) {
            this.setState({
                idRol: '',
                Peso: 0,
                Nombre: '',
                Clave: '',
                Descripcion: '',
                isEditing: false
            });
        }
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            rolid: this.state.idRol != '' ? this.state.idRol : '',
            clave: this.state.Clave,
            nombre: this.state.Nombre,
            descripcion: this.state.Descripcion,
            peso: Number(this.state.Peso)
        };

        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'https://pchproject-api.herokuapp.com/api/rol',
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
            url: 'http://localhost:8001/api/rol/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getRoles();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container-fluid">
                <DetailviewHeader
                    Name="Rol"
                    Value={this.state.Clave}
                    ListViewPath='/roles'
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={!(this.state.isCreating || this.state.isEditing)}>
                        <input type="hidden" name="id" value={this.state.idRol} />
                        <div className="form-group">
                            <label htmlFor="claveInput">
                                Clave
                            </label>
                            <input
                                type="text"
                                id="claveInput"
                                name="Clave"
                                className="form-control"
                                placeholder="Clave"
                                onChange={this.handleInput}
                                value={this.state.Clave}
                            />
                        </div>
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
                                value={this.state.Nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcionInput">
                                Descripción
                            </label>
                            <textarea
                                type="text"
                                id="descripcionInput"
                                name="Descripcion"
                                className="form-control"
                                placeholder="Descripcion"
                                onChange={this.handleInput}
                                value={this.state.Descripcion}
                                rows="2"
                                cols="20"
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="PesoInput">
                                Peso
                            </label>
                            <input
                                type="number"
                                id="PesoInput"
                                name="Peso"
                                className="form-control"
                                placeholder="Peso"
                                onChange={this.handleInput}
                                value={this.state.Peso}
                            />
                        </div>
                        {
                            (this.state.isEditing || this.state.isCreating) ?
                                <React.Fragment>
                                    <button
                                        type="submit"
                                        className="button button-danger"
                                        onClick={() => this.resetState()}>Cancelar</button>
                                    <button type="submit" className="button button-edit">Guardar</button>
                                </React.Fragment>
                                : null
                        }
                    </fieldset>
                </form>
            </div>
        );
    }
}
