import { GET_NOTES } from "../../queries"; // shared query 이거 사용!!
import { Link } from "react-router-dom";
import Plus from "../../Assets/plus.png";
import { Query } from "react-apollo";
import React from "react";

const Notes = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <h1>Dahee Note</h1>
        <Link to={"/add"}>
          <img src={Plus} width={50} height={50} />
        </Link>
      </div>
      <Query query={GET_NOTES}>
        {({ data }) => {
          //   console.log(data);
          return (
            data?.notes?.map(note => (
              <Link to={`/note/${note.id}`} key={note.id}>
                <h5>{note.title}</h5>
              </Link>
            )) || null
          );
        }}
      </Query>
    </>
  );
};

export default Notes;
