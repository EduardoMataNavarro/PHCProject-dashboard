import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class MetodoEnvio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idMetodoEnvio: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Clave: '',
            Nombre: '',
            Descripcion: '',
            Cuota: '0',
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
        if (this.state.idMetodoEnvio != '') {
            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/metodoenvio/${this.state.idMetodoEnvio}`,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    this.setState({
                        Clave: response.Clave,
                        Descripcion: response.Descripcion,
                        Cuota: response.Cuota,
                        Nombre: response.Nombre
                    }, () => console.log(response));
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        }
    }

    resetState() {
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
        if (this.state.isCreating) {
            this.setState({
                Clave: '',
                Nombre: '',
                Descripcion: '',
                Cuota: 0,
                isEditing: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            metodoenvioid: this.state.idMetodoEnvio != '' ? this.state.idMetodoEnvio : '',
            clave: this.state.Clave,
            nombre: this.state.Nombre,
            descripcion: this.state.Descripcion,
            cuota: this.state.Cuota
        };
        console.log(dataObject);

        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/metodoenvio',
            method: requestMethod,
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
        this.setState({ isEditing: true });
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8000/api/metodoenvio/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getMetodosEnvio();
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
                    Name="Metodo de envio"
                    Value={this.state.Clave}
                    ListViewPath="/metodosenvio"
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    isCreating={this.state.isCreating}
                    isEditing={this.state.isEditing}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={!(this.state.isEditing || this.state.isCreating)}>
                        <input type="hidden" name="id" value={this.state.idMarca} />
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
                                Nombre
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
                            <label htmlFor="DescripcionInput">
                                Descripcion
                        </label>
                            <textarea
                                name="Descripcion"
                                id="DescripcionInput"
                                className="form-control"
                                placeholder="Descripcion"
                                cols="30"
                                rows="2"
                                onChange={this.handleInput}
                                value={this.state.Descripcion} ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CoutaInput">
                                Cuota de envio
                        </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="CoutaInput">{"$"}</label>
                                </div>
                                <input type="number"
                                    id="CoutaInput"
                                    name="Cuota"
                                    className="form-control"
                                    placeholder="Couta"
                                    onChange={this.handleInput}
                                    value={this.state.Cuota} />
                            </div>
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
