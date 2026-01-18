import { createJob, getJob, getJobs, getJobsByCompany } from "./db/jobs.js"
import {GraphQLError } from 'graphql'
import { getCompany } from "./db/companies.js"
export const resolvers = {
    Query : {
        jobs: async () => getJobs(),
        job: async (_root, {id}) => {
            const job = await getJob(id);
            if(!job){
                errorHandler('No job found with id: ' + id);
            }
            return job;
        },
        company: async (_root, {id}) => {
            const company = await getCompany(id);
            if(!company){
                errorHandler('No company found with id: ' + id);
            }
            return company;
        }
    },
    Mutation : {
        createJob : (_root, {input: {title, description}}) => {
            const companyId = "FjcJCHJALA4i"; // TODO value should be based on user.
            return createJob({companyId, title, description});
        } 
    },
    Company: {
        jobs: (company)=> getJobsByCompany(company.id)
    },
    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) => toIsoDate(job.createdAt)
    }
}
function toIsoDate(value){
    return value.slice(0, "yyyy-mm-dd".length)
    
}
function errorHandler(message){
    throw new GraphQLError(message, {
                    extensions: {code: 'NOT_FOUND'}
                })
}
