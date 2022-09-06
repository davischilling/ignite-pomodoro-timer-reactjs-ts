import styled, { css } from 'styled-components'

export type ButtonColors = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonProps {
  colorProp: ButtonColors
}

const btnColors = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

const styledComponent = {
  Button: styled.button<ButtonProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background-color: ${(props) =>
      props.colorProp === 'secondary'
        ? props.theme['yellow-500']
        : props.colorProp === 'danger'
        ? props.theme['red-500']
        : props.colorProp === 'success'
        ? props.theme['green-500']
        : props.theme['gray-400']};
    color: ${(props) => props.theme.white};

    /* ${({ colorProp }) => css`
      background-color: ${btnColors[colorProp]};
    `} */
  `,
}

export default styledComponent
