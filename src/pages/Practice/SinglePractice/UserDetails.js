import React,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
import {viewusers} from '../../../state/ducks/practice'
import useStore from '../../../state/useStore';
import { withRouter} from 'react-router-dom'

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

const initialState = {
  rows : []
}

function UserDetails(props) {
  const classes = useStyles();
  const [rows,setRows] = useState({...initialState})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { value } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [ {practice} , dispatch] = useStore();

  useEffect(() => {
    viewusers(value , dispatch);
    //setRows({rows : [practice.user.users]})
    // const fetchpost =  () => {
    //    // setLoading(true);
    //    viewlocations(value , dispatch);
      
    //    console.log('Practices', JSON.stringify(practice.locations , null ,3))
    //  //  console.log('List' , JSON.stringify(res.data,null,3))
    //     // setPost(pracitce.practices);
    //     // setLoading(false)
    // }
  
    // fetchpost();
  },[]);
 console.log('Row',JSON.stringify(practice.user , null ,3))


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead style={{backgroundColor:'#3386FF'}}>
          <TableRow className={classes.tablecell}>
          <TableCell align="right" id='email'>Email</TableCell>
            <TableCell id='firstname'>Firstname</TableCell>
            <TableCell align="right" id='lastname'>Lastname</TableCell>
            <TableCell align="right" id=''>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {/* {practice.user.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.email} className={classes.tablecell}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}   */}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="Paper"
          count={rows.length}
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

export default withRouter(UserDetails)