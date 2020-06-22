import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
  subscription {
    traineeUpdated {
      originalId
      name
      email
    }
  }
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted

}`;

export { UPDATED_TRAINEE_SUB, DELETED_TRAINEE_SUB };
