import React, { useState } from "react";
import {
  Navbar,
  Container,
  Dropdown,
  Form,
  FormControl,
  Col,
} from "react-bootstrap";
import { BsPrefixComponent } from "react-bootstrap/esm/helpers";
import {
  MdMenu,
  MdOutlineShoppingCart,
  MdOutlineSettings,
  MdShoppingBasket,
} from "react-icons/md";

const NavigationBar = () => {
  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="md"
        fixed="top"
        className="p-0"
      >
        <Container>
          <div className="text-light">Welcome, {`John Doe`}</div>
        </Container>
      </Navbar>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top" className="mt-4">
        <Container className="p-2">
          <Col
            xs="1"
            sm="1"
            md="1"
            lg="1"
            className="d-flex justify-content-center"
          >
            <Navbar.Brand href="/" className="d-flex">
              <MdShoppingBasket className="icons-size"></MdShoppingBasket>
            </Navbar.Brand>
          </Col>
          <Col xs="2" sm="2" md="2" lg="2">
            <Dropdown>
              <Dropdown.Toggle>
                <div className="d-flex align-items-center">
                  <MdMenu className="icons-size"></MdMenu>
                  <span className="ps-md-2 d-none d-sm-block">Menu</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" href="/">
                  Home
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" href="/about">
                  About
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs="5" sm="7" md="7" lg="7">
            <Form className="d-flex justify-content-center">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Col>
          <Col xs="2" sm="1" md="1" className="d-flex justify-content-end">
            <Dropdown align={{ xl: "start" }}>
              <Dropdown.Toggle>
                <MdOutlineSettings className="icons-size"></MdOutlineSettings>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" href="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" href="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" href="/">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs="2" sm="1" md="1">
            <Dropdown align={{ xl: "start" }}>
              <Dropdown.Toggle>
                <div className="d-flex align-items-center">
                  <MdOutlineShoppingCart className="icons-size"></MdOutlineShoppingCart>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" href="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" href="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" href="/">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
