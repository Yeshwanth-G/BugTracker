import logo from './logo.svg';
import './App.css';
import { Button, ChakraProvider, CSSReset, Flex, Heading, Text, useColorMode, VStack, IconButton } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import Login from './components/LoginForm';
function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Flex bg='black' justify={'space-between'} p='20px'>
        <Heading textColor={'white'} >BugTracker</Heading>
        <Button onClick={toggleColorMode} >{colorMode}</Button>
      </Flex>
      <Flex bg={'red'} align='center' justify={'center'} h='100%'>
        <Login />
      </Flex>
    </div>
  );
}

export default App;
