import { render, screen, act } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameOver from './components/GameOver';


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

test('renders game over page', () => {
  act(() => {
    render(
    <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<GameOver />}/>
        </Routes>
    </BrowserRouter>
        , container);
    });
    expect(screen.getAllByText('Game Over!')[0])
});