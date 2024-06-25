import {Container} from '@mui/material';
import Game from './game/Game';
import Header from './game/header/header';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Game />
      </Container>
    </>

  );
}

export default App;
