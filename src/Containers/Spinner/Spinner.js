import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">加载中...</span>

        </div>
        <h4> 稍等哦 ...</h4>
      </div>
    )
  }
}

export default Spinner
