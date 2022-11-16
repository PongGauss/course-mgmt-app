import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

const CourseSearchForm = () => {
  return (
    <Form>
      <Row className="align-items-center">
        <Col sm={5} className="my-3">
          <Form.Label htmlFor="inlineFormInputName" visuallyHidden></Form.Label>
          <Form.Control
            id="inlineFormInputName"
            placeholder="Your interesting course name"
          />
        </Col>
        <Col sm={5} className="my-3">
          <Form.Label
            htmlFor="inlineFormInputGroupUsername"
            visuallyHidden
          ></Form.Label>
          <Form.Control
            id="inlineFormInputGroupUsername"
            placeholder="Your interesting course date"
            type="date"
          />
        </Col>
        <Col xs="auto" className="my-2">
          <Button type="submit">Search!</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CourseSearchForm;
