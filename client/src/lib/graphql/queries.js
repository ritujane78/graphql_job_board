import { getAccessToken } from '../auth';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';

const httpLink = new HttpLink({ uri: 'http://localhost:9000/graphql' });
 
const authLink = new SetContextLink(({ headers }) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    return {
      headers: {
        ...headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    };
  }
  return { headers };
});
 
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export const jobsQuery = gql`
    query Jobs {
        jobs {
            id
            company {
                id
                name
            }    
            date
            title
        }
    }
`;

export const companyQuery = gql`
    query CompanyById($id: ID!){
            company (id: $id){
                id
                name
                description
                jobs {
                        id
                        title
                        description
                        date
                    }
            }
        }
`;

export const createJobMutation = gql `
  mutation ($input: CreateJobInput!) {
    job: createJob(input : $input) {
        ...jobDetail
    }
  }
  ${jobDetailFragment}   
`;

const jobDetailFragment = gql`
    fragment jobDetail on Job {
        company {
            description
            id
            name
        }
        description
        id
        title
        date
    }
`
export const jobByIdQuery = gql`
    query JobById($id : ID!){
        job (id: $id) {
            ...jobDetail
        }
    }
    ${jobDetailFragment}
    `;