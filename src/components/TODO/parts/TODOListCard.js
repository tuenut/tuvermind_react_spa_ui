import React from "react";

import {Accordion, Card, ListGroup, Fade} from "react-bootstrap";

import {TODOListElement} from "./TODOListElement";


export const TODOList = ({content, onEditClick}) => {
  return (
    <Fade in={Boolean(content)}>
      <Card>

        <Card.Header>
          <h3>TODO List</h3>
        </Card.Header>

        <Card.Body>

          <ListGroup>
            {content &&
            <Accordion defaultActiveKey={`${content[0].id}`}>
              {content.map((item, index) =>
                <TODOListElement {...item} key={`${item.id}.${index}`} onEditClick={onEditClick}/>
              )}
            </Accordion>
            }
          </ListGroup>

        </Card.Body>

      </Card>
    </Fade>
  )
};