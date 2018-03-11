import React, {Component} from 'react';
import styled from 'styled-components';
import GifTerm from './GifTerm.js'
import GifList from './GifList.js'

const Container = styled.div`
`

export default class GifContainer extends Component {
  render(){
    return (
      <Container>
        <GifTerm search_term={this.props.search_term} total_gifs={this.props.total_gifs}/>
        <GifList gifs={this.props.gifs} />
      </Container>
    )
  }
}
