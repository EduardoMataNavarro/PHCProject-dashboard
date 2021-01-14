import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery'

export default class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Categorias: []
        };
    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/categoria',
            dataType: 'json',
            success: function (response) {
                this.setState({ Categorias: [...response] }, () => {
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
                <Link className="btn btn-success mb-4" to='/categoria/create'>Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Categorias !== undefined &&
                            this.state.Categorias.map((categoria, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{categoria.Clave}</td>
                                        <td>{categoria.Nombre}</td>
                                        <td>{categoria.Descripcion}</td>
                                        <td>
                                            <Link to={`/categoria/detail/${categoria.id}`}>
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
