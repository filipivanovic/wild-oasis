import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles.js'
import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 700;
  background-color: yellow;
`
const StyledApp = styled.div`
  padding: 20px;
  background-color: orangered;
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello World!</H1>
        <Button>Click me</Button>
        <Input type="number" placeholder="Enter a number" />
      </StyledApp>
    </>
  )
}

export default App