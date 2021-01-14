import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit, FaChevronLeft } from 'react-icons/fa'

export default class DetailviewHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="return-btn-container d-flex">
                    <Link className="return-list-btn" to={this.props.ListViewPath} >
                        <FaChevronLeft style={{ display: 'inline' }} />
                        <h6 className="d-inline">Regresar</h6>
                    </Link>
                </div>
                <h4>{this.props.Name} <span style={{ color: '#18A4E0' }}>{this.props.Value}</span> </h4>
                {
                    !this.props.isCreating &&
                    <React.Fragment>
                        <button className="button" onClick={this.props.handleEdit}>
                            <FaEdit style={{ verticalAlign: 'baseline' }} />
                        </button>
                        <button className="button" onClick={this.props.handleDelete}>
                            <FaTrash style={{ verticalAlign: 'baseline' }} />
                        </button>
                    </React.Fragment>
                }
                <hr />
                <div className={`alert alert-primary ${this.props.isEditing ? 'd-block' : 'd-none'}`} role="alert">
                    Está editando un registro
                </div>
            </div>
        )
    }
}
