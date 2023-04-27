import { render, act } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/screens/_navbar';


let container = null;
    beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('renders navbar', () => {
  act(() => {
    render(
    <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<Navbar />}/>
        </Routes>
    </BrowserRouter>
        , container);
    });
});