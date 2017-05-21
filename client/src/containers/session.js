import {connect} from 'inferno-redux';
import Session from '../components/session';
import {setConfig} from '../actions/microchat';

const mapDispatchToProps = {
    init: setConfig
};

export default connect(null, mapDispatchToProps)(Session);
