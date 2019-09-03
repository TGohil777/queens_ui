import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
import {viewlocations} from '../../../state/ducks/practice'
import useStore from '../../../state/useStore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650
  },
  tablecell:{
    fontSize:'18px',
    color:'white'
  }
}));

// function createData(location , address1 ,address2 , city , state, zipcode) {
//   return { location , address1 ,address2 , city , state, zipcode };
// }


export default function LocationDetails(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { value } = props;
  const [rows , setRows]=React.useState([]);
  const [ {practice} , dispatch] = useStore();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  useEffect(() => {
    viewlocations(value , dispatch);
    setRows(practice.locations)
    // const fetchpost =  () => {
    //    // setLoading(true);
    //    viewlocations(value , dispatch);
      
    
    // console.log('List' , JSON.stringify(res.data,null,3))
    //     // setPost(pracitce.practices);
    //     // setLoading(false)
    // }
  
    // fetchpost();
  },[]);

  //const r = [{locations}] ;
 // const r = [practice.locations]
  console.log('Practices', JSON.stringify(practice.locations,null ,3))
 
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead style={{backgroundColor:'#3386FF'}}>
          <TableRow className={classes.tablecell}>
            <TableCell id='location'>Location</TableCell>
            <TableCell align="right" id='address1'>Line 1</TableCell>
            <TableCell align="right" id='address2'>Line 2</TableCell>
            <TableCell align="right" id='city'>City</TableCell>
            <TableCell align="right" id='state'>State</TableCell>
            <TableCell align="right" id='zipcode'>Zipcode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {practice.locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.name} className={classes.tablecell}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address1}</TableCell>
              <TableCell align="right">{row.address2}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.zipcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="Paper"
          count={practice.locations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  );
}