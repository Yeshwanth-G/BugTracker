import './App.css';
import { Button,  Flex, Heading, Text,useColorMode, VStack, Spacer, HStack, useColorModeValue, } from '@chakra-ui/react'
import { MoonIcon, SunIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { BrowserRouter, Routes, Route, useNavigate, Link, } from 'react-router-dom'
import { useState,useContext } from 'react';
import Bug from './pages/bugs/bug_redirect';
import Login from './pages/Auth/LoginForm';
import { useSelector,useDispatch } from 'react-redux';
import { actions } from './state/features/user/userSlice';
import { usercontext } from './config/useContext';
import Org from './pages/Org/org_dashboard'
import BugDetails from './pages/bugs/bugdetails';
import ProtectedRoute from './config/ProtectedRoute';
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [temp, settemp] = useState([]);
  const userContext=useContext(usercontext);
  const state=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const {isLoggedin,user}=state;
  const navigate=useNavigate();
  return (
      <Flex flexDirection={'column'} flex={1} maxH={'100%'} overflow={'hidden'}>
        <Flex bg={useColorModeValue('#008080', 'black')} p='15px' mt={'-8px'} >
          <Heading color={'white'}>BugT</Heading>
          <Spacer />
          <HStack spacing={5}>
            <Text color={'white'} as={Link} to="/">Home</Text>
            <Text color={'white'} as={Link} to="/orgs">Organisations</Text>
            <Button onClick={toggleColorMode} mr={5} mt={2} colorScheme='gray'>{colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}</Button>
            <Button disabled={!isLoggedin} onClick={()=>{
              dispatch(actions.logout())
            }}>{<ArrowForwardIcon/>}</Button>
          </HStack>
        </Flex>
        <VStack justify={'center'} flex={1} maxH={'100%'} overflow={'auto'} mt={0}>
          <Routes>          
            <Route path='/' element={ <Login/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/orgs/*' element={<ProtectedRoute><Org /></ProtectedRoute>}></Route>
            <Route path='/bugs/*' element={<ProtectedRoute><Bug/></ProtectedRoute>}></Route>
            <Route path='/bugdetails/*' element={<ProtectedRoute><BugDetails/></ProtectedRoute>}></Route>
          </Routes>
        </VStack>
      </Flex>
  );
}

export default App;
