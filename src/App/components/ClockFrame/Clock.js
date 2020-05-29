import React from 'react';
import Card from 'react-bootstrap/Card'

export default class TimeFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.props.timeTick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <Card bg={"dark text-light font-weight-bold text-monospace text-center border-0"}>
        <Card.Body>
          <Card.Title>
            <div className={"font-weight-bold my-0 py-0"} style={{fontSize: 48}}>
              {this.props.current_date}
            </div>
            <div className={"font-weight-bold"} style={{fontSize: 196, margin: -48}}>
              {this.props.current_time}
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

