import './App.css'
import { Routes, Route } from 'react-router';
import { lazy, Suspense, useState } from 'react';


import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Spinner } from './components/Spinner.jsx';

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const ContactPage = lazy(() => import('./pages/Contact.jsx'))
const DetailJob = lazy(() => import('./pages/DetailJob.jsx'))
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'))

export function App() {

  return (
    <>
      <div className='organized'>
        <Header/>
        <Suspense fallback={
          <div className="env_lazy">
            <Spinner />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/job/:jobId" element={<DetailJob />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<ErrorPage codeError="notFound" />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  )
}
