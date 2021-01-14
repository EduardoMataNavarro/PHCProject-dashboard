import React, { Component } from 'react'
import { GrAdd } from 'react-icons/gr'

export default class ImageGallery extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="w-100 container-fluid mb-4">
                <h5 className="mt-4">Imagenes</h5>
                <hr />
                <button onClick={this.props.onAddImage} className="button button-success">
                    <GrAdd color={'white'} /> <span className="ml-1">Agregar</span>
                </button>
                <div className="row text-center">
                    {
                        this.props.Imagenes.map((imagen, index) => {
                            return (
                                <div className="col-lg-3 col-md-6 p-2 mt-2 overflow-hidden" key={index}>
                                    <div className="container image-gallery-holder h-100 p-2">
                                        <button className="position-absolute align-middle close-img-button" onClick={() => this.props.onDeleteImg(imagen.id)}>
                                            <span>&times;</span>
                                        </button>
                                        <img src={imagen.Path} alt="Hola esta es una prueba" className="img-fluid" />
                                    </div>
                                </div>);
                        })
                    }
                </div>
            </div>
        )
    }
}
