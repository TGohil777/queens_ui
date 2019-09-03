import React,{useStore,useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, label } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tabing from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Practice from './PracticeDetails';
import Locations from './LocationDetails';
import UserDetails from './UserDetails';
import { withRouter } from 'react-router-dom';
import HeaderPractice from './HeaderPractice';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyle = makeStyles({
    avatar: {

        margin: 30,

    }
})

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',

    },
}));

function ViewPractice({ location }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    console.log("Name", JSON.stringify(location.state.id , null , 3));

    return (
        <div className={classes.root}>
            <header style={{
                paddingRight: '15px',
                fontSize: '24px',
                paddingTop: '15px',
                paddingBottom: '15px',
                color: '#ffffff',
                backgroundColor: '#919E99',
                display: 'flex',
                justifyContent: 'center',
                //justifyContent: 'space-between',
                alignItems: 'center',
            }}>
               <HeaderPractice value={location.state.id}/>
            </header>
            <AppBar position="static" color="default" style={{ width: '100%' }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tabing label="Practice Detials" {...a11yProps(0)} />
                    <Tabing label="Locations" {...a11yProps(1)} />
                    <Tabing label="User" {...a11yProps(2)} />
                </Tabs>
            </AppBar >
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Practice  value={location.state.id}/>
                </TabPanel>
                <TabPanel style={{ fontSize: '120px' }} value={value} index={1} dir={theme.direction}>
                  <Locations value={location.state.id}/>
        </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <UserDetails value={location.state.id}/>
        </TabPanel>
            </SwipeableViews>
        </div >
    );
}


export default withRouter(ViewPractice);