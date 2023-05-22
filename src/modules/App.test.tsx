import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// render as it is

beforeAll(() => {
  window.IntersectionObserver = global.intersectionObserverMock;
})

test('renders app', () => {
  render(<App />);
  const header = screen.getByText(/by HomeVision/i);
  expect(header).toBeInTheDocument();

  // initial loading
  const content = screen.getAllByRole('progressbar');
  expect(content[0]).toBeInTheDocument();
});

test('renders app mocked ok', async () => {

  jest.spyOn(window, "fetch").mockImplementation(global.fetchMockOk);
  render(<App />);

  // houses loaded
  await waitFor(() => {
    const mockedOk = screen.getByText(/Mocked address/i);
    expect(mockedOk).toBeInTheDocument();
  });
});

test('renders app mocked error', async () => {

  jest.spyOn(window, "fetch").mockImplementation(global.fetchMockError);
  render(<App />);

  // houses loaded
  await waitFor(() => {
    const mockedError = screen.getByText(/Error/i);
    expect(mockedError).toBeInTheDocument();
  });
});

afterAll(() => {
  jest.restoreAllMocks()
});