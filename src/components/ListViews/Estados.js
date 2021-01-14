import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default class Estados extends Component {
    constructor(props){
        super(props);

        this.state = {
            Estados: []
        };
    }

    componentDidMount(){
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/estado',
            dataType: 'json',
            success: function (response) {
                this.setState({ Estados: [...response] }, () => {
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
                <Link className="btn btn-success mb-4" to='/estado/create'>Nuevo</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Capital</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Estados !== undefined &&
                            this.state.Estados.map((estado, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{estado.Clave}</td>
                                        <td>{estado.Nombre}</td>
                                        <td>{estado.Capital}</td>
                                        <td>
                                            <Link to={`/estado/detail/${estado.id}`} >
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
