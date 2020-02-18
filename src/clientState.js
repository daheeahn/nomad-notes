import { restoreNotes, saveNotes } from "./offline";

import { GET_NOTES } from "./queries";
import { NOTE_FRAGMENT } from "./fragment";

export const defaults = {
  // 디폴트로 할 수 있는 쿼리
  notes: restoreNotes()
};
export const typeDefs = [
  // 우리의 schema가 어떤 형태인지 보여주는거야 by graphql 언어. 서버가 없기 때문에 이렇게 한댜
  `
    extend schema {
        query: Query
        mutation: Mutation 
    }
    extend type Query {
        notes: [Note]!
        note(id: Int!): Note
    }
    type Mutation {
        createNote(title: String!, content: String!): Note
        editNote(id: Int!, title: String!, content: String!): Note
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
    `
]; // createNote랑 editNote는 return 없어. 따로 필요 없으니까!
export const resolvers = {
  Query: {
    // 보통의 gql resolver와 같다.
    note: (_, variables, { cache }) => {
      // context엔 아무거나 넣어도 돼.
      const id = cache.config.dataIdFromObject({
        // 이게 devTools에서 작동하고, 다른거 getCacheKey? 이런건 안된대.. 왜지
        __typename: "Note",
        id: variables.id
      }); // cache에서 정보 가져오기
      // console.log("note query / ", id);

      // id만 있으면 cache에 있는 fragment를 가져올 수 있어
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note;
      //   return null; // 언제나 resolver에서 무언가를 리턴 해야해!!!!!!!!!! 규칙이야 ******
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      // 먼저 cache에 있는 note arr를 가져온다.
      // const noteQuery = cache.readQuery({ query: GET_NOTES });
      const { notes } = cache.readQuery({ query: GET_NOTES }); // noteQuery안에 notes가 있으니까
      const { title, content } = variables;
      // 새로운 노트는 타입이 있어야 해. typename도.
      const newNote = {
        __typename: "Note", // apollo가 구성에 문제 없는지 자동으로 점검해줘 type에 없는 Diary 이런거 추가하면 안된다고 알려줘. 안전하지!
        title,
        content,
        id: notes.length + 1
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      });
      console.log("createNote", newNote);
      saveNotes(cache); // cache is from resolvers
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        // 왜 하는거지? -> noteId: "Note:1" 이걸 ReadFragment할 때 넣어야 된다.
        __typename: "Note",
        id
      }); // cache에서 정보 가져오기
      // console.log("editNote", title, content);
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      // writeData 대신 fragment 만들어줄거야. 한개의 fragment를 update할거거든
      const updatedNote = {
        ...note,
        title,
        content
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT, // fragment 어떤 모양의 데이터 업데이트 할건지
        data: updatedNote
      });
      saveNotes(cache); // cache is from resolvers
      console.log("updatedNote", updatedNote);
      return updatedNote;
    }
  }
};
