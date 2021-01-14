import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export default class Usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: []
        }
    }
    componentDidMount(){
        $.ajax({
            url: 'http://localhost:8000/api/user',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({usuarios: [...response]});
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }
    render() {
        return (
            <div className="table-container container">
                <Link to="/usuario/create" className="btn btn-success mb-4">Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">SKU</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Precio Mayoreo</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usuarios !== undefined &&
                            this.state.usuarios.map((usuario, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{usuario.SKU}</td>
                                        <td>{usuario.Nombre}</td>
                                        <td>$ {usuario.Precio}</td>
                                        <td>$ {usuario.PrecioMayoreo}</td>
                                        <td>{usuario.Activo ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <Link to={`/usuario/detail/${usuario.id}`}>Ver</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
