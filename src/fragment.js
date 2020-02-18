import gql from "graphql-tag";

// 내가 재사용하고 싶은거야! 반복해서 입력하고 싶지 않을때. 수정.추가할 때나 하나만 찾고싶을때나... 암튼 그럴 때 fragment를 이용해 재사용 하는거야
export const NOTE_FRAGMENT = gql`
  fragment NotePars on Note {
    id
    title
    content
  }
`;
// id title content는 clientState에서 type Note 에서 가져오는거야!
