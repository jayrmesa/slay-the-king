import { render, screen, act, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Options from './components/screens/options';


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

test('renders options page', () => {
  act(() => {
    render(
    <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<Options />}/>
        </Routes>
    </BrowserRouter>
        , container);
    });
    expect(screen.getByAltText('Reset'))
    expect(screen.getByAltText('Option3'))
});

test('reset button works', () => {
    act(() => {
      render(
      <BrowserRouter>
          <Routes>   
              <Route path="*" element= {<Options />}/>
          </Routes>
      </BrowserRouter>
          , container);
      });
      expect(screen.getByAltText('Reset'))
      expect(screen.getByAltText('Option3'))

      fireEvent.click(screen.getByAltText('Reset'))
  });