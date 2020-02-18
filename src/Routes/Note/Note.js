import { GET_NOTE } from "../../queries";
import { Link } from "react-router-dom";
import MarkdownRenderer from "react-markdown-renderer";
import { Query } from "react-apollo";
import React from "react";

const Note = props => {
  const {
    match: {
      params: { id }
    }
  } = props;
  return (
    <Query query={GET_NOTE} variables={{ id }}>
      {({ data }) => {
        console.log("data", data);
        return (
          <>
            <h1>{data?.note?.title}</h1>
            <Link to={`/edit/${id}`}>
              <h4>Edit</h4>
            </Link>
            <MarkdownRenderer markdown={data?.note?.content} />
          </>
        );
      }}
    </Query>
  );
};

export default Note;
