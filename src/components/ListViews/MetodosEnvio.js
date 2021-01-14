import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class MetodosEnvio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MetodosEnvio: []
        };
    }
    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/metodoenvio',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({MetodosEnvio: [...response]});
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }
    render() {
        return (
            <div className="table-container container">
                <Link to="/metodoenvio/create" className="btn btn-success mb-4">Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Cuota</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.MetodosEnvio !== undefined &&
                            this.state.MetodosEnvio.map((metodoenvio, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{metodoenvio.Clave}</td>
                                        <td>{metodoenvio.Nombre}</td>
                                        <td>{metodoenvio.Descripcion}</td>
                                        <td>$ {metodoenvio.Cuota}</td>
                                        <td>
                                            <Link to={`/metodoenvio/detail/${metodoenvio.id}`}>Ver</Link>
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
