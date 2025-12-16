import './App.css'
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SerarchFormSection } from '../components/SerarchFormSection.jsx';

export default function App() {

  const currentPage = 1
  const totalPages = 10

  return (
    <>

      <Header />

      <main className="main_estrecho">
        <div>

          <SerarchFormSection />

          <JobListing />

          <Pagination currentPage={currentPage} totalPages={totalPages}/>

        </div>
      </main>

      <Footer />

    </>
  );
}
