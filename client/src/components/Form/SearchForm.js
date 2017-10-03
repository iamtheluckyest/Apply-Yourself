import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardBlock } from 'reactstrap';

export class SearchForm extends Component {
  render() {
    return (
      <Card>
        <CardBlock>
          <Form>
            <FormGroup>
              <Label for="schoolName">School Name</Label>
              <Input onChange={this.props.handleInput} type="text" name="schoolName" id="schoolName" placeholder="Northwestern University" />
            </FormGroup>
            <Button onClick={this.props.handleSubmit}>Submit</Button>
          </Form>
        </CardBlock>
    </Card>
    );
  }
}
