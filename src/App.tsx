import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(async () => await import('./pages/home/index'));
const Detail = lazy(async () => await import('./pages/detail'));

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/detail/:id'
          element={
            <Suspense>
              <Detail />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
