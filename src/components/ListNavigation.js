

function ListNavigation(props) {
    var offset = props.offset + 1;
    var start = offset - 2;

    const before = Array(2)
        .fill()
        .map(() => (<button onClick={props.handleChange} value={start++}>{start}</button>));

    start++;
    
    const after = Array(2)
        .fill()
        .map(() => (<button onClick={props.handleChange} value={start++}>{start}</button>));

    return (
        <div className="listNav">
            {before}        
            <button onClick={props.handleChange}>{offset}</button>
            {after}
        </div>
    );
} 

export default ListNavigation;