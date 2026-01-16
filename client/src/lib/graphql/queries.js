import {GraphQLClient, gql} from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

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
    const {company} = await client.request(query, {id});
    return company;
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
    const {job} = await client.request(query, {id});
    return job;
}

export async function getJobs(){
    const query = gql`
    query {
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
    const {jobs} = await client.request(query);
    return jobs;
}