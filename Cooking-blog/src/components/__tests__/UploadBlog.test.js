import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to extend Jest's expect with the toBeInTheDocument matcher
import userEvent from '@testing-library/user-event';
import Upload from '../Upload/upload'; // Replace with actual path

// Test cases
const testCases = [
    { title: 'Foo', body: 'Bar' },
    { title: 'Baz', body: 'Qux' },
];

// Test each case
test.each(testCases)('renders Upload with title "%s" and body "%s"', ({ title, body }) => {
    // Render the Upload component with the current test case data
    render(<Upload title={title} body={body} />);
    
    // Find the input field for recipe title
    const titleInput = screen.getByPlaceholderText('Recipe Title');
    
    // Simulate typing the title into the input field
    userEvent.type(titleInput, title);

    // Find the textarea for recipe body
    const bodyTextarea = screen.getByPlaceholderText('Description');
    
    // Simulate typing the body into the textarea
    userEvent.type(bodyTextarea, body);

    // Assert that the title input has the correct value
    expect(titleInput).toHaveValue(title);

    // Assert that the textarea has the correct value
    expect(bodyTextarea).toHaveValue(body);

    // Assert that the heading is present
    expect(screen.getByRole('heading', { name: /Add a New Recipe/ })).toBeInTheDocument();
    
    // Assert that the input and textarea values are present in the component
    expect(screen.getByDisplayValue(title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(body)).toBeInTheDocument();
});
