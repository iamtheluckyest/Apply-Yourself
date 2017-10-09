import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardBody, Row, Col } from 'reactstrap';

export class SearchForm extends Component {
  render() {
    return (
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
              <Input onChange={this.props.handleInput} type="text" name="schoolName" id="schoolName" placeholder="Northwestern University" />
            </FormGroup>
            <FormGroup>
              <Label for="location">State</Label>
              <Input onChange={this.props.handleInput} type="text" name="location" id="location" placeholder="IL" />
            </FormGroup>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="minPopulation">Min. Undergrad Student Population</Label>
                  <Input onChange={this.props.handleInput} type="number" name="minPopulation" id="minPopulation" min="0" placeholder="6,000" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">   
                <FormGroup>
                  <Label for="maxPopulation">Max. Undergrad Student Population</Label>
                  <Input onChange={this.props.handleInput} type="number" name="maxPopulation" id="maxPopulation" placeholder="50,000" />
                </FormGroup>  
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="minTuition">Min. Out-of-State Tuition ($)</Label>
                  <Input onChange={this.props.handleInput} type="number" name="minTuition" id="minTuition" min="0" placeholder="6,000" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">   
                <FormGroup>
                  <Label for="minTuition">Max. Out-of-State Tuition ($)</Label>
                  <Input onChange={this.props.handleInput} type="number" name="maxTuition" id="maxTuition" placeholder="50,000" />
                </FormGroup>  
              </Col>
            </Row> 
            <Button onClick={this.props.handleSubmit}>Submit</Button>
          </Form>
        </CardBody>
    </Card>
    );
  }
}
