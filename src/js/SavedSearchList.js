import React, {Component} from 'react';
import styled from 'styled-components'
import DropDownMenu from 'material-ui/DropDownMenu';
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const History = styled.div   `
  float: right;
  background-color: limegreen;
`
const HistoryButton = styled.button`
  color: white;
  font-size: 24px;
  padding: 12px;
  background-color: limegreen;
	border: none;
  cursor: pointer;
  &:hover {
    background: green;
}
`
const HistoryContainer = styled.div`
	color: white;
  font-size: 24px;
  position: relative;
  display: inline-block;
`

const HistoryList = styled.div`
	display: none;
	position: absolute;
	right:0;
	left: 0;
	background-color: green;
	padding: 12px;
	overflow: auto;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
`

const SearchedTerm = styled.div`
  cursor: pointer;
`

export default class SavedSearchList extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchHistory: []
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.search_term !== "trending" || this.state.searchHistory.length > 1){
      for (var search of this.state.searchHistory) {
        if (search.search_term  === nextProps.search_term) {
          this.state.searchHistory.splice(this.state.searchHistory.indexOf(search), 1)
        }
      }
      const search_obj = {key: Date.now(), search_term: nextProps.search_term}
      this.setState({searchHistory: [search_obj, ...this.state.searchHistory] })
    }
  }

  redoSearch(search_term){
    this.props.updateSearch(search_term)
  }

  handleClick(event){
    // This prevents ghost click.
    event.preventDefault();
		const el =  document.getElementById('historyList').classList.toggle('show')
  }

	toggleList(event){
		event.preventDefault();
		const el =  document.getElementById('historyList').classList.toggle('show')
	}

	closeList(){
		const el =  document.getElementById('historyList').classList.remove('show','hasfocus')
	}


  render(){
    const search_history = this.state.searchHistory.map((search)=>{
      return (
        <MenuItem key={search.key} onClick={()=>{this.redoSearch(search.search_term)}}>
          {search.search_term}
        </MenuItem>
				)
		})

    return(
      <HistoryContainer onMouseLeave={this.closeList.bind(this)}>
        <HistoryButton
          onClick={this.handleClick.bind(this)}
        >search history</HistoryButton>
        <HistoryList id="historyList">
					{(search_history.length >= 1) ? search_history : "search for something, yo"}
        </HistoryList>
      </HistoryContainer>
    )
  }
}
