import React, { useState, useEffect } from "react";
import axios from "axios";
const Albums = props => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/album")
      .then(res => {
        setAlbums(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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

  const handleDelete = id => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/album/" + id)
      .then(res => {
        const copy = albums.filter(a => a._id !== id);
        setAlbums(copy);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSelectedAlbum = album => {
    setSelectedAlbum({ ...album });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(selectedAlbum);
    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL + "/album/" + selectedAlbum._id,
        selectedAlbum
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    if (e.target.name === "artist") {
      const foundArtist = artists.find(artist => artist._id === e.target.value);
      setSelectedAlbum({ ...selectedAlbum, [e.target.name]: foundArtist });
      //   copiedAlbum[e.target.name] = foundArtist;
    } else {
      //   copiedAlbum[e.target.name] = e.target.value;
      setSelectedAlbum({ ...selectedAlbum, [e.target.name]: e.target.value });
    }

    // const newArray = albums.map(album =>
    //   album._id === selectedAlbum._id ? selectedAlbum : album
    // );
    // setAlbums(newArray);
  };

  const handleBlur = (e, albumId, key) => {
    console.log(e.target.textContent, key, albumId);
  };
  const handleFocus = () => console.log("focused");

  return (
    <div>
      <h1>Albums Page</h1>
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Description</th>
            <th>Delete album</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {!albums.length ? (
            <tr>
              <td>No albums to display</td>
            </tr>
          ) : (
            albums.map((album, i) => (
              <tr key={i}>
                <td>
                  <img src={album.cover} alt={album.title} />
                </td>
                <td
                  onFocus={handleFocus}
                  name="title"
                  contentEditable
                  onBlur={e => handleBlur(e, album._id, "title")}
                >
                  {album.title}
                </td>
                <td > {album.artist.name}</td>
                <td contentEditable>{album.description}</td>
                <td>
                  <button onClick={e => handleDelete(album._id)}>X</button>
                </td>
                <td>
                  <button onClick={e => handleSelectedAlbum(album)}>
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedAlbum !== null && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={selectedAlbum.title}
          />
          <input
            onChange={handleChange}
            type="text"
            name="description"
            value={selectedAlbum.description}
          />
          <select
            onChange={handleChange}
            value={selectedAlbum.artist._id}
            name="artist"
          >
            {artists.map((artist, i) => (
              <option key={i} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
          <button>Update</button>
        </form>
      )}
    </div>
  );
};

export default Albums;
