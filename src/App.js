import React, { Component } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';
import './App.css';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  } from './constants';

class App extends Component {
  state = { 
    results: null,
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null,
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    if (this.mounted) {
      this.setState({
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        }
      });
    }
  }

  componentDidMount() {
    this.mounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
      ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    const { onDismiss, onSearchChange, onSearchSubmit } = this;
    if (error) {
      return <p>Something went wrong!</p>
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table
            list={list}
            onDismiss={onDismiss}
          />
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div >
    );
  }
}

export default App;
