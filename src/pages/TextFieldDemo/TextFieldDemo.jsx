import React from 'react';

import {
  Para, DivWrapper, TextField, Slider,
} from '../../components/index';
import { banners } from '../../configs/constants';


const TextFieldDemo = () => (
  <div>
    <Slider altText="image not found" banners={banners} defaultBanner="default.png" duration={2000} height={200} random={false} />
    <DivWrapper>
      <p><b>This is a Disabled Input</b></p>
      <TextField value="Disabled input" disabled error />
      <p><b>A Valid Input</b></p>
      <TextField value="Accessible" error />
      <p><b>An Input with errors </b></p>
      <TextField value="101" error />
      <Para>Could not be greater than</Para>
    </DivWrapper>
  </div>
);


export default TextFieldDemo;
