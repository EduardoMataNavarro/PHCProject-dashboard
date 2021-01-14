import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { FaEdit, FaTrash } from 'react-icons/fa';

export default class Articulos extends Component {
    constructor(props){
        super(props);
        this.state = {
            Articulos: []
        }
    }
    componentDidMount(){
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/articulo/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Articulos: [...response] })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="table-container container">
            <Link className="btn btn-success mb-4" to='/articulo/create'>Nuevo</Link>
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
                            this.state.Articulos !== undefined &&
                            this.state.Articulos.map((articulo, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{articulo.SKU}</td>
                                        <td>{articulo.Nombre}</td>
                                        <td>$ {articulo.Precio}</td>
                                        <td>$ {articulo.PrecioMayoreo}</td>
                                        <td>{articulo.Activo ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <Link to={`/articulo/detail/${articulo.id}`} >ver</Link>
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
