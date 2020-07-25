import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
      minWidth: 650,
  },
});

function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState([])

  useEffect(() => {
    fetch('/table', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }).then(response => response.json())
    .then(items => {
      setTableItems(items);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
          <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="Товары">
                        <TableHead>
                            <TableRow>
                                <TableCell>Книга</TableCell>
                                <TableCell align="right">Количество соавторов</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {loading ? null
                         : tableItems.map(item => (
                            <TableRow key={item.name}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.authors.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>
    </div>
  );
}

export default App;
