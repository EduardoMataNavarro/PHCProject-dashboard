import React, { Component } from 'react'
import $ from 'jquery';

import { FaEdit, FaTrash, FaExpandAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Ventas extends Component {
    constructor(props){
        super(props);
         
        this.state = {
            Ventas: []
        }
    }

    componentDidMount(){
        $.ajax({
            url: 'http://localhost:8000/api/venta',
            method: 'GET',
            dataType: 'json',
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
                                <th scope="col">Total</th>
                                <th scope="col">Estatus</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Ventas !== undefined &&
                                this.state.Ventas.map((venta, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{venta.Folio}</td>
                                            <td>{new Date(venta.created_at).toLocaleString()}</td>
                                            <td>{venta.Peso}</td>
                                            <td>{venta.Estatus}</td>
                                            <td>
                                                <Link to={`/venta/detail/${venta.id}`}>Ver</Link>
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
