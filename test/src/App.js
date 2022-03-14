import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Item from './Item/Item';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const App = () => {
  const [items, setItems] = useState([]);
  const [randomItems, setRandomItems] = useState();
  const [shuffle, setShuffle] = useState(false);
  const [page, setPage] = useState(1);
  const [itemSelected, setItemSelected] = useState();

  const getItemsFromUrl = async() => {
    const {data} = await axios.get('http://j0.wlmediahub.com/App_Themes/api/test/photos.js');
    console.log(data.photo)
    setItems(data.photo);
  }

  const getRandomItems = () => {
    setShuffle(false);
    const shuffled = items.sort(() => 0.5 - Math.random());
    const fiveRandomItems = shuffled.splice(0, 6);
    setRandomItems(fiveRandomItems);
    setShuffle(true)
  }

  const handleChange = (event, value) => {
    setPage(value);
    setItemSelected(randomItems[value-1])
  }

  const onStart = () => {
    getRandomItems();
  }


  useEffect(() => {
    getItemsFromUrl();
  }, [])

  useEffect(() => {
    getRandomItems();
  }, [shuffle])




  return (
    <div className="App">
      <button className='Button1' onClick={onStart}>Start</button>
      {/* {shuffle &&  randomItems.map((el, index) => <Item key={index} image={el.img} title={el.title} description={el.description} />)} */}
      {shuffle &&  <Item image={randomItems[page]?.img} title={randomItems[page]?.title} description={randomItems[page]?.description} />}
      <Stack spacing={2}>
          <Pagination count={5} color="primary" onChange={handleChange} page={page} />
      </Stack>
      <button className='Button2' onClick={getRandomItems}>Shuffle</button>
    </div>
  );
}

export default App;
