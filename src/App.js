import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Sidenav from './components/Sidenav';
import { FaBars } from 'react-icons/fa';
/* Detail views */
import Dashboard from './components/DetailViews/Dashboard';
import Sucursal from './components/DetailViews/Sucursal';
import Estado from './components/DetailViews/Estado';
import Usuario from './components/DetailViews/Usuario';
import Marca from './components/DetailViews/Marca';
import Categoria from './components/DetailViews/Categoria';
import Articulo from './components/DetailViews/Articulo';
import Venta from './components/DetailViews/Venta';
import MetodoEnvio from './components/DetailViews/MetodoEnvio';
import Inventario from './components/DetailViews/Inventario';
import InventarioDetalle from './components/DetailViews/InventarioDetalle';
import Rol from './components/DetailViews/Rol'

/* Listviews */
import Sucursales from './components/ListViews/Sucursales'
import Estados from './components/ListViews/Estados'
import Articulos from './components/ListViews/Articulos'
import Marcas from './components/ListViews/Marcas'
import Categorias from './components/ListViews/Categorias'
import Inventarios from './components/ListViews/Inventarios'
import Roles from './components/ListViews/Roles'
import MetodosEnvio from './components/ListViews/MetodosEnvio'

/* Listviews */
import Ventas from './components/ListViews/Ventas';
import Usuarios from './components/ListViews/Usuarios';
import MetodosPago from './components/ListViews/MetodosPago';
import MetodoPago from './components/DetailViews/MetodoPago';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    }

    this.setToggle = this.setToggle.bind(this);
  }

  setToggle(value) {
    this.setState({ toggled: value });
  }

  render() {
    return (
      <Router>
        <div className={`App ${this.state.toggled ? 'toggled' : ''}`}>
          <Sidenav
            handleToggle={this.setToggle}
            toggled={this.state.toggled}
          />
          <main>
            <div className="btn-toggle p-2" onClick={() => this.setToggle(true)}>
              <FaBars />
            </div>
            <div className="container-fluid">
              <Switch>
                <Route path='/' exact component={Dashboard} />

                <Route path='/sucursal/detail/:id' exact component={Sucursal} />
                <Route path='/sucursal/create/' exact render={(props) => <Sucursal isCreating={true} {...props} />} />
                <Route path='/sucursales' exact component={Sucursales} />

                <Route path='/estado/detail/:id' exact component={Estado} />
                <Route path='/estado/create' exact render={(props)=> <Estado isCreating={true} {...props} />} />
                <Route path='/estados' exact component={Estados} />

                <Route path='/articulo/detail/:id' exact component={Articulo} />
                <Route path='/articulo/create' exact render={(props) => <Articulo isCreating={true} {...props} />} />
                <Route path='/articulos' exact component={Articulos} />

                <Route path='/marca/detail/:id' exact component={Marca} />
                <Route path='/marca/create' exact render={(props) => <Marca isCreating={true} {...props} />} />
                <Route path='/marcas' exact component={Marcas} />

                <Route path='/categoria/detail/:id' exact component={Categoria} />
                <Route path='/categoria/create' exact render={(props) => <Categoria isCreating={true} {...props} /> } />
                <Route path='/categorias' exact component={Categorias} />

                <Route path='/inventario/detail/:id' exact component={Inventario} />
                <Route path='/inventario/create' exact render={(props) => <Inventario isCreating={true} {...props} /> } />
                <Route path='/inventarios' exact component={Inventarios} />
                
                <Route path='/ventas' exact component={Ventas} />
                <Route path='/venta/:id' exact component={Venta} />

                <Route path='/metodoenvio/detail/:id' exact component={MetodoEnvio} />
                <Route path='/metodoenvio/create' exact render={(props) => <MetodoEnvio isCreating={true} {...props} /> } />
                <Route path='/metodosenvio' exact component={MetodosEnvio} />

                <Route path='/metodopago/detail/:id' exact component={MetodoPago} />
                <Route path='/metodopago/create' exact render={(props) => <MetodoPago isCreating={true} {...props} /> } />
                <Route path='/metodospago' exact component={MetodosPago} />

                <Route path='/usuario/detail/:id' exact component={Usuario} />
                <Route path='/usuario/create' exact render={(props) => <Usuario isCreating={true} {...props} /> } />
                <Route path='/usuarios' exact component={Usuarios} />

                <Route path='/usuario/detail/:id' exact component={Usuario} />
                <Route path='/usuario/create' exact render={(props) => <Usuario isCreating={true} {...props} /> } />
                <Route path='/usuarios' exact component={Usuarios} />

                <Route path='/rol/detail/:id' exact component={Rol} />
                <Route path='/rol/create' exact render={(props) => <Rol isCreating={true} {...props} /> } />
                <Route path='/roles' exact component={Roles} />
              </Switch>
            </div>
          </main>
        </div>
      </Router >
    );
  }

}