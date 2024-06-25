# Chessboard Project

## Overview

This project is a chess game built using ReactJS, TypeScript, and various libraries including `react-chessboard`, `chess.js`, and `socket.io`. The project is structured with a client-server architecture, where the client handles the frontend and the server manages game logic and communication.

## Environments

### Tools

- NodeJS
- ReactJS
- TypeScript

### Libraries

- `react-chessboard`: Rendered chess board
- `chess.js`: Move generation and validation
- `@mui/material` (MUI): UI Tools for React dependencies
- `socket.io`: Real-time communication

## Documentation

### Commit 1.0.0

#### Directory Structure

- Create main directory: `Chessboard Project` (Dir: `E:\Users\ravendrasr\Documents\Independent Project\Chessboard Project`)
- Create two separate directories inside `Chessboard Project`: `Client` & `Server`

### Client Setup

1. **Initialize React App:**

    ```bash
    npx create-react-app .
    ```

2. **Install Required Dependencies:**

    ```bash
    npm install react-chessboard chess.js socket.io-client @mui/material @emotion/react @emotion/styled
    ```

3. **Clean Up Initial Files:**
    - Delete all files in the `src` directory except `index.js` and `App.js`.

4. **Edit `index.js`:**

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```

5. **Edit `App.js`:**

    ```javascript
    import { Container } from '@mui/material';
    import Game from './components/Game';
    import Header from './header/Header';

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
    ```

### Components

#### Create `CustomDialog.js`:

```javascript
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog({ open, children, title, contentText, handleContinue }) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
