import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export default class MetodosPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MetodosPago: []
        };
    }
    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/metodopago',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({MetodosPago: [...response]});
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }
    render() {
        return (
            <div className="table-container container">
                <Link to="/metodopago/create" className="btn btn-success mb-4">Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Cuota</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.MetodosPago !== undefined &&
                            this.state.MetodosPago.map((metodopago, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{metodopago.Clave}</td>
                                        <td>{metodopago.Nombre}</td>
                                        <td>{metodopago.Descripcion}</td>
                                        <td>{metodopago.Cuota}</td>
                                        <td>
                                            <Link to={`/metodopago/detail/${metodopago.id}`}>Ver</Link>
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
