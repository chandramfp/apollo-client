import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query getTrainee($limit: Int, $skip: Int){
  getTrainee (data: {limit: $limit, skip: $skip}) {
   records {
    name
    email
    role
    createdAt
    originalId
   }
   count
  }
}`;

export { GET_TRAINEE };
