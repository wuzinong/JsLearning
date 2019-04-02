import React from 'react';
const STATUS = {
    HOVER:'hovered',
    NORMAL:'normal',
}

export default class Link extends React.Component{
    constructor(props){
        super(props);
        this.__onMouseEnter = this.__onMouseEnter.bind(this);
        this.__onMouseLeave = this.__onMouseLeave.bind(this);
        this.state = {
            class:STATUS.NORMAL
        }
    }
    __onMouseEnter(){
        this.setState({class:STATUS.HOVER})
    }
    __onMouseLeave(){
        this.setState({class:STATUS.NORMAL})
    }
    render(){
        return (
            <a 
              className={this.state.class}
              href={this.props.page || '#'}
              onMouseEnter = {this.__onMouseEnter}
              onMouseLeave = {this.__onMouseLeave}
              >
                {this.props.children}
            </a>
        )
    }
}

