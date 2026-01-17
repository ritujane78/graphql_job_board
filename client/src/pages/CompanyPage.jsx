import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  // const [company, setCompany] = useState();
  const [state, setState] = useState({
    'company': null,
    'loading': true,
    'error': false,

  })
  useEffect(() => {
    (async () => {
      try{
          const company = await getCompany(companyId)
          setState({company: company, loading: false, error: false});
      } catch(error){
        setState({company: null,loading: false, error: true});
      }
    })()
  }, [companyId]);
  console.log("state = ", state)
  const {company, loading, error} = state
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
