import React, {Component} from 'react';
import styled from 'styled-components';

const Search = styled.div`
  float: left;
  width: 80%;
`

const SearchInput = styled.input`
  width: 80%;
  padding: 9px;
  font-size: 24px;
`

export default class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state={
      search_value: "",
      search_term: ""
    }
  }

  handleChange(event){
    this.setState({search_term: event.target.value});
  }

  handleSubmit(event){
    this.props.updateSearch(this.state.search_term);
    event.preventDefault();

  }

  render(){
    return (
      <Search>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <SearchInput type='text' placeholder='search for gifs' onChange={(event) => this.handleChange(event)}/>
        </form>
      </Search>
    )
  }
}
