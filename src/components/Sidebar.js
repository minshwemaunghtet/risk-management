import '../css/Sidebar.css';

function sidebar (props) {
    return (
        <div className="sidebar-container">
            <div className="sidebar-tab" onClick={ () => {props.render("organization")}}><i className="fas fa-users"></i>Organization</div>
            <div className="sidebar-tab" onClick={ () => {props.render("map")}}><i className="fas fa-globe-americas"></i>Maps</div>
        </div>
    );
}

export default sidebar;