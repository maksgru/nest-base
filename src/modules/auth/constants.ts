import User from '../../database/entities/user.entity';

export const SIGN_IN_USER_FIELDS: (keyof User)[] = [
  'id',
  'passwordHash',
  'email',
];

export const AUTH_EXAMPLES = {
  TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU0MTkwMzMzLCJleHAiOjE2NTQxOTIzMzN9.3oj0Dy-S3wqKYl4qpGVqcNQhPcgUh4EzHXQ5gpbYdWY',
  CONFIRMATION_LINK: 'https://api-host.com/auth/confirm/a371c438-e6f2-4d2a-8f29-e44b654172f0',
  CONFIRMATION_ID: 'a371c438-e6f2-4d2a-8f29-e44b654172f0',
};
