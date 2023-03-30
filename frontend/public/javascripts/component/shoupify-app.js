
class ShoupifyApp extends React.Component {
    constructor() {
        super()
    }

    render() {
        return React.createElement(
            'div',
            {},
            'Helloword'
        )
    }
}

const domContainer = document.querySelector('#shoupify-app');



const root = ReactDOM.createRoot(domContainer);




root.render(React.createElement(ShoupifyApp));