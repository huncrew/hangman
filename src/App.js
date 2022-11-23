import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image, { propTypes } from 'react-bootstrap/Image'
import { useState } from 'react'
import './App.css';

/*
Game that takes users input to check against a word.
letters will be produced through an array and rendered.
checks are then made against each input, to display a different image
and check whether there is a winner or loser.
*/

const DisplayLetters = (props) => {
  // loop through the letters, get state from props. 
  const letters = props.letters;
  const letterBoxes = letters.map((letter, index) =>
      <Col key={index} lg={1}>
        <div className="letterBottom">
          <p className={letter.hidden}>{letter.letter}</p>
        </div>
      </Col> 
       );
  return (
  <Row className="g-0">
      {letterBoxes}
  </Row>
  );
}

const GameMessage = (props) => {
  if (props.won) {
    return (
      <h4>You've Won!</h4>
    )
  }
  if (props.lose) {
    return (
      <h4>You've Lost!</h4>
    )
  }
}

function App() {
  const randomWord = 'doughnuts';
  const livesOut = false;
  let letters = [];
  for (var i = 0; i < randomWord.length; i++) {
    let object = { 
      letter: randomWord[i], hidden: 'true'
    };
    letters.push(object);
  }
  const [won, updateWinner] = useState(false);
  const [lose, updateLoser] = useState(false);
  const [userLivesUsed, updateLives] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [wordLetters, updateHidden] = useState(letters)
  const imageSrc = `img/state${userLivesUsed}.GIF`


  const restartGame = () => {
    let letters = [];
    for (var i = 0; i < randomWord.length; i++) {
      let object = { 
        letter: randomWord[i], hidden: 'true'
      };
      letters.push(object);
    }
    updateHidden(letters);
    updateLives(1);
  }

  // handles losing a life, and loops through array to check for match.
  // handles if game loses or wins with if statement
  const handleLetter = (event) => {
    event.preventDefault(); // stops frame refresh on form submit
    if (!randomWord.includes(userInput)) {
      updateLives(userLivesUsed+1);
    } 
    // check for losing game
    if (userLivesUsed == 10) {
      updateLoser(true);
    }
    const nextLetters = wordLetters.map(letter => {
      if (letter.letter === userInput) {
        return {
          ...letter,
          hidden: 'false'
        };
      } else {
        return letter
      }
    });
    updateHidden(nextLetters);
      // check for winner
      if (nextLetters.every(obj => obj.hidden == 'false')) {
        updateWinner(true);     
      }
    }
  return (
    <>
    <Row>
      <Col>
      <Image 
      src={imageSrc}
      />
      </Col>
      <Col>
      <div className="winLose">
      <h6>Your results...</h6>
      <GameMessage lose={lose} won={won} />
      </div>
      </Col>
    </Row>
    <Row>
      <Col>
      <form className="Form">
      <label>
        <input
        type="text"
        name="value"
        onChange={(e) => setUserInput(e.target.value)}
        />
      </label>
      <Button onClick={handleLetter} type="submit">Submit</Button>
    </form>
      </Col>
    </Row>
    <DisplayLetters letters={wordLetters}/>
    <Button onClick={restartGame} className="restartButton">Restart Game</Button>
    </>
  );
}

export default App;
