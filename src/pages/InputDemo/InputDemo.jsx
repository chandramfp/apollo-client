import React from 'react';
import * as yup from 'yup';


import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constants';

// const schema = yup.object().shape({
//   name: yup.string('Name is required field').required('Name is required field').min(3),
//   sport: yup.string('Sport is a required feild').required('Sport is a required feild'),

// });

// const schemaTest = {
//   name: 'shekhar',
//   sport: 'cricket',
// };


// console.log(schema.validateSync(schemaTest));


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.error = false;
    this.nameTouched = false;
    this.sportTouched = false;
    this.whatyoudoTouched = false;
    this.schema = yup.object().shape({
      name: yup.string('Name is required field').required('Name is required field').min(3),
      sport: yup.string('Sport is a required feild').required('Sport is a required feild'),
      cricket: yup.string().when('sport', {
        is: 'cricket',
        then: yup.string().required('what you do is required'),
      }),
      football: yup.string().when('sport', {
        is: 'football',
        then: yup.string().required('what you do is required'),
      }),

    });
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  handlerOnChangeTextField = (e) => {
    // console.log('inside onChange', e.target.value);
    this.setState({ name: e.target.value });
    // console.log(this.state);
  }

  handlerOnChangeSelectField = (e) => {
    // console.log('inside onChange', e.target.value);
    let { cricket, football } = this.state;
    cricket = '';
    football = '';
    this.setState({ sport: e.target.value, cricket, football });
    // console.log(this.state);
  }

  handlerOnChangeRadioOption = (e) => {
    let { cricket, football } = this.state;
    const { sport } = this.state;
    if (sport === 'football') {
      cricket = '';
      this.setState({ football: e.target.value, cricket });
    }
    if (sport === 'cricket') {
      football = '';
      this.setState({ cricket: e.target.value, football });
    }
  }

  getRadioOption = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  onClick = () => {
    alert('Successfull');
  }

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({ touched: { ...touched, [field]: true } });
  }


  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };


  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField
          onChange={this.handlerOnChangeTextField}
          error={this.getError('name')}
          value={name}
          onBlur={() => this.isTouched('name')}
        />

        <p><b>Select the game you play?</b></p>
        <SelectField
          options={selectOptions}
          defaultText="Select"
          onChange={this.handlerOnChangeSelectField}
          Value={sport}
          error={this.getError('sport')}
          onBlur={() => this.isTouched('sport')}
        />

        {
          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do?</b></p>
              <RadioGroup
                options={this.getRadioOption()}
                onChange={this.handlerOnChangeRadioOption}
                Value=""
                error={this.getError(sport)}
                onBlur={() => this.isTouched(sport)}
              />
            </>
          )
        }
        <div align="right">
          <Button value="cancel" />
          <Button value="submit" disabled={this.hasErrors()} onClick={this.onClick} />
        </div>
      </>
    );
  }
}

export default InputDemo;
