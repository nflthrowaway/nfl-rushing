import { render } from '@testing-library/react';
import App from '../App';

test('renders loading text initially', () => {
  const { getByText } = render(<App />);
  const loadingText = getByText('Loading...');
  expect(loadingText).toBeInTheDocument();
});
