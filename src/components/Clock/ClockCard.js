import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';


export const ClockCard = props => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setDate(new Date()),
      1000
    );

    return () => {
      clearInterval(interval);
    }
  }, []);

  const dateString = `${date.toLocaleDateString("ru", {weekday: 'long'})} ${date.toLocaleDateString("ru")}`;
  const timeString = `${date.toLocaleTimeString("ru")}`;

  return (
    <Card bg={"dark"} className={"text-light text-monospace text-center border-0"}>
      <Card.Body className={"pb-0 mb-0"}>
        <Card.Title className={"pb-0 mb-0"}>

          <div className={"font-weight-bold"} style={{fontSize: 48}}>
            {dateString}
          </div>

          <div className={"font-weight-bold"} style={{fontSize: 196, marginTop: -24}}>
            {timeString}
          </div>

        </Card.Title>
      </Card.Body>
    </Card>
  )
};