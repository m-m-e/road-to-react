import React, { Component } from 'react';
import Search from '../../components/Search';
import Table from '../../components/Table';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  state = { 
    list,
    searchTerm: '',
};

  onDismiss = (id) => {
    const { list } = this.state;
    const isNotId = item => item.objectID !== id;
    const updatedList = list.filter(isNotId);
    this.setState({list: updatedList});
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { list, searchTerm } = this.state;
    const { onDismiss, onSearchChange } = this;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={onDismiss}
          isSearched={isSearched}
        />
      </div >
    );
  }
}

export default App;
