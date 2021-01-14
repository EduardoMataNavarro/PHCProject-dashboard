import React, { Component } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom' 
import $ from 'jquery'

export default class Sucursales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Sucursales: []
        };
    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/sucursal',
            dataType: 'json',
            success: function (response) {
                this.setState({ Sucursales: [...response] }, () => {
                    console.log(response)
                })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="table-container container">
                <Link className="btn btn-success mb-4" to='/sucursal/create'>Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Sucursales !== undefined &&
                            this.state.Sucursales.map((sucursal, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{sucursal.Clave}</td>
                                        <td>{sucursal.Nombre}</td>
                                        <td>{sucursal.Telefono}</td>
                                        <td>{sucursal.Direccion}</td>
                                        <td>
                                            <Link to={`/sucursal/detail/${sucursal.id}`}>
                                                ver
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
