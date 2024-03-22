import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders a div element', () => {
    const { container } = render(<div>Hello, World!</div>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
  