import { Route } from './hooks/Route.jsx';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';

export function App() {

  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Footer />
    </>
  )
}
