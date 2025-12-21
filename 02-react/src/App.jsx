import { useState } from 'react';

import jobsData from './assets/data.json'

import './App.css'

import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SerarchFormSection } from '../components/SerarchFormSection.jsx';
import { MostrandoNumRresults } from '../components/MostrandoNumResults.jsx';


export function App() {

  const RESULTS_PER_PAGE = 4

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice((currentPage -1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE)

  return (
    <>

      <Header />

      <main className="main_estrecho">
        <div>

          <SerarchFormSection />

          <JobListing jobsData={pagedResults}/>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          <MostrandoNumRresults currentPage={currentPage} results={RESULTS_PER_PAGE} jobs={jobsData}/>

        </div>
      </main>

      <Footer />

    </>
  );
}
