import styled, { css } from 'styled-components';

export const Buttons = styled.button`
${(props) => props.type === 'cancel' && css`
background-color: white;
color: black;
padding: 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 6px;
border: 1px soilid black;
`};
${(props) => props.disabled === true && props.type === 'submit' && css`
background-color: #D0D3D4;
border: none;
color: #B3B6B7;
padding: 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 6px;
`};
${(props) => props.disabled === false && props.type === 'submit' && css`
background-color: #4CAF50;
border: none;
color: white;
padding: 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 6px;
`};
${(props) => props.type === 'Back' && css`
background-color: #e0e0e0;
color: #424242;
padding: 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 6px;
border: 1px soilid black;
`};
`;
