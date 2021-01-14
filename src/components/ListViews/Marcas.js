import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'

export default class Marcas extends Component {
    constructor(props){
        super(props);
        this.state = {
            Marcas: []
        }
    }
    componentDidMount(){
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/marca',
            method: 'GET',
            success: function(response) {
                this.setState({ Marcas: [...response] });
            }.bind(this),
            fail: function(response) {
                console.log(response);
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="table-container container">
                <Link className="btn btn-success mb-4" to='/marca/create'>Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Marcas !== undefined &&
                            this.state.Marcas.map((marca, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{marca.Clave}</td>
                                        <td>{marca.Nombre}</td>
                                        <td>{marca.Descripcion}</td>
                                        <td>
                                            <Link to={`marca/detail/${marca.id}`}>ver</Link>
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
