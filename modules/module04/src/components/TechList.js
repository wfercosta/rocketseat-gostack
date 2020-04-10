import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {

    state = {
        newTech: '',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native'
        ],
    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' });
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech) });
    }

    //Executed when a componente just rendered
    componentDidMount() {
        const techs = localStorage.getItem('techs');
        if (techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    }

    //Executed when executed when occurs chagens on props or state
    componentDidUpdate(prevProps, prevState) {
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    }

    //Executed when the component is destroyed
    componentWillUnmount() {

    }

    render() {
        return (
          <>
            <form onSubmit={this.handleSubmit}>
              <ul>
                {this.state.techs.map((tech) => (
                    <TechItem
                        key={tech}
                        tech={tech}
                        onDelete={() => this.handleDelete(tech)}
                    />
                ))}
              </ul>
              <input
                type="text"
                onChange={this.handleInputChange}
                value={this.state.newTech}
              />
              <button type="submit">Enviar</button>
            </form>
          </>
        );
    }
}

export default TechList;