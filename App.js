import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useState } from 'react';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => setDataLoaded(true)}
            onError={()=> console.log(err)}
            />;
  }

  const configureNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  }
  let content = <StartGameScreen startGame={startGameHandler} />;
  content = (
    <GameOverScreen
    guessRounds={1}
      userNumber={1}
      onRestart={configureNewGame}
    />
  );

  if(userNumber && guessRounds <=0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds>0){
    content = <GameOverScreen userChoice={userNumber} roundsNumber={guessRounds} onRestart={configureNewGame} />
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1


  },
});
