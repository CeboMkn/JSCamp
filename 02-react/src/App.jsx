import { useRouter } from './hooks/useRouter.jsx';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { NotFoundPage } from './pages/404.jsx';

export function App() {

  const { currentPath } = useRouter()

  let page

  if (currentPath === '/') {
    page = <HomePage />
  } else if (currentPath === '/search') {
    page = <SearchPage />
  } else {
    page = <NotFoundPage />
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}
