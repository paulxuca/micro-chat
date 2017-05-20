import {connect} from 'inferno-redux';
import AppWrapper from '../components/app-wrapper';

const mapStateToProps = state => ({
    isOpen: state.isOpen
});

export default connect(mapStateToProps)(AppWrapper);
