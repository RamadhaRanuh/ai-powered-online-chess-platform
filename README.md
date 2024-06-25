References 🕎
https://www.npmjs.com/package/react-chessboard -> React-chessboard UI Documentation (The frontend for chess)
https://blog.openreplay.com/building-a-chess-game-with-react/ -> Website Tutorial for creating multiplayer Chess in ReactJS with SocketIO as the server
https://www.youtube.com/watch?v=Iri__zwxwHg&list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj -> Youtube Tutorial for creating Chess in ReactJS
https://github.com/jhlywa/chess.js?tab=readme-ov-file -> Chess.JS Github Documentation (The algorithm for chess)
Environments 🏔️
Tools: 
NodeJS
ReactJS
Typescript
Library:
react-chessboard -> Rendered chess board
chess-js -> Move generation and validation
MUI (Material & UI) -> UI Tools for react dependencies
socket.io
Documentation 📙
Commit 1.0.0
Create main Directory : Chessboard Project (Dir : E:\Users\ravendrasr\Documents\Independent Project\Chessboard Project)
Create 2 separate directory inside Chessboard Project : Client & Server
Inside client:
1. Install NPX dependencies
npx create-react-app .
Install the required dependencies for the client
npm install react-chessboard chess.js socket.io-client @mui/material @emotion/react @emotion/styled
delete all files in the src directory except index.js and App.js. Edit the index.js
Edit the App.js:
import {Container} from '@mui/material';
import Game from './Game';

function App() {
  return (
    <Container>
      <Game />
    </Container>
  );
}

export default App;
Create Directory Components, and inside it create CustomDialog.js
Edit CustomDialog.js:
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog({ open, children, title, contentText, handleContinue }) {
  return (
    <Dialog open={open}> {/*dialog container*/}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent> {/* Main body of modal/dialog */}
        <DialogContentText> {/* main text */}
          {contentText}
        </DialogContentText>
        {children} {/* Other content */}
      </DialogContent>
      <DialogActions> {/* Dialog action buttons */}
        {/* Force users to make input without option to cancel */}
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
Create Game.js file
Inside Game.js:
import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";

function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []); // <- 1
  const [fen, setFen] = useState(chess.fen()); // <- 2
  const [over, setOver] = useState("");

  // onDrop function
  function onDrop() {} // <- 3
  
  // Game component returned jsx
  return (
    <>
      <div className="board">
        <Chessboard position={fen} onPieceDrop={onDrop} />  {/**  <- 4 */}
      </div>
      <CustomDialog // <- 5
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
}

export default Game;
Add onDrop Function:
  function onDrop(sourceSquare, targetSquare) {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      // promotion: "q",
    };

    const move = makeAMove(moveData);

    // illegal move
    if (move === null) return false;

    return true;
  }
Add moveData function:
  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move); // update Chess instance
        setFen(chess.fen()); // update fen state to trigger a re-render
  
        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
  
        if (chess.isGameOver()) { // check if move led to "game over"
          if (chess.isCheckmate()) { // if reason for game over is a checkmate
            // Set message to checkmate. 
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // The winner is determined by checking which side made the last move
          } else if (chess.isDraw()) { // if it is a draw
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // null if the move was illegal, the move object if the move was legal
    },
    [chess]
  );
Chess is playable on client side
