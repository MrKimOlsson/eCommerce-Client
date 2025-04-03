import { BrowserRouter as Router, Routes } from 'react-router';
import getRoutes from './routes/routes';


const App = () => {
    return (
        <Router>
            <Routes>
                {getRoutes()}
            </Routes>
        </Router>
    );
};

export default App;