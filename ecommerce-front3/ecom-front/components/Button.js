import styled,{css} from "styled-components"
import { colorbutton } from "../lib/colors";
export const ButtonStyle = css`
  @media screen and (min-width:768px) {
    padding:5px 15px;
  }
  border: 0;
  padding: 5px 7px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height:16px;
    margin-right: 5px;
  }
  background-color: ${props => (props.primary && !props.outline? `${colorbutton}` : "")};
  color: ${props => (props.primary && !props.outline? "#fff" : "")};
  border:${props => (props.primary && !props.outline? `1px solid ${colorbutton}` : "")};
  background-color: ${props => (props.primary && props.outline? "transparent" : "")};
  color: ${props => (props.primary && props.outline? `${colorbutton}` : "")};
  border:${props => (props.primary && props.outline? `1px solid ${colorbutton}` : "")};
  background-color: ${props => (props.white && !props.outline? "#fff" : "")};
  color: ${props => (props.white && !props.outline? "#000" : "")};
  background-color: ${props => (props.white && props.outline? "transparent" : "")};
  color: ${props => (props.white && props.outline? "#fff" : "")};
  border:${props => (props.white && props.outline? "1px solid #fff" : "")};
  ${props => 
    props.black && 
    !props.outline && 
    css`
    background-color:#000;
    color:#fff;
  `};
  ${props => 
    props.black && 
    props.outline && 
    css`
    background-color:transparent;
    color:#000;
    border:1px solid #000;
  `};
  ${props =>
    props.block &&
    css`
      display:block;
      width:100%;
  `};
  ${props =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg{
        height:20px;
      }
  `};
`;

const StyledButton = styled.button.attrs(props => ({
  primary: props.primary ? true : undefined,
  white: props.white ? true : undefined,
  outline: props.outline ? true : undefined,
}))`${ButtonStyle}`

export default function Button({children, ...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}