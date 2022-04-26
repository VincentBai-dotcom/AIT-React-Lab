import logo from './logo.svg';
import './App.css';
import Card from './Card';
import { useState } from 'react';

function App() {
  const [cards,setCards] = useState(shuffle([
    "Chicken",
    "Chicken",
    "Burger",
    "Burger",
    "Diamond",
    "Diamond",
    "Cookie",
    "Cookie",
    "Pineapple",
    "Pineapple",
    "Smile",
    "Smile",
    "Cry",
    "Cry",
    "Fire",
    "Fire",
  ]));

  const [showButton,setShowButton] = useState(false);

  const [reveal, setReveal] = useState([]);

  const [turn, setTurn] = useState(1);

  const [holds, setHolds] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    ]);

  const [show, setShow] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    ]);

  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
 }

  function shuffle(array){
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex)
    }
    return array;
  }

  function toggleCard(index){
    return () =>{
      const newShow= [...show];
      newShow[index] = !newShow[index];
      setShow(newShow);
      const newReveal = [...reveal];
      newReveal.push(index);
      setReveal(newReveal);
      if(newReveal.length === 2){
        if(cards[newReveal[0]] === cards[newReveal[1]]){
          const newHolds = [...holds];
          newHolds[newReveal[0]] = true;
          newHolds[newReveal[1]] = true;
          setHolds(newHolds);
          setTurn(turn+1);
          setReveal([]);
        }
        else{
          setShowButton(true);
          setHolds([true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]);
        }
      }
      
    }
  }
  
  function handleNextTurn(){
    const newShow = [...show];
    newShow[reveal[0]] = false;
    newShow[reveal[1]] = false;
    setTurn(turn+1)
    setShow(newShow);
    setReveal([]);
    setShowButton(false);
    const newHolds = [...holds];
    for(let i = 0; i < 16;i++){
      if(!newShow[i]){
        newHolds[i] = false;
      }
    }
    setHolds(newHolds);
  }
  function cardGenerator(value, key){
    return (
      <Card  key = {key} show = {show[key]} face = {value} toggleCard = {toggleCard(key)} hold = {holds[key]}/>
    )
  }

  function msg(){
    for(let i = 0; i < 16;i++){
      if(!show[i])
        return (<p>Turn {turn}</p>);
    }
    return (<p>Game Over!</p>)
  }

  return (
    <>
      {cards.map(cardGenerator)}
      {msg()}
      {showButton && <button onClick = {handleNextTurn}>Next Turn</button>}
    </>
  );
}

export default App;
