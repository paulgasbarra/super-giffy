import React, { Component } from 'react';
import { render } from 'react-dom';
import SavedSearchList from './SavedSearchList.js'
import SearchBar from './SearchBar.js';
import GifContainer from './GifContainer.js';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';

import '../css/style.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      previous_search_term: '',
      search_term: 'trending',
      gifs: [],
      total_gifs: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll.bind(this));
    this.fetchGifs(this.state.search_term)
  }

  handleOnScroll(){
   var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
   var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
   var clientHeight = document.documentElement.clientHeight || window.innerHeight;
   var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

   if (scrolledToBottom) {
     this.fetchGifs(this.state.search_term)
   }
  }

  updateSearch(search_term){
    this.fetchGifs(search_term);
  }

  fetchGifs(search_term){
    let offset = 0;
    if (search_term === this.state.previous_search_term) {
      offset = this.state.gifs.length
    }
    this.setState({search_term: search_term});
    const api_key = "5grezqFaN9stTrKaoq0AW7Hzai5N1lTt";
    const term = (search_term === "trending") ? 'trending?' : "search?q=" + search_term
    const url = "http://api.giphy.com/v1/gifs/"+ term +"&api_key="+ api_key +"&offset="+offset;
    axios.get(url,   {})
    .then(response => {

      this.setState({total_gifs: response.data.pagination.total_count})
      if (search_term === this.state.previous_search_term) {
        const gifArray = this.state.gifs.concat(response.data.data).filter((v, i, a) => a.indexOf(v) === i);
        this.setState({gifs: gifArray})
      } else {
        this.setState({gifs: []})
        this.setState({gifs: response.data.data})
        this.setState({previous_search_term: search_term})
      }
    })

    .catch(error => {
      console.log(error)
    })
  }

  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <SearchBar updateSearch={this.updateSearch.bind(this)}/>
          <SavedSearchList search_term={this.state.search_term} updateSearch={this.updateSearch.bind(this)}/>
          <GifContainer
            gifs={this.state.gifs}
            search_term={this.state.search_term}
            total_gifs={this.state.total_gifs}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'));
