import { useEffect } from "react";
import "../style/ListNav.css";

function ListNavigation(props) {
    // switch (props.offset)
    // {
    //     case 1:
    //         var i = 1;
    //         break;
    //     case 2:
    //         var i = 1;
    //         break;
    //     default:
    //         var i = props.offset-2;
    //         const before = (<p className="before">...</p>);
    // }

    if (props.offset === 1 || props.offset === 2)
    {
        var i = 1;
    } else {
        var i = props.offset - 2;
        var before = (<p>...</p>);
    }

    const buttons = Array(5)
    .fill()
    .map(() => (<button key={"nav_" + i} onClick={props.handleChange} value={i} disabled={i===props.offset}>{i++}</button>));

    return (
        <div className="listNav">
            {before}
            <div className="navButtons">
                {buttons}
            </div>
            <p>...</p>
        </div>
    );
} 

export default ListNavigation;