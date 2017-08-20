import React from 'react'
//
// class TestComponent extends Component {
//     render() {
//         return (
//             <div>
//                 La vai o boi
//             </div>
//         )
//     }
// }
function TestComponent(props) {
    return(
        <div>
            La vai o {props.animal}
            <p> oi edna</p>
        </div>
    )
}

export default TestComponent;