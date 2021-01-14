import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery'

export default class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        };
    }
    componentDidMount() {
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/rol',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                this.setState({roles: [...response]});
            }.bind(this),
            error: function (response) {
                console.log(response);
            }.bind(this)
        })
    }

    render() {
        return (
            <div className="table-container container">
                <Link to="/rol/create" className="btn btn-success mb-4">Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.roles !== undefined &&
                            this.state.roles.map((rol, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{rol.Clave}</td>
                                        <td>{rol.Nombre}</td>
                                        <td>{rol.Peso}</td>
                                        <td>
                                            <Link to={`/rol/detail/${rol.id}`}>Ver</Link>
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
