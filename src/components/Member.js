import '../css/Member.css';

function Member (props) {
    return (
        <div className='member-container' onClick={() => props.get(["report", props.user.email])}>
            <p>{props.user.email}</p>
        </div>
    );
}

export default Member;