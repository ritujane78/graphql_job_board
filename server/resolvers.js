import { countJobs, createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from "./db/jobs.js"
import {GraphQLError } from 'graphql'
import { getCompany } from "./db/companies.js"
export const resolvers = {
    Query : {
        jobs: async (_root, {limit, offset}) => {
            const items =  await getJobs(limit, offset);
            const totalCount = await countJobs();
            return {items,totalCount}
        },
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
        createJob : (_root, {input: {title, description}}, {user}) => {
            if(!user){
                authorizationErrorHandler("No authenication recieved.");
            } else {
                const companyId = user.companyId;
                return createJob({companyId, title, description});
            }
        },
        deleteJob : async (_root, {id}, {user}) => {
            if(!user) authorizationErrorHandler("Missing Authentication.");

            const job = await deleteJob(id, user.companyId);

            if(!job) errorHandler("No job found with id : " + id);

            return job;
        },
        updateJob: async (_root,  {input: {id, title,description}}, {user}) => {
            if(!user) authorizationErrorHandler("Missing Authentication.");

            const job = await updateJob({id, title, description, companyId: user.companyId});

            // console.log("job= ", job);

            
            if(!job) errorHandler("No job found with id : " + id);

            return job;
        }
    },
    Company: {
        jobs: (company)=> getJobsByCompany(company.id) 
    },
    Job: {
        company: (job, args, {companyLoader}) => companyLoader.load(job.companyId),
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
function authorizationErrorHandler(message){
    throw new GraphQLError(message, {
        extensions: {code: 'NO_AUTHORIZATION'}
    })
}
