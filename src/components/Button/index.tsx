import styledComponents, { ButtonColors } from './Button.styles'

const { Button } = styledComponents

interface ButtonComponentProps {
  color?: ButtonColors
}

export const ButtonComponent = ({
  color = 'primary',
}: ButtonComponentProps) => <Button colorProp={color}>Click</Button>
