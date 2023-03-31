import React from "react";
import { Container, Row, Col, Stack, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col md="12" lg="3" className="border">
            <Stack gap={2}>
              <div className="bg-light border">First item</div>
              <div className="bg-light border">Second item</div>
              <div className="bg-light border">Third item</div>
            </Stack>
          </Col>
          <Col md="12" lg="9" className="border">
            <Col>
              <Row className="justify-content-md-around">
                {Array.from(
                  {
                    length: 12,
                  },
                  (_, i) => (
                    <Col xs="12" sm="6" md="4" lg="3" className="p-1" key={i}>
                      <Card>
                        <Card.Img variant="top" src="/vite.svg" />
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
