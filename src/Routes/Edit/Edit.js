import { Mutation, Query } from "react-apollo";
import React, { useRef } from "react";

import Editor from "../../Components/Editor";
import { GET_NOTE } from "../../queries";
import gql from "graphql-tag";

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content)
  }
`;

const Edit = props => {
  const {
    match: {
      params: { id }
    }
  } = props;

  const _onSave = (title, content, id) => {
    const {
      history: { push }
    } = props;
    if (title !== "" && content !== "" && id) {
      editNoteRef.current({ variables: { title, content, id } });
      //   push(`/note/${id}`)
      push("");
    }
  };

  const editNoteRef = useRef(null);

  return (
    <>
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data?.note ? (
            <Mutation mutation={EDIT_NOTE}>
              {editNote => {
                editNoteRef.current = editNote;
                return (
                  <Editor
                    onSave={_onSave}
                    title={data.note.title}
                    content={data.note.content}
                    id={data.note.id}
                  />
                );
              }}
            </Mutation>
          ) : null
        }
      </Query>
    </>
  );
};

export default Edit;
