import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { FaRegHandScissors } from 'react-icons/fa';

export default class ChartInfo extends Component {
    constructor(props){
        super(props);
        this.data = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Ventas por mes',
                    data: [100, 200,211,544,110,400,121,214,124,560,412,100]
                }
            ]
        }
    }
    render() {
        return (
            <div className="container">
                <h4>{ this.props.name }</h4>
                <Bar data={this.data}/>
            </div>
        )
    }
}
