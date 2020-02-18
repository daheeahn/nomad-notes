import { GET_NOTES } from "./queries";

// title을 바꿨으면 나는 모든 앱의 리스트 불러오고, 업데이트 된 리스트를 로컬 스토리지에 옮겨주는거지.
export const saveNotes = cache => {
  // query를 읽게 함
  // note를 저장하면 cache를 주고 노트가 저장되면 모든 노트의 arr를 받는거지. (이건 clientState에서 하는거같은데) local storage에도 저장하고!
  const { notes } = cache.readQuery({ query: GET_NOTES }); // noteQuery안에 notes가 있으니까
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem("notes", jsonNotes);
  } catch (error) {
    console.log(error);
  }
};

export const restoreNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes) {
    try {
      const parsedNotes = JSON.parse(notes);
      return parsedNotes;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return [];
};
