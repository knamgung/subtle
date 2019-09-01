import { gql } from "apollo-boost";

const addHistory = gql`
  mutation($userId: String!, $title: String!, $resource: [imagesInput]!) {
    addResult(userId: $userId, title: $title, resource: $resource) {
      allHistory {
        title
        resource {
          imgSrc
          resultValue
          result

          title
        }
      }
    }
  }
`;

const getHistories = gql`
  {
    histories {
      title
      resource {
        imgSrc
        resultValue
        result

        title
      }
    }
  }
`;

const getHistoryQuery = gql`
  query($id: ID!) {
    User(userId: $id) {
      title
      resource {
        imgSrc
        resultValue
        result

        title
      }
    }
  }
`;

export { getHistoryQuery, addHistory, getHistories };
