import React, { Component } from 'react'
import $, { data } from 'jquery';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import DetailviewHeader from '../Singles/DetailviewHeader';
import ImageGallery from '../Singles/ImageGallery';

export default class Articulo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idArticulo: this.props.match.params.id != undefined ? this.props.match.params.id : '',
            SKU: '',
            ClaveFabricante: '',
            Nombre: '',
            Descripcion: '',
            Precio: '',
            PrecioMayoreo: '',
            CantidadMayoreo: '',
            Marca: '',
            Categoria: '',
            Color: '',
            Tecnologia: '',
            FichaTecnica: '',
            Activo: false,
            Imagenes: [],
            Marcas: [],
            Categorias: [],
            isCreating: this.props.isCreating != undefined ? this.props.isCreating : false,
            isEditing: this.props.isEditing != undefined ? this.props.isEditing : false
        }

        this.fileInputRef = React.createRef();
        this.imageInpuRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.resetState = this.resetState.bind(this);

        this.handleGalleryClick = this.handleGalleryClick.bind(this);
        this.handleImageInput = this.handleImageInput.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);

        this.createArticulo = this.createArticulo.bind(this);

    }

    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/categoria/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Categorias: [...response] })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });

        $.ajax({
            method: 'GET',
            url: 'https://pchproject-api.herokuapp.com/api/marca/',
            dataType: 'json',
            success: function (response) {
                this.setState({ Marcas: [...response] })
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
        if (this.state.idArticulo != '') {
            $.ajax({
                method: 'GET',
                url: `https://pchproject-api.herokuapp.com/api/articulo/get/${this.state.idArticulo}`,
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    this.setState({
                        SKU: res.SKU,
                        ClaveFabricante: res.ClaveFabricante,
                        Nombre: res.Nombre,
                        Descripcion: res.Descripcion,
                        Precio: res.Precio,
                        PrecioMayoreo: res.PrecioMayoreo,
                        CantidadMayoreo: res.CantidadMayoreo,
                        Marca: res.marca_id,
                        Categoria: res.categoria_id,
                        Color: res.Color,
                        Tecnologia: res.Tecnologia,
                        Imagenes: [...res.imagenes]
                    }, () => {
                        console.log(this.state);
                    });
                }.bind(this),
                fail: function (error) {
                    console.log(error);
                }.bind(this)
            });
        }
    }

    resetState() {
        if (this.state.isCreating) {
            this.setState({
                idArticulo: '',
                SKU: '',
                ClaveFabricante: '',
                Nombre: '',
                Descripcion: '',
                Precio: '',
                PrecioMayoreo: '',
                CantidadMayoreo: '',
                Marca: '',
                Categoria: '',
                Color: '',
                Tecnologia: '',
                FichaTecnica: '',
                Activo: false,
                Imagenes: [],
                isEditing: false
            });
        }
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isCreating) {
            this.createArticulo();
        }
        if (this.state.isEditing) {
            this.editArticulo();
        }
    }
    createArticulo() {
        console.log(this.state);
        let formdata = new FormData();
        formdata.append('nombre', this.state.Nombre);
        formdata.append('sku', this.state.SKU);
        formdata.append('claveFabricante', this.state.ClaveFabricante);
        formdata.append('descripcion', this.state.Descripcion);
        formdata.append('precio', this.state.Precio);
        formdata.append('precioMayoreo', this.state.PrecioMayoreo);
        formdata.append('cantidadMayoreo', this.state.CantidadMayoreo);
        formdata.append('marca', this.state.Marca);
        formdata.append('categoria', this.state.Categoria);
        formdata.append('color', this.state.Color);
        formdata.append('tecnologia', this.state.Tecnologia);
        formdata.append('fichaTecnica', this.state.FichaTecnica);
        formdata.append('activo', this.state.Activo ? 1 : 0);
        for (let idx = 0; idx < this.state.Imagenes.length; idx++) {
            const img = this.state.Imagenes[idx];
            formdata.append(`image[${idx}]`, img.File);
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8000/api/articulo', true);
        xhr.send(formdata);
        xhr.onreadystatechange = function (response) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText);
                    console.log(response);
                    this.resetState();
                }
                else {
                    console.log(xhr.responseText);
                }
            }
        }.bind(this);
    }

    editArticulo() {
        let dataObject = {
            articuloid: this.state.idArticulo,
            sku: this.state.SKU,
            claveFabricante: this.state.ClaveFabricante,
            nombre: this.state.Nombre,
            descripcion: this.state.Descripcion,
            precio: this.state.Precio,
            precioMayoreo: this.state.PrecioMayoreo,
            cantidadMayoreo: this.state.CantidadMayoreo,
            marca: this.state.Marca,
            categoria: this.state.Categoria,
            tecnologia: this.state.Tecnologia,
            color: this.state.Color,
            activo: this.state.Activo
        }
        console.log(dataObject);
        $.ajax({
            url: 'http://localhost:8000/api/articulo',
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataObject),
            success: function (response) {
                console.log(response);
                this.resetState();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });

    }

    handleEdit() {
        this.setState({ isEditing: true });
    }

    handleDelete(value) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8000/api/articulo/delete',
            data: JSON.stringify({ id: value }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                this.getArticulos();
            }.bind(this),
            fail: function (error) {
                console.log(error);
            }.bind(this)
        });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleFileInput(e) {
        e.preventDefault();
        this.setState({ FichaTecnica: e.target.files[0] });
    }
    handleCheck(e) {
        const checked = (e.target.checked) ? 1 : 0;
        this.setState({ Activo: checked });
    }

    handleGalleryClick() {
        this.imageInpuRef.current.click();
    }
    handleImageInput(e) {
        if (this.state.isCreating) {
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onload = () => {
                let images = [...this.state.Imagenes];
                images.push({ File: file, Path: reader.result });
                this.setState({
                    Imagenes: images
                });
            }
            reader.readAsDataURL(file);
        }
    }
    handleImageDelete(index) {
        if (this.state.isCreating) {
            let images = [...this.state.Imagenes];
            if (index > -1) {
                images.splice(index, 1);
                this.setState({ Imagenes: images });
            }
        }
        if (this.state.isEditing) {
            let imgid = this.state.Imagenes[index].id;
            console.log(imgid);

            $.ajax({
                url: `http://localhost:8000/api/articulo/media/${imgid}`,
                method: 'DELETE',
                dataType: 'json',
                success: function (response) {
                    console.log(response);  
                    let images = [...this.state.Imagenes];
                    if (index > -1) {
                        images.splice(index, 1);
                        this.setState({ Imagenes: images });
                    }
                }.bind(this),
                error: function (response) {
                    console.log(response);
                }.bind(this)
            });
        }
    }

    render() {
        return (
            <div className="container">
                <DetailviewHeader
                    Name="Articulo"
                    Value={this.state.SKU}
                    ListViewPath='/articulos'
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    isEditing={this.state.isEditing}
                    isCreating={this.state.isCreating}
                />
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="w-100">
                    <fieldset disabled={!(this.state.isEditing || this.state.isCreating)} >
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <input type="hidden" name="id" value={this.state.idMarca} />
                                <div className="form-group">
                                    <label htmlFor="claveInput">
                                        SKU
                                </label>
                                    <input type="text"
                                        id="claveInput"
                                        name="SKU"
                                        className="form-control"
                                        placeholder="SKU"
                                        onChange={this.handleInput}
                                        value={this.state.SKU} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ClaveFabricanteInput">
                                        Clave del fabricante
                                </label>
                                    <input type="text"
                                        id="ClaveFabricanteInput"
                                        name="ClaveFabricante"
                                        className="form-control"
                                        placeholder="Clave del fabricante"
                                        onChange={this.handleInput}
                                        value={this.state.ClaveFabricante} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreInput">
                                        Nombre
                                </label>
                                    <input type="text"
                                        id="nombreInput"
                                        name="Nombre"
                                        className="form-control"
                                        placeholder="Nombre"
                                        onChange={this.handleInput}
                                        value={this.state.Nombre} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="DescripcionInput">
                                        Descripcion
                                    </label>
                                    <textarea
                                        name="Descripcion"
                                        id="DescripcionInput"
                                        className="form-control"
                                        cols="30"
                                        rows="2"
                                        value={this.state.Descripcion}
                                        onChange={this.handleInput}
                                        placeholder="Descripcion"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="PrecioInput">
                                        Precio normal
                                    </label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="PrecioMayoreoInput">{"$"}</label>
                                        </div>
                                        <input type="number"
                                            id="PrecioInput"
                                            name="Precio"
                                            className="form-control"
                                            placeholder="Precio"
                                            onChange={this.handleInput}
                                            value={this.state.Precio} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <label htmlFor="CantidadMayoreoInput">
                                                Min. mayoreo
                                            </label>
                                            <input type="text"
                                                id="CantidadMayoreoInput"
                                                name="CantidadMayoreo"
                                                className="form-control"
                                                placeholder="Cantidad"
                                                onChange={this.handleInput}
                                                value={this.state.CantidadMayoreo} />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <label htmlFor="PrecioMayoreoInput">
                                                Precio mayoreo
                                            </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text" htmlFor="PrecioMayoreoInput">{"$"}</label>
                                                </div>
                                                <input type="text"
                                                    id="PrecioMayoreoInput"
                                                    name="PrecioMayoreo"
                                                    className="form-control"
                                                    placeholder="Precio"
                                                    onChange={this.handleInput}
                                                    value={this.state.PrecioMayoreo} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="MarcaInput">
                                        Marca
                                </label>
                                    <div className="input-group">
                                        <select
                                            name="Marca"
                                            id="MarcaInput"
                                            className="custom-select"
                                            value={this.state.Marca}
                                            onChange={this.handleInput}>
                                            <option value="0">{"-- Sleecione un opcion --"}</option>
                                            {
                                                this.state.Marcas &&
                                                this.state.Marcas.map((marca, index) => {
                                                    return <option value={marca.id} key={index}>{marca.Nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="CategoriaInput">
                                        Categoria
                                </label>
                                    <div className="input-group">
                                        <select
                                            name="Categoria"
                                            id="CategoriaInput"
                                            className="custom-select"
                                            value={this.state.Categoria}
                                            onChange={this.handleInput}>
                                            <option value="0">{"-- Sleecione un opcion --"}</option>
                                            {
                                                this.state.Categorias &&
                                                this.state.Categorias.map((cat, index) => {
                                                    return <option value={cat.id} key={index}>{cat.Nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ColorInput">
                                        Color
                                </label>
                                    <input type="text"
                                        id="colorInput"
                                        name="Color"
                                        className="form-control"
                                        placeholder="Color"
                                        onChange={this.handleInput}
                                        value={this.state.Color} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="TecnologiaInput">
                                        Tecnologia
                                </label>
                                    <input type="text"
                                        id="nombreInput"
                                        name="Tecnologia"
                                        className="form-control"
                                        placeholder="Tecnologia"
                                        onChange={this.handleInput}
                                        value={this.state.Tecnologia} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fichaInput">
                                        Ficha técnica
                                </label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="fichaInput"
                                                accept=".pdf"
                                                name="FichaTecnica"
                                                ref={this.fileInputRef}
                                                onChange={this.handleFileInput}
                                            />
                                            <label className="custom-file-label" htmlFor="fichaInput">
                                                {
                                                    !this.state.FichaTecnica ? 'Examinar...' : 'Archivo seleccionado'
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check m-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="Activo"
                                        id="ActivoInput"
                                        onChange={e => this.handleCheck(e)}
                                        checked={this.state.Activo} />
                                    <label className="form-check-label" htmlFor="ActivoInput">
                                        Artículo activo
                                </label>
                                </div>
                                <hr />
                            </div>
                            <div className="w-100 mt-4 mb-4">
                                <h5 className="mt-4">Imagenes</h5>
                                <hr />
                                <button onClick={this.handleGalleryClick} type="button" className="button button-success">
                                    <GrAdd color={'white'} /> <span className="ml-1">Agregar</span>
                                </button>
                                <input
                                    type="file"
                                    className="d-none"
                                    name="Image"
                                    accept="image/jpg, image/jpeg, image/png"
                                    ref={this.imageInpuRef}
                                    onChange={this.handleImageInput}
                                />
                                <div className="row text-center">
                                    {
                                        this.state.Imagenes.length > 0 ?
                                            this.state.Imagenes.map((imagen, index) => {
                                                return (
                                                    <div className="col-lg-3 col-md-6 p-2 mt-2 overflow-hidden" key={index}>
                                                        <div className="container image-gallery-holder h-100 p-2">
                                                            <button
                                                                className="position-absolute align-middle close-img-button"
                                                                type="button"
                                                                onClick={() => { this.handleImageDelete(index) }}
                                                            >
                                                                <span>&times;</span>
                                                            </button>
                                                            <img
                                                                src={imagen.Path}
                                                                alt="Hola esta es una prueba"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    </div>);
                                            }) :
                                            <div className="col-lg-3 col-md-6 p-2 mt-2 overflow-hidden">
                                                <div className="container image-gallery-holder h-100 p-2">
                                                    <img
                                                        alt="No hay ninguna imagen todavía"
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                            {
                                (this.state.isEditing || this.state.isCreating) &&
                                <React.Fragment>
                                    <button
                                        type="submit"
                                        className="button button-danger"
                                        onClick={() => this.resetState()}>Cancelar</button>
                                    <button type="submit" className="button button-edit">Guardar</button>
                                </React.Fragment>
                            }
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
