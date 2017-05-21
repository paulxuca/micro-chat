import {connect} from 'inferno-redux';
import Banner from '../components/banner';

const mapStateToProps = state => ({
    teamName: state.config.teamName 
});

export default connect(mapStateToProps)(Banner);