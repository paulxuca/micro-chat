import {connect} from 'inferno-redux';
import Session from '../components/session';
import {init} from '../actions/microchat';

const mapDispatchToProps = {init};

export default connect(null, mapDispatchToProps)(Session);
