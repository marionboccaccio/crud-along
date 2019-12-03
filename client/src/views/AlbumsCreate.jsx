import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AlbumsCreate = props => {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({});
  const selectRef = useRef();

  console.log(props);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/artist")
      .then(res => {
        setArtists(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("i have been submitted");
    if (!formValues.artist) {
      formValues.artist = selectRef.current.value;
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/album", formValues)
      .then(res => {
        props.history.push("/albums");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Create album</h1>

      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" />
        <label htmlFor="">Description@</label>
        <input type="text" name="description" />
        <select ref={selectRef} name="artist">
          {artists.map((artist, i) => (
            <option key={i} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AlbumsCreate;
