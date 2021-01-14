import React, { Component } from 'react'
import ReactJoyride from 'react-joyride';
import Cookies from 'universal-cookie';
import ChartInfo from '../Singles/ChartInfo';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [{
                target: '.dashboard-link',
                content: 'Aquí encontrarás todo'
            }, {
                target: '.dashboard-link',
                content: 'Podrás registrar, editar y eliminar'
            }, {
                target: '.dashboard-link',
                content: 'En cada sección encontrarás el listado de objetos'
            }, {
                target: '.dashboard-link',
                content: 'Comienza a usarlo ahora!'
            }
            ]
        };
        this.cookies = new Cookies();
    }
    render() {
        return (
            <div className="container-fluid">
                {
                    this.cookies.get('hasPassedOnboarding') == undefined ?
                        <ReactJoyride
                            run={true}
                            steps={this.state.steps}
                            position={'right'}
                            styles={{
                                options: {
                                    zIndex: 5000
                                }
                            }}
                            continuous={true}
                        /> :
                        ''
                }
                <ChartInfo name="Ventas por año" />
                <ChartInfo name="Ventas por mes" />
                <ChartInfo name="Ventas por usuario" />
            </div>
        )
    }
}
