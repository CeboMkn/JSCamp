import { useEffect, useState } from 'react';

import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { NotFoundPage } from './pages/404.jsx';


export function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  /* const { pathname } = window.location */

  let page

  if (currentPath === '/') {
    page = <HomePage />
  } else if (currentPath === '/search') {
    page = <SearchPage />
  } else {
    page = <NotFoundPage />
  }

  const handleLocationChange = () => {
    setCurrentPath(window.location.pathname)
  }

  useEffect(() => {
    window.addEventListener('popstate', () => {
      handleLocationChange()
    })
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}
