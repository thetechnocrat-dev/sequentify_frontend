import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap/lib';

// custom components

class AlignInput extends Component {
  state = {
    isLoading: false,
    seqA: '',
    seqB: '',
    errorsA: [],
    errorsB: [],
  };

  validateInput(seq) {
    const nucleotides = ['a', 't', 'c', 'g', 'A', 'T', 'C', 'G'];
    var errors = [];
    if (seq.length === 0) {
      errors.push('Input sequence is required');
    }

    if (!seq.split('').every(el => { return nucleotides.includes(el) })) {
      errors.push('Input sequence can only contain a, t, c, g, A, T, C, or G.');
    }

    return errors;
  }

  clickAlign() {
    var errorsA = this.validateInput(this.state.seqA);
    var errorsB = this.validateInput(this.state.seqB);
    if (errorsA.length === 0 && errorsB.length === 0) {
      this.setState({ errorsA: [], errorsB: [], isLoading: true });
      axios.post('http://localhost:8080/align', {
          SeqA: this.state.seqA.toLowerCase(),
          SeqB: this.state.seqB.toLowerCase(),
        })
        .then(response => {
          this.setState({ isLoading: false });
          this.props.updateOutput(response.data);
        }
      )
        .catch(error => {
          this.setState({ isLoading: false, errors: ['Server error try refreshing the page'] });
        }
      );
    } else {
      this.setState({ errorsA: errorsA, errorsB: errorsB });
    }
  }

  handleSequenceChange(seqKey, e) {
    var newState = {};
    newState[seqKey] = e.target.value;
    this.setState(newState); 
  }

  makeErrorAlert(errorKey) {
    if (this.state[errorKey].length > 0) {
      return (
        <Alert bsStyle="warning">
          {this.state[errorKey].join('\n')} 
        </Alert>
      );
    }
  }

  render () {
    return (
      <Row>
        <Col xs={12} sm={6}>
          {this.makeErrorAlert('errorsA')}
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Insert first sequence here"
              style={{ height: this.props.height }}
              onChange={this.handleSequenceChange.bind(this, 'seqA')}
            />
          </FormGroup>
        </Col>
        
        <Col xs={12} sm={6}>
          {this.makeErrorAlert('errorsA')}
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Insert second sequence here"
              style={{ height: this.props.height }}
              onChange={this.handleSequenceChange.bind(this, 'seqB')}
            />
          </FormGroup>
        </Col>

        <Col xs={12} style={{ textAlign: 'center' }}>
          <Button
            onClick={this.clickAlign.bind(this)}
            bsStyle="success"
            style={{ margin: '-5px 0px 10px 0px' }}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? 'Aligning...' : 'Align'}
          </Button>
        </Col>
      </Row>
    )
  }
}

AlignInput.propTypes = {
  updateOutput: React.PropTypes.func.isRequired,
  height: React.PropTypes.number.isRequired,
}

export default AlignInput;
