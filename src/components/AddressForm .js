import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";

export const AddressForm = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  // setUser({...user, email: e.target.value })

  return (
    <Form className="Form">
      <h2 className="Nav">Shipping address</h2>

      <FormGroup row>
        <Label sm={2}>Address Line:</Label>
        <Col sm={10}>
          <Input
            type="textarea"
            name="adress"
            placeholder="street/flat number"
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}> City/Town:</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="city"
            placeholder="city"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Country:</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="country"
            placeholder="country"
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Postcode:</Label>
        <Col sm={10}>
          <Input
            type="text"
            name="postcode"
            placeholder="postcode"
            onChange={(e) =>
              setAddress({ ...address, postcode: e.target.value })
            }
          />
        </Col>
      </FormGroup>
    </Form>
  );
};
