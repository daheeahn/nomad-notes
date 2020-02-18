import React, { useRef } from "react";

import Editor from "../../Components/Editor";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

const Add = ({ history: { push } }) => {
  // destruct 잘한다!!
  const createNoteRef = useRef(null);

  const _onSave = (title, content) => {
    if (title !== "" && content !== "") {
      createNoteRef.current({ variables: { title, content } });
      push("/"); // redirect
    }
  };

  return (
    <>
      <Mutation mutation={CREATE_NOTE}>
        {createNote => {
          createNoteRef.current = createNote;
          return <Editor onSave={_onSave} />;
        }}
      </Mutation>
    </>
  );
};

export default Add;
