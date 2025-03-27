import "./Header.scss";

function Header() {
    const handlePost = () => {};
    return (
        <div className="wrap-header-home">
            <div className="post-input">
                <div className="avatar">
                    <img
                        src="https://my.alfred.edu/zoom/_images/foster-lake.jpg"
                        alt="Your profile"
                    />
                </div>
                <input type="text" placeholder="What's on your mind?" />
            </div>
            <div className="post-actions">
                <div className="action-buttons">
                    <button>📷</button>
                    <button>🔗</button>
                    <button>📍</button>
                    <button>😊</button>
                </div>
                <button onClick={handlePost} className="post-button">
                    Post
                </button>
            </div>
        </div>
    );
}

export default Header;
