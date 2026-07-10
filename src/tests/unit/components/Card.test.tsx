import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../../components/Card';
import { Post } from '../../../types/post';

jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div>{children}</div>;
  };
});

const mockPost: Post = {
  id: '123',
  title: 'Test title',
  thumbnail: null,
  preview: null,
  subreddit: 'testsubreddit',
  subreddit_name_prefixed: 'c/testsubreddit',
  author: 'testuser',
  ups: 42,
  created_utc: 1700000000,
  num_comments: 3,
  sr_detail: { icon_img: null },
  subreddit_icon_img: null,
};

test('Card renders post title', () => {
  render(<Card post={mockPost} />);
  expect(screen.getByText('Test title')).toBeInTheDocument();
});

test('Card renders author name', () => {
  render(<Card post={mockPost} />);
  expect(screen.getByText('testuser')).toBeInTheDocument();
});

test('Card renders comment count', () => {
  render(<Card post={mockPost} />);
  const commentButton = screen.getByRole('button', { name: /comments/i });
  expect(commentButton).toHaveTextContent('3');
});