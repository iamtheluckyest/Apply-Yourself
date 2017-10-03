import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardBlock, Row, Col } from 'reactstrap';

export class SearchForm extends Component {
  render() {
    return (
      <Card className="mb-5">
        <CardBlock>
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
              <Input onChange={this.props.handleInput} type="text" name="location" id="location" placeholder="Illinois" />
            </FormGroup>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="minPopulation">Min. Student Population</Label>
                  <Input onChange={this.props.handleInput} type="number" name="minPopulation" id="minPopulation" min="0" placeholder="6,000" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">   
                <FormGroup>
                  <Label for="maxPopulation">Max. Student Population</Label>
                  <Input onChange={this.props.handleInput} type="number" name="maxPopulation" id="maxPopulation" placeholder="50,000" />
                </FormGroup>  
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="minTuition">Min. Average Tuition ($)</Label>
                  <Input onChange={this.props.handleInput} type="number" name="minTuition" id="minTuition" min="0" placeholder="6,000" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6">   
                <FormGroup>
                  <Label for="minTuition">Max. Average Tuition ($)</Label>
                  <Input onChange={this.props.handleInput} type="number" name="maxTuition" id="maxTuition" placeholder="50,000" />
                </FormGroup>  
              </Col>
            </Row> 
            <FormGroup>
              <Label for="minTuition">Minimum Completion Rate (%)</Label>
              <Input onChange={this.props.handleInput} type="number" name="minCompletion" id="minCompletion" min="0" placeholder="30" />
            </FormGroup>               
            <Button onClick={this.props.handleSubmit}>Submit</Button>
          </Form>
        </CardBlock>
    </Card>
    );
  }
}
