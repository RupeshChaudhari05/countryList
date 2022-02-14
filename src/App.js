import { useEffect } from 'react';
import calculatorData from "./Data/data.json";
import Home from './Pages/Home/Home';
import { loadData } from "./Redux/Actions/CountryAction";
import { useDispatch } from "react-redux";
import { Navbar, Container } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData(calculatorData.countries))
  }, [dispatch]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Countires</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Home />
      </Container>
    </>
  );
}

export default App;
