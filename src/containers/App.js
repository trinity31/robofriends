import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField , requestRobots } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

class App extends Component {

    componentDidMount() {
        this.props.requestRobots();
    }

    setSearchField(event) {
        this.props.setSearchField(event.target.value);
    }
     
    render() {
        const { searchField, robots, isPending } = this.props;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

       // return !robots.length ?
       return isPending ?
            <h1>Loading</h1>:
        (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={ this.setSearchField.bind(this) }/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
        );
    }
}

export default connect(mapStateToProps, { setSearchField, requestRobots })(App);