import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './Editor';

const App = () => (
  <div>
    {/* クエスチョンマークをつけることでidはオプションになる */}
    <Route path="/events/:id?" component={Editor} />
  </div>
);

export default App;
