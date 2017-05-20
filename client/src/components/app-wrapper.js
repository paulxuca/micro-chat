import Inferno from 'inferno';
import classnames from 'classnames';

export default function AppWrapper({isOpen, children}) {
    const classes = classnames({
        'micro-app-root': true,
        'micro-app-root-active': isOpen
    });
    
    return (
        <div className={classes}>
            {children}
        </div>
    );
}