import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  useEffect(() => {
    getCompany(companyId).then(setCompany)
  }, [companyId]);
  console.log("company = ", company)
  if(!company){
    return <div>Loading...</div>
  }

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
