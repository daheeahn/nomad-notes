import { NOTE_FRAGMENT } from "./fragment";

export const defaults = {
  // 디폴트로 할 수 있는 쿼리
  notes: [
    {
      __typename: "Note",
      id: 1,
      title: "First",
      content: "Second"
    }
  ]
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
        editNote(id: String!, title: String!, content: String!): Note
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
    `
]; // createNote랑 editNote는 return 없어. 따로 필요 없으니까!
export const resolvers = {
  Mutation: {},
  Query: {
    // 보통의 gql resolver와 같다.
    note: (_, variables, { cache }) => {
      // context엔 아무거나 넣어도 돼.
      const id = cache.config.dataIdFromObject({
        // 이게 devTools에서 작동하고, 다른거 getCacheKey? 이런건 안된대.. 왜지
        __typename: "Note",
        id: variables.id
      }); // cache에서 정보 가져오기
      console.log(id);

      // id만 있으면 cache에 있는 fragment를 가져올 수 있어
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note;
      //   return null; // 언제나 resolver에서 무언가를 리턴 해야해!!!!!!!!!! 규칙이야 ******
    }
  }
};
