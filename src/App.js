import React from 'react';
import Store from './state/Store';
import rootReducer from './state/ducks/rootReducer';
import Container from './Container';




function App() {
  
  return (
    <Store rootReducer={rootReducer}>
      <Container />
    </Store>
  );
}

export default App;
