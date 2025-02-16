import { Card, CardImg, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Homepage = (props) => {
  return (
    <Container id="homepage" className="text-center">
      <Row className="w-75 mx-auto ">
        <Col className="px-0 mt-4">
          <Card className="border-0 ">
            <CardImg
              src="https://static.vecteezy.com/system/resources/thumbnails/010/989/526/small_2x/rainy-weather-3d-rendering-isolated-on-transparent-background-ui-ux-icon-design-web-and-app-trend-png.png"
              className="mt-2"
            />
          </Card>
        </Col>
      </Row>
      <h1 className=" w-75 mx-auto text-white">EpiWeather</h1>
      <h4 className=" text-white opacity-75 mt-5 w-75 mx-auto">Get to know your weather maps and radar precipitation forecast</h4>
      <Form className="w-75 mx-auto mt-5 ">
        <Form.Group className="mt-5 w-75 mx-auto">
          <Form.Control type="text" placeholder="Search city..." value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </Form.Group>
        <Link to="/details" className="btn btn-success mt-5 mb-5">
          Search
        </Link>
      </Form>
      <NavBar />
    </Container>
  );
};
export default Homepage;
