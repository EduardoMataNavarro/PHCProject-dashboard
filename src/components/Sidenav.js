import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    FaRegChartBar,
    FaStore,
    FaCreditCard,
    FaUserFriends,
    FaShoppingBasket
} from 'react-icons/fa';
import {
    ProSidebar,
    SidebarHeader,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'

export default class Sidenav extends Component {
    render() {
        return (
            <ProSidebar
                breakPoint="md"
                toggled={this.props.toggled}
                onToggle={this.props.handleToggle}
            >
                <SidebarHeader>
                    <div className="container p-4">
                        Hello {'Admin'}
                    </div>
                </SidebarHeader>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaRegChartBar />}>
                        <div className="dashboard-link">
                            <Link to="/">Dashboard</Link>
                        </div>
                    </MenuItem>
                    <SubMenu title="Articulos" icon={<FaShoppingBasket />}>
                        <div className="articulos-menu">
                            <MenuItem>
                                <Link to="/articulos">Articulos</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/categorias">Categorias</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/marcas">Marcas</Link>
                            </MenuItem>
                        </div>
                    </SubMenu>
                    <SubMenu title="Sucursales" icon={<FaStore />}>
                        <MenuItem>
                            <Link to="/inventarios">Inventarios</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/sucursales">Sucursales</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/estados">Estados</Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title="Usuario" icon={<FaUserFriends />}>
                        <MenuItem>
                            <Link to="/usuarios">Usuarios</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/roles">Roles</Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title="Ventas" icon={<FaCreditCard />}>
                        <MenuItem>
                            <Link to="/ventas">Ventas</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/metodosenvio">Métodos de envío</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/metodospago">Métodos de pago</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        )
    }
}
