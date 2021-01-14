import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaExpandAlt } from 'react-icons/fa';

export default class Ventas extends Component {
    constructor(props){
        super(props);
         
        this.state = {
            Ventas: []
        }
    }

    componentDidMount(){
        $.ajax({
            url: 'https://pchproject-api.herokuapp.com/api/venta',
            method: 'GET',
            type: 'json',
            success: function (response) {
                this.setState({Ventas: [...response]});
            }.bind(this),
            error: function (reponse) {
                console.log(reponse)
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h4>Ventas</h4>
                <br/>
                <hr/>
                <div className="table-container">
                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Folio</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Total</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Ventas !== undefined &&
                                this.state.Ventas.map((venta, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{venta.Clave}</td>
                                            <td>{venta.Nombre}</td>
                                            <td>{venta.Peso}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="button button-edit"
                                                    onClick={() => this.handleEdit(venta._id)}>
                                                    <FaEdit style={{ verticalAlign: 'baseline' }} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button button-danger"
                                                    onClick={() => this.handleDelete(venta._id)}>
                                                    <FaTrash style={{ verticalAlign: 'baseline' }} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
