import Home from './routes/home/Home';
import Story from './routes/story/Story';
import Send from './routes/send/send.component';
import Authentication from './routes/authentication/Authentication';
import Navigation from './routes/navigation/Navigation';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
          <Route index element={<Home/>} />
          <Route path='story/:id' element={<Story />} />
          <Route path='send' element={<Send />} />
          <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
};

export default App;
