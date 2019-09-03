import React, { useState, useEffect } from 'react';
import { Table, Button, Icon, Popover, Row } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Logo from './logo.png'
import { listingPractice } from '../../state/ducks/practice';
import useStore from '../../state/useStore';
import { withRouter , Link } from 'react-router-dom';


const { Column } = Table;
const useStyle = makeStyles({
    Avatar: {
        margin: 10,
    }
})

function Tableimp() {
    const editda = (
        <div>
            <b>Edit</b>
        </div>
    )
    const viewda = (
        <div>
            <b>View</b>
        </div>
    )
    const deleteda = (
        <div>
            <b>Delete</b>
        </div>
    )
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false)
    const [{practice} , dispatch] = useStore()
    const [practices, setPractices] = useState([]);
    useEffect(() => {
        listingPractice(dispatch);
      //  setPractices(practice.practices);
        // const fetchpost =  () => {
        //    // setLoading(true);
        //    listingPractice(dispatch);
        //    //console.log('Practices', JSON.stringify(practice.practices , null ,3))
        //  //  console.log('List' , JSON.stringify(res.data,null,3))
        //     // setPost(pracitce.practices);
        //     // setLoading(false)
        // }
        // fetchpost();
    }, []);

    return (
      
        <div>
              <Button type='primary'><Link to='/pform'>Add Practice</Link></Button> 
            <Table dataSource={practice.practices}>
            {/* <Column title="Serial Id" dataIndex="id" key="id" autoincrement/> */}
                <Column title="Logo"
                     render={() => (
                        <Avatar alt="Remy Sharp" src={`${practice.practices.logourl}`} className={useStyle.Avatar} />
                   )}
                    dataIndex="logourl" key="logourl"
                     />
                <Column title="Practice Name" dataIndex="name" key="name" />
                <Column title="Sub domain" dataIndex="subdomain" key="subdomain" />
                <Row
                    title="Action"
                    key="action"
                    render={(text, record) => {
                        console.log("Text", text, "Record", record);
                        return (
                        <div style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Popover content={viewda}>
                                <Button type='primary' ><Link to={{
                                    pathname: '/viewpractice',
                                    state: {
                                        id: text.organizationid
                                    }
                                }}><Icon type="eye" /></Link></Button>
                            </Popover>
                            <Popover content={deleteda} >
                                <Button type='danger' ><Icon type="delete" /></Button>
                            </Popover>
                        </div>
                    )}}
                />
            </Table >
        </div >
    )
} export default (withRouter(Tableimp))
