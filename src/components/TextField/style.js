import styled, { css } from 'styled-components';

const Input = styled.input`
${(props) => props.value === 'Disabled input'
    && css`
     width: 100%
    `};
    ${(props) => props.value === 'Accessible'
    && css`
     width: 100%
    `};
    ${(props) => props.value > 100
    && css`
     width: 100%;
     border-color: red;
    `};
  width:100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;


`;

const Para = styled.p`
color: red;
`;

const DivWrapper = styled.div`
border: 1px solid black;
padding: 6px;
`;

export const P = styled.p`
color: red;
fontsize: 10px;
margin: auto;
`;


export { Para, DivWrapper };
export default Input;
