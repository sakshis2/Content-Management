import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handelQuestionChange}) {
  const [question, setAge] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
    handelQuestionChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Questions</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={question}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="What is you first pet name?">What is you first pet name?</MenuItem>
          <MenuItem value="What is you father's last name?">What is you father's last name?</MenuItem>
          <MenuItem value="What is you first school name?">What is you first school name?</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
