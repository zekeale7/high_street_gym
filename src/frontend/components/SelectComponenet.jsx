import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useEffect } from 'react';

export default function BasicSelect() {
  const [data, setData] = useState([]);

  const getClassList = () => {
    fetch('/api/logins/all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    getClassList();
  }, [])
  

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Login ID</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Age"
          value={data} 
          onChange={handleChange}
        >
        {data.map((item) => (
            <MenuItem key={item.id} value={item.login_id}>{item.login_id}</MenuItem>  
          ))}
        </Select>
       
      </FormControl>
    </Box>
  );
}
