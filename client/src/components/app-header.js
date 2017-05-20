import Inferno from 'inferno';

export default function AppTrigger({openChat, closeChat, isOpen}) {    
    const handleClick = () => {
        if (!isOpen) {
            openChat();
        }
    };
    
    return (
        <div className="app-trigger-header" onClick={handleClick}>
            <h3>Chat with us!</h3>
            {isOpen && (
                <div className="app-trigger-close" onClick={closeChat}>x</div>
            )}
        </div>
    );
}