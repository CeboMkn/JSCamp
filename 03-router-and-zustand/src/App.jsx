import { Routes, Route } from 'react-router';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { ContactPage } from './pages/Contact.jsx';
import { DetailJob } from './pages/DetailJob.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx'

export function App() {

  return (
    <>
      <div className='organized'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/job/:jobId" element={<DetailJob />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage codeError="notFound" />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}
