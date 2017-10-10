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
          <Label for="state">State</Label>
          <Input className="form-control" onChange={props.handleInput} type="select" name="state" id="state">
            <option value="">N/A</option>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DC">District of Columbia</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
          </Input>
        </FormGroup>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="minPopulation">Min. Student Population</Label>
              <Input onChange={props.handleInput} type="number" name="minPopulation" id="minPopulation" min="0" placeholder="6,000" />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">   
            <FormGroup>
              <Label for="maxPopulation">Max. Student Population</Label>
              <Input onChange={props.handleInput} type="number" name="maxPopulation" id="maxPopulation" placeholder="50,000" />
            </FormGroup>  
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="gradPop" checked={props.gradPop} onChange={props.handleInput}/>{' '}
                Search by only grad student population
              </Label>
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
