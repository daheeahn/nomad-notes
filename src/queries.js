import { NOTE_FRAGMENT } from "./fragment";
// clinetState에 이 쿼리들 써야 함
import gql from "graphql-tag";

// export const GET_NOTES = gql`
//   {
//     notes @client {
//       id
//       title
//       content
//     }
//   }
// `;

export const GET_NOTES = gql`
  {
    notes @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_NOTE = gql`
  query getNote($id: Int!) {
    note(id: $id) @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;
