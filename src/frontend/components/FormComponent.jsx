import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Container } from '@mui/system';



export function FormComponent() {

  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" sx={{ mt: 3 }} >
        
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="First Name" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="Last Name" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="Phone Number" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="Email Address" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="Username" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="outlined-basic" label="Password" variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
        >
          <MenuItem value={"Member"}>Member</MenuItem>
          <MenuItem value={"trainer"}>Trainer</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
        </FormControl>
            </Grid>
          </Grid>
        </Box>
           <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
              Create User
            </Button>
    </Container>
  )
}
