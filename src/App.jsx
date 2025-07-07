import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles.js'
import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'
import Heading from './ui/Heading.jsx'
import Row from './ui/Row.jsx'

const StyledApp = styled.div`
  padding: 20px;
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type={`horizontal`}>
            <Heading as={`h1`}>The wild oasis!</Heading>
            <div>
              <Heading as={`h2`}>check in and out!</Heading>
              <Button>Check in</Button>
              <Button variation={`secondary`} size={`small`}>
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as={`h3`}>Form</Heading>
            <form>
              <Input type="number" placeholder="Enter a number" />
              <Input type="number" placeholder="Enter a number" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  )
}

export default App