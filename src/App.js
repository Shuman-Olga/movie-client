import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const initData = {
    movieName: '',
    movieReview: '',
  };
  const [data, setData] = useState(initData);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    await axios
      .get('https://movie-server-production.up.railway.app/api/movies')
      .then((response) => {
        setMovieList(response.data);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    await axios.post('https://movie-server-production.up.railway.app/api/movies', { data });
    setData(initData);
    getMovies();
  };
  const deleteMovie = async (id) => {
    await axios.delete(`https://movie-server-production.up.railway.app/api/movies/${id}`);
    getMovies();
  };

  return (
    <div id="app" className="App">
      <div className="form">
        <label>Movie name: </label>
        <input type="text" name="movieName" value={data.movieName} onChange={onChange} />
        <label>Review: </label>
        <input type="text" name="movieReview" value={data.movieReview} onChange={onChange} />
        <button onClick={handleSubmit}>Сохранить</button>
      </div>
      <div className="movielist-wrap">
        {movieList.map((item, index) => {
          return (
            <div key={index} className="movielist">
              <div>
                <h3>{item.movieName}</h3>
                <p>{item.movieReview}</p>
              </div>
              <div>
                <button className="btn" onClick={() => deleteMovie(item.id)}>
                  <span className="material-icons delete">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
