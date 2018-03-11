import React, {Component} from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
`
const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

import Gif from './Gif.js'

export default class GifList extends Component {
  render(){
    const gifList = this.props.gifs.map((gif)=>{
      return (<Gif key={gif.id} gif={gif}/>)
    })
    return(
      <ListContainer>
        <List>
          {gifList}
        </List>
      </ListContainer>
    )
  }
}
