import { Fragment } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";

const Order = (props) => {
  const order = props.order;
  console.log(order);
  const a = order.address;
  const o = order.order;
  const u = order.users
  let sum = 0;

  order.products.forEach((item) => {
    sum += item.quantity * item.price.value;
  });
  return (
    <Fragment>
      <Header />
      {order !== null ? (
        <Container style={{color:"#011a00", fontFamily:"Roboto"}}>
          <Row style={{ marginBottom: "6%", marginTop: "10%" }}>
            <h3>  Thank you for your order {u.firstName}!</h3>
          </Row>
          <Row >
            <Col>
              <p>Order Items</p>
              <Table style={{color:"#011a00", fontFamily:"Roboto"}}>
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.value}</td>
                    </tr>
                  ))}
                  <p>Sum: £{sum}</p>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row style={{ marginBottom: "6%", marginTop: "6%" }}>
            <Col>
              <p>Order Adress</p>
              <Table style={{color:"#011a00", fontFamily:"Roboto"}}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Surnamy</th>
                    <th>Street and flat number</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Postcode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{a.address}</td>
                    <td>{a.city}</td>
                    <td>{a.country}</td>
                    <td>{a.postcode}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row style={{ marginBottom: "6%", marginTop: "%" }}>
            <Col>
              <p>Order details</p>
              <Table style={{color:"#011a00", fontFamily:"Roboto"}}>
                <thead>
                  <tr>
                    <th>Order id</th>
                    <th>User id</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{o.id}</td>
                    <td>{o.userId}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          
        </Container>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  // Fetch data from external API
  const response = await fetch(
    `http://localhost:3000/api/order/${context.params.id}`
  );

  // read product info from response
  // if response.ok -> data = await.. otherwise data = null (assign value to data)
  const data = response.ok ? await response.json() : null;
  console.log(data, "d");
  // Pass data to the page via props
  return { props: { order: data } };
}

export default Order;
