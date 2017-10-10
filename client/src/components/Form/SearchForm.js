import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardBody, Row, Col } from 'reactstrap';

export const SearchForm = props => 
  <Card className="mb-5">
    <CardBody>
      <Form>
        <FormGroup>
          <FormText>
            Search for schools with any of the following criteria.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="schoolName">School Name</Label>
          <Input onChange={props.handleInput} type="text" name="schoolName" id="schoolName" placeholder="Northwestern University" />
        </FormGroup>
        <FormGroup>
          <Label for="location">State</Label>
          <Input onChange={props.handleInput} type="text" name="location" id="location" placeholder="IL" />
        </FormGroup>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="minPopulation">Min. Undergrad Student Population</Label>
              <Input onChange={props.handleInput} type="number" name="minPopulation" id="minPopulation" min="0" placeholder="6,000" />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">   
            <FormGroup>
              <Label for="maxPopulation">Max. Undergrad Student Population</Label>
              <Input onChange={props.handleInput} type="number" name="maxPopulation" id="maxPopulation" placeholder="50,000" />
            </FormGroup>  
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="minTuition">Min. Tuition ($)</Label>
              <Input onChange={props.handleInput} type="number" name="minTuition" id="minTuition" min="0" placeholder="6,000" />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">   
            <FormGroup>
              <Label for="minTuition">Max. Tuition ($)</Label>
              <Input onChange={props.handleInput} type="number" name="maxTuition" id="maxTuition" placeholder="50,000" />
            </FormGroup>  
          </Col>
        </Row> 
        <Row>
          <Col xs="12">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="inState" checked={props.inState} onChange={props.handleInput}/>{' '}
                Search by in-state tuition
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </CardBody>
  </Card>
