import React from 'react';

class Welcome extends React.Component {
    componentDidMount() {
        this.props.history.push("/login");
    }
    render () {
        return (<div> </div>)
    }
}

export default Welcome;