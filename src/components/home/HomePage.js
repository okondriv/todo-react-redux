import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return  (
            <div>
                <h1>React ToDo application</h1>
                <p>React administration.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
}

export default HomePage;