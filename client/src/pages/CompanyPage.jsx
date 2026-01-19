import { useParams } from 'react-router-dom';
import JobList from '../components/JobList';
import { useCompany } from '../lib/graphql/hooks';

function CompanyPage() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  
  console.log("state = ", {company, loading, error});
  
  if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div className='has-text-danger'>Data Unavailable</div>
  }
  
  if (!company) return null;

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <div>
        <JobList jobs={company.jobs} /> 
      </div>
    </div>
  );
}

export default CompanyPage;
