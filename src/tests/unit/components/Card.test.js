import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../../components/Card';

describe('Card component', () => {
  test('renders card with title and content', () => {
    render(<Card title="Test Title" content="This is test content" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });
});
