import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render } from '../../../utils/testUtils';
import JobContainer from '../JobContainer';

export const handlers = [
  rest.get('http://localhost:5000/api/v1/jobs', (req, res, ctx) => {
    return res(
      ctx.json({
        jobs: [
          {
            id: 'uuid',
            title: 'test title',
            description: 'description',
            skills: 'REACT, SPRINNG BOOT, JAVA',
            minBudget: 100,
            maxBudget: 200,
            expiredAt: '2022-10-10',
            createdAt: '12/12/2020',
            updatedAt: '12/12/2021',
            userId: 'ef3a51a3-642a-4230-9a01-ecd475e72f07',
          },
        ],
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

describe('Job Container', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test('should skeleton show when request is pending', () => {
    const { getByTestId } = render(<JobContainer />);
    expect(getByTestId('job-skeleton')).toBeInTheDocument();
  });

  test('should show list of jobs', async () => {
    const { findByText } = render(<JobContainer />);

    expect(await findByText('test title')).toBeInTheDocument();
  });
});
