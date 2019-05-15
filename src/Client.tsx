import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
const uri = process.env.URI || "http://localhost:8000/graphql";
const client = new ApolloClient({ uri });

function submit(reaction: string, message = "") {
  client
    .mutate({
      mutation: gql`
        mutation CreateFeedback($input: FeedbackInput) {
          createFeedback(input: $input) {
            message
            reaction
          }
        }
      `,
      variables: {
        input: {
          message,
          reaction
        }
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

export default {
  submit
};
