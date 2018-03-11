import React, {Component} from 'react';
import styled from 'styled-components';

const Details = styled.div`
  position: relative;
  bottom: 23px;
  height: 20px;
  color: white;
  z-index: 10;
  padding-left: 5px;
  background-color: rgba(0,0,0,0.6);
  display:none;
`

export default class Gif extends Component {
  constructor(props){
    super(props)
    this.state = {
      hovered: false
    }
  }

  handleMouseEnter(){
    this.setState({hovered: true})
  }

  handleMouseLeave(){
    this.setState({hovered: false})
  }

  render(){
    let slug = this.props.gif.title.split("GIF")[0]
    const width = this.props.gif.images.fixed_height.width
    const height = this.props.gif.images.fixed_height.height
    const margin = 5
    const backgroundColor = ["DeepSkyBlue","DeepPink","Lime","BlueViolet"][1]
    return(
      <div
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        style={{overflow: "hidden", width: width+ "px", height: height+"px", backgroundColor: backgroundColor, margin: margin +"px"}}
      >
        <img  src={this.props.gif.images.fixed_height.url}/>
        <Details style={(this.state.hovered)? {"display":"block"}: {"display":"none"}}>#{slug}</Details>
      </div>
    )
  }
}
