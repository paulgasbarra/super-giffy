import React, {Component} from 'react';
import styled from 'styled-components'

const CurrentSearch = styled.div`
  width: 100%;
  clear:both;
  padding: 9px;
  font-size: 24px;
  color: #FFF;
`

const Count = styled.div`
  font-size: 18px;
  position: relative;
  top: -25px;
`

export default class GifTerm extends Component {
  render(){
    return(
      <CurrentSearch>
        <h3>
        {(this.props.search_term === 'trending')?
          "trending now" : this.props.search_term
        }
        </h3>
        <Count>total count: {this.props.total_gifs}</Count>
      </CurrentSearch>
    )
  }
}
