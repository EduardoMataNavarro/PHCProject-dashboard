import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DetailviewHeader from '../Singles/DetailviewHeader';

export default class Categoria extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idcategoria: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Clave: '',
            Nombre: '',
            Descripcion: '',
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
        if (this.state.idcategoria != '') {
            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/categoria/${this.state.idcategoria}`,
                method: 'GET',
                success: function(response){
                    this.setState({
                        Clave: response.Clave,
                        Nombre: response.Nombre,
                        Descripcion: response.Descripcion
                    });
                }.bind(this),
                fail: function(response) {
                    console.log(response);
                }.bind(this)
            })
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
                isEditing: false
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            categoriaid: this.state.idcategoria != '' ? this.state.idcategoria : '',
            clave: this.state.Clave,
            nombre: this.state.Nombre,
            descripcion: this.state.Descripcion
        };
        console.log(dataObject)

        let requestMethod = !this.state.isEditing ?
            'POST' :
            'PUT';

        $.ajax({
            method: requestMethod,
            url: 'https://pchproject-api.herokuapp.com/api/categoria',
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
        this.setState({ isEditing: true });
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'https://pchproject-api.herokuapp.com/api/categoria/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getCategorias();
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
                    Name="Categoria"
                    Value={this.state.Clave}
                    ListViewPath={'/categorias'}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={ !(this.state.isEditing || this.state.isCreating) }>
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
                                Nombre de la categoria
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
                            <input type="text"
                                id="DescripcionInput"
                                name="Descripcion"
                                className="form-control"
                                placeholder="Descipcion"
                                onChange={this.handleInput}
                                value={this.state.Descripcion} />
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
