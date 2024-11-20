// components/TransportTypeSelector/TransportTypeSelector.js
import React from 'react';
import { FormGroup, Input, Label, Row, Col } from 'reactstrap';

const TransportTypeSelector = ({ transType, setTransType }) => (
  <FormGroup tag="fieldset">
    <Row>
      <Col md="4">
        <legend>Type de transport</legend>
      </Col>
      <Col md="4">
        <FormGroup check>
          <Input
            name="transportType"
            type="radio"
            value="convoyeur professionnel"
            onChange={(e) => setTransType(e.target.value)}
            checked={transType === 'convoyeur professionnel'}
          />
          {' '}
          <Label check>
            Convoyeur professionnel
          </Label>
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup check>
          <Input
            name="transportType"
            type="radio"
            value="plateau porteur"
            onChange={(e) => setTransType(e.target.value)}
            checked={transType === 'plateau porteur'}
          />
          {' '}
          <Label check>
            Plateau porteur
          </Label>
        </FormGroup>
      </Col>
    </Row>
  </FormGroup>
);

export default TransportTypeSelector;