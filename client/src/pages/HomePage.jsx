import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks.js';
import PaginationBar from '../components/PaginationBar.jsx';

// getJobs().then((jobs) => console.log(jobs));

const JOBS_PER_PAGE = 20;
function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {jobs, loading, error} = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);
    if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div className='has-text-danger'>Data Unavailable</div>
  }
  
  if (!jobs) return null;
  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <PaginationBar currentPage = {currentPage} totalPages = {totalPages} onPageChange = {setCurrentPage} />
      {/* <div>
        <button className="buttton" disabled = {currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span>{currentPage}</span>
        <button className="buttton" disabled={currentPage === totaPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div> */}
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
