import { getAccessToken } from '../auth';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
//...
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
 
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export async function createJob({title, description}) {
    const inputJob = gql `
  mutation ($input: CreateJobInput!) {
    job: createJob(input : $input) {
      id
    }
  }
    `;
    const {data} = await apolloClient.mutate({
        mutation: inputJob,
        variables: {
            input: {
                title,
                description
            }
        }
    })
    return data.job;
}
export async function getCompany(id){
    const query = gql`
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
    const {data} = await apolloClient.query({
    query,
    variables: {
        id
    }
    });
    return data.company;
}
export async function getJob(id){
    const query = gql`
    query JobById($id : ID!){
        job (id: $id) {
            company {
                id
                name
            }   
            id
            title
            description
            date 
        }
    }
    `;
    const {data} = await apolloClient.query({
    query,
    variables: {
        id
    }
    });
    return data.job;
}

export async function getJobs(){
    const query = gql`
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
    const {data} = await apolloClient.query({query})
    return data.jobs;
}