import React, { Component } from 'react'
import $ from 'jquery'
import DetailviewHeader from '../Singles/DetailviewHeader'

export default class MetodoPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metodopagoid: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            Nombre: '',
            Clave: '',
            Descripcion: '',
            Cuota: '',
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false,
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetState = this.resetState.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount() {
        if (this.state.metodopagoid != '') {
            $.ajax({
                url: `https://pchproject-api.herokuapp.com/api/metodopago/${this.state.metodopagoid}`,
                method: 'GET',
                success: function(response){
                    this.setState({
                        Clave: response.Clave,
                        Nombre: response.Nombre,
                        Descripcion: response.Descripcion,
                        Cuota: response.Cuota
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
                Cuota: '',
                isEditing: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let dataObject = {
            metodopagoid: this.state.metodopagoid != '' ? this.state.metodopagoid : '',
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
            url: 'https://pchproject-api.herokuapp.com/api/metodopago',
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
        this.setState({isEditing: true});
    }
    handleDelete() {
        this.setState({ isEditing: true });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="container-fluid">
                <DetailviewHeader 
                    Name="Metodo de pago"
                    Value={this.state.Clave}
                    ListViewPath={"/metodospago"}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={ !(this.state.isCreating || this.state.isEditing) }>
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
                            <input type="text"
                                id="DescripcionInput"
                                name="Descripcion"
                                className="form-control"
                                placeholder="Descripcion"
                                onChange={this.handleInput}
                                value={this.state.Descripcion} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="DescripcionInput">
                                Cuota
                        </label>
                            <input type="number"
                                id="DescripcionInput"
                                name="Cuota"
                                className="form-control"
                                placeholder="Cuota"
                                onChange={this.handleInput}
                                value={this.state.Cuota} />
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
        )
    }
}
