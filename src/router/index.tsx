import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from '@/page/main';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
