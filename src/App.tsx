import { Outlet } from 'react-router-dom';

import PathTracker from '@/components/Auth/PathTracker';

function App() {
  return (
    <>
      <PathTracker />
      <Outlet />
    </>
  );
}

export default App;
