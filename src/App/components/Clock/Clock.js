import React from 'react';
import Card from 'react-bootstrap/Card'


export default class Clock extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(
      this.props.timeTick,
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <Card bg={"dark"} className={"text-light text-monospace text-center border-0"}>
        <Card.Body className={"pb-0 mb-0"}>
          <Card.Title className={"pb-0 mb-0"}>

            <div className={"font-weight-bold"} style={{fontSize: 48}}>
              {this.props.current_date}
            </div>

            <div className={"font-weight-bold"} style={{fontSize: 196, marginTop: -48}}>
              {this.props.current_time}
            </div>

          </Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

