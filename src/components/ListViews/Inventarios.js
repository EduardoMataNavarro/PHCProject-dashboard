import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom';

export default class Inventarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Inventarios: []
        };
    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/inventario',
            dataType: 'json',
            success: function (response) {
                this.setState({ Inventarios: [...response] }, () => {
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
                <Link className="btn btn-success mb-4" to='/inventario/create'>Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Sucursal</th>
                            <th scope="col">Articulo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Inventarios !== undefined &&
                            this.state.Inventarios.map((inventario, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{inventario.Clave}</td>
                                        <td>{inventario.sucursal.Clave}</td>
                                        <td>{inventario.articulo.SKU}</td>
                                        <td>{inventario.Cantidad}</td>
                                        <td>
                                            <Link to={`/inventario/detail/${inventario.id}`}>
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
        )
    }
}
