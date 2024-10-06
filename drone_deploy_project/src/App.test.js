import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from './App';

let fetchMock;

beforeEach(() => {
  fetchMock = jest.spyOn(global, 'fetch')
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders drone data", async () => {
  fetchMock.mockResolvedValue({
    json: jest.fn().mockResolvedValue([{
      image_id: 'image-id1',
      image_tags: []
    }])
  })
  render(<App />);
  
  expect(await screen.findByText(/Image ID: image-id1/i)).toBeInTheDocument();
});



test("submits a query and includes '75 meters' in the response", async () => {
  fetchMock.mockResolvedValue({
    json: jest.fn().mockResolvedValue([])
  })
  
  render(<App />);

  await Promise.resolve(); // wait for first request to complete

  // Simulate user typing in the query input and submitting
  const inputElement = screen.getByPlaceholderText(/Ask your question about drone data here/i);
  const submitButton = screen.getByText(/Submit/i);

  // Simulate typing into the input
  fireEvent.change(inputElement, { target: { value: "What is the altitude of the second image?" } });

  // Mock backend response
  fetchMock.mockResolvedValue({
    json: jest.fn().mockResolvedValue({response: "Altitude is 75 meters"})
  })

  // Simulate clicking the submit button
  fireEvent.click(submitButton);


  // Check if the AI response contains '75 meters'
  const aiResponseElement = await screen.findByTestId('ai-response');
  expect(aiResponseElement.textContent).toContain("75 meters");
});