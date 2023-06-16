import React from "react";
import { Container, Card } from "react-bootstrap";

const About = () => {
  return (
    <main>
      <Container className="d-flex justify-content-center">
        <Card className="p-3 p-sm-5 " style={{ maxWidth: "900px" }}>
          <h1 className="text-center pb-3">About</h1>
          <p>
            Shop is a React-based web application that provides users with a
            wide variety of products for online shopping. The application is
            designed to help users explore and purchase products conveniently
            from the comfort of their homes.
          </p>
          <h2 className="text-center pb-3 pt-4">Technologies Used</h2>
          <p>
            The project is built using React.js and utilizes a number of popular
            libraries and frameworks, including:
          </p>
          <ul>
            <li>
              React.js for building the user interface and managing state.
            </li>
            <li>React Router for handling navigation and routing.</li>
            <li>Redux Toolkit for state management.</li>
            <li>
              TypeScript for static typing and improved developer experience.
            </li>
            <li>Bootstrap for responsive and stylish UI components.</li>
            <li>Fakeshop API for fetching product data.</li>
          </ul>
          <h2 className="text-center pb-3 pt-4">Features</h2>
          <p>
            Shop includes a range of features to enhance the online shopping
            experience, including:
          </p>
          <ul>
            <li>
              Product search: Users can search for products by name, category,
              or keyword.
            </li>
            <li>
              Product details: Each product page provides detailed information
              about the item, including description and price.
            </li>
            <li>
              Shopping cart: Users can add products to their cart, view the
              total cost, and proceed to checkout.
            </li>
          </ul>
          <h2 className="text-center pb-3 pt-4">Future Development</h2>
          <p>
            In the future, I plan to add additional features to Shop, including:
          </p>
          <ul>
            <li>
              User accounts: Users will be able to create accounts to save their
              preferences, track orders, and manage their profile.
            </li>
            <li>
              Payment integration: Integration with popular payment gateways to
              allow secure online transactions.
            </li>
            <li>
              Order history: Users will be able to view their past orders and
              track the status of current orders.
            </li>
          </ul>
          <h2 className="text-center pb-3 pt-4">Credits</h2>
          <p>
            The project was created by Dariel Vasquez as a portfolio project to
            demonstrate proficiency in React development. The project would not
            have been possible without the generous support of the open-source
            community, including the creators of React.js, React Router, Redux
            Toolkit, TypeScript, Bootstrap, and Fakeshop API.
          </p>
        </Card>
      </Container>
    </main>
  );
};

export default About;
