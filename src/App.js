import { Suspense } from 'react';
import Home from './routes/home/Home';
import Story from './routes/story/Story';
import User from './routes/user/User';
import Send from './routes/send/send.component';
import Edit from './routes/edit/edit.component';
import Authentication from './routes/authentication/Authentication';
import Navigation from './routes/navigation/Navigation';
import { Routes, Route } from 'react-router-dom';
import SpinnerComponent from './components/spinner/spinner.component';

const App = () => {
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <Routes>
        <Route path="/" element={<Navigation />} >
            <Route index element={<Home/>} />
            <Route path='story/:id' element={<Story />} />
            <Route path='send' element={<Send />} />
            <Route path='story/edit/:id' element={<Edit />} />
            <Route path='user/:username' element={<User />} />
            <Route path='auth' element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;
