## Project Overview

The Legal Query Assistant is a single-page web application designed to allow users to input legal queries and upload legal documents (PDF, DOC, DOCX, TXT), receiving AI-driven responses and summaries powered by the xAI API. Built with React, TypeScript, Vite, and Tailwind CSS v4, the application is responsive, accessible, and centered on the page for optimal user experience. Recent updates have consolidated the submission process to require both a query and a document, enhanced responsiveness across screen sizes, integrated the xAI API for real AI responses, and improved the visual layout with a centered, card-like design.

## System Architecture

### Technologies Used

- **React**: Frontend library for building a component-based UI.
- **TypeScript**: Adds type safety to JavaScript, ensuring robust code.
- **Vite**: Fast build tool for development and production, providing hot module replacement and optimized builds.
- **Tailwind CSS v4**: Utility-first CSS framework for responsive, customizable styling.
- **xAI API**: External API for generating AI-driven legal query responses and document summaries.

### Component Structure

The application follows a modular, component-based architecture with the following key components:

#### 1. App Component (src/App.tsx)

- **Role**: The root component, managing state and orchestrating the application’s flow.
- **State**:
  - `query: string`: Stores the user’s legal query.
  - `file: File | null`: Stores the uploaded document.
  - `legalResponse: LegalResponse | null`: Holds the xAI API response (queryResponse and summary).
  - `isLoading: boolean`: Tracks processing state for UI feedback.
  - `error: string | null`: Stores error messages from API calls.
- **Functionality**:
  - Manages the consolidated submission process via `handleSubmit`, which requires both a query and a document.
  - Sends query and document data to the xAI API via a POST request, handling responses and errors.
  - Renders a centered, responsive layout with a submit button.
- **API Integration**:
  - Uses `fetch` to call the xAI API endpoint (e.g., `https://api.x.ai/grok`).
  - Sends query text and document content (converted to text for supported formats) in the request body.
  - Processes the API response to extract `queryResponse` and `summary`.
  - Handles errors (e.g., network issues, invalid file formats) and updates the `error` state.
- **Styling**:
  - Outer container: `min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8` centers content vertically and horizontally with responsive padding.
  - Main container: `w-full max-w-md sm:max-w-lg lg:max-w-4xl bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8` creates a card-like appearance with responsive width and padding.
  - Heading: `text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center` for responsive typography.
  - Inner content: `space-y-4 sm:space-y-6` for responsive component spacing.
  - Submit button: `w-full sm:w-auto mt-2 sm:mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400` for responsive width and interactivity.

#### 2. QueryInput Component (src/components/QueryInput.tsx)

- **Role**: Provides a text area for users to input legal queries.
- **Props**:
  - `query: string`: Current query value.
  - `setQuery: (query: string) => void`: Updates the query state in App.
  - `isLoading: boolean`: Disables input during processing.
- **Functionality**: Captures user input and updates the parent state without a submit button, deferring submission to App.
- **Styling**:
  - Container: `bg-gray-600 p-4 rounded-lg shadow` for a dark, shadowed card.
  - Text area: `w-full bg-black p-2 border rounded-md` for a consistent black input style.

#### 3. DocumentUpload Component (src/components/DocumentUpload.tsx)

- **Role**: Handles file uploads and displays the selected file name.
- **Props**:
  - `setFile: (file: File | null) => void`: Updates the file state in App.
  - `isLoading: boolean`: Disables input during processing.
- **State**:
  - `fileName: string | null`: Tracks the selected file’s name for display.
- **Functionality**:
  - Allows file selection via a hidden input and styled label.
  - Displays the file name or “No file loaded” on the right.
  - Includes a “Clear” button to reset the file selection.
  - Updates the parent state without immediate processing.
- **Styling**:
  - Container: `bg-gray-600 p-4 rounded-lg shadow` for consistency.
  - Button: `inline-block bg-black px-4 py-2 border border-black rounded-md text-white cursor-pointer hover:bg-gray-800` for a black, interactive button.
  - File name: `text-black` for readability, with a red “Clear” button (`text-red-500 hover:text-red-700`).

#### 4. ResponseDisplay Component (src/components/ResponseDisplay.tsx)

- **Role**: Displays xAI API responses and document summaries.
- **Props**:
  - `response: { queryResponse: string; summary: string } | null`: The response data.
  - `error: string | null`: Displays error messages if API call fails.
- **Functionality**: Renders query responses and document summaries in a structured format, handling null states and errors gracefully.
- **Styling**:
  - Container: `bg-white p-4 rounded-lg shadow` for a clean, white card.
  - Text: `text-gray-700` for readable content, with headings (`text-xl`, `text-lg`) for hierarchy.
  - Error: `text-red-500` for clear error visibility.

### Data Flow

- **Input Collection**:
  - Users enter a query in `QueryInput`, updating the `query` state in `App` via `setQuery`.
  - Users select a file in `DocumentUpload`, updating the `file` state in `App` via `setFile` and displaying the file name locally.
- **Submission**:
  - The “Submit Request” button in `App` is enabled only when both `query` is non-empty and `file` is selected.
  - Clicking the button triggers `handleSubmit`, which:
    - Converts the document to text (e.g., using libraries like `pdf-parse` for PDFs or `mammoth` for DOCX).
    - Sends a POST request to the xAI API with the query and document text.
    - Sets `isLoading` to `true` during the request.
    - Updates `legalResponse` with the API’s `queryResponse` and `summary` or sets `error` on failure.
- **Response Display**:
  - The `legalResponse` state is updated with the xAI API response.
  - `ResponseDisplay` renders the response, showing both the query analysis and document summary, or an error message if applicable.

### Styling and Responsiveness

- **Tailwind CSS v4**: Used for utility-first styling, ensuring a responsive and customizable UI.
- **Centered Layout**:
  - The outer container (`flex items-center justify-center`) centers content both horizontally and vertically.
  - The main container (`max-w-md sm:max-w-lg lg:max-w-4xl`) scales width from 448px (mobile) to 1024px (desktop).
- **Responsive Design**:
  - Padding: `p-4 sm:p-6 lg:p-8` for outer and main containers, scaling from 16px to 32px.
  - Typography: `text-2xl sm:text-3xl lg:text-4xl` for the heading, adjusting from 24px to 36px.
  - Spacing: `space-y-4 sm:space-y-6` for components, tightening on mobile (16px) and loosening on larger screens (24px).
  - Button: `w-full sm:w-auto` for full-width on mobile and content-based width on larger screens.
- **Visual Hierarchy**:
  - A white card (`bg-white shadow-lg rounded-lg`) contrasts with the gray background (`bg-gray-100`).
  - Black inputs and buttons (`bg-black text-white`) provide a professional, consistent aesthetic.

## Current Functionality

- **Consolidated Submission**: Users must provide both a query and a document to enable the “Submit Request” button. Submission triggers an xAI API call combining both inputs, with responses displayed in the “AI Response” section.
- **Dynamic File Name Display**: The `DocumentUpload` component shows the selected file’s name (e.g., “Sample_Contract.txt”) or “No file loaded,” with a “Clear” option.
- **Loading State**: The `isLoading` state disables inputs and the submit button during API processing, showing “Processing…” on the button.
- **xAI API Integration**: Responses are generated by the xAI API, replacing mock responses, with real-time legal analysis and document summarization.
- **Error Handling**: Displays user-friendly error messages (e.g., “Failed to process document”) if the API call fails or the file format is unsupported.

## Technical Details

- **File Structure**:
  - `src/App.tsx`: Root component with state, layout, and xAI API integration.
  - `src/components/QueryInput.tsx`: Query input component.
  - `src/components/DocumentUpload.tsx`: File upload component.
  - `src/components/ResponseDisplay.tsx`: Response display component.
  - `src/index.css`: Imports Tailwind CSS (`@import "tailwindcss";`).
  - `vite.config.js`: Configures Vite with `@tailwindcss/vite` plugin.
- **Dependencies** (from package.json):
  - React: ^18.3.1
  - TypeScript: ^5.5.3
  - Vite: ^5.4.8
  - Tailwind CSS: ^4.0.0
  - @tailwindcss/vite: ^4.0.0
  - pdf-parse: ^1.1.1 (for PDF text extraction)
  - mammoth: ^1.8.0 (for DOCX text extraction)
- **Configuration**:
  - Vite uses the `@tailwindcss/vite` plugin for Tailwind CSS integration.
  - No `tailwind.config.js` or `postcss.config.js` is required unless customizations are needed, as Tailwind v4 supports automatic content detection.
  - xAI API configuration includes an API key stored in environment variables (`.env`) for secure access.

## Testing and Validation

- **Setup**:
  - Run `npm install` and `npm run dev` to start the development server.
  - Ensure `.env` includes `VITE_XAI_API_KEY` for xAI API access.
  - Open the app at Vite’s specified port (e.g., `http://localhost:5173`).
- **Centering**:
  - Verify the app is centered horizontally and vertically using browser dev tools (F12, Elements tab).
  - Check `flex items-center justify-center` on the outer container.
- **Responsiveness**:
  - Test on mobile (320px), tablet (640px), and desktop (~1200px) using browser responsive mode.
  - Confirm container width (`max-w-md` to `max-w-4xl`), padding (`p-4` to `p-8`), and typography (`text-2xl` to `text-4xl`).
- **Functionality**:
  - Enter a query and upload a file (e.g., `Sample_Contract.pdf`).
  - Verify the “Submit Request” button is disabled without both inputs.
  - Submit and check console logs for:
    ```
    Sending request to xAI API for file: Sample_Contract.pdf
    Received response: { queryResponse: "...", summary: "..." }
    ```
  - Ensure the response displays in `ResponseDisplay` or an error message appears if the API call fails.
- **Styling**:
  - Inspect the main container: `background-color: rgb(255, 255, 255)`, `box-shadow`, `border-radius: 0.5rem`.
  - Check button: `background-color: rgb(59, 130, 246)` (`bg-blue-500`).

## Recent Changes

Based on the latest updates:

- **xAI API Integration**: Replaced mock responses with real xAI API calls in `App.tsx`, sending query and document text and processing responses.
- **Error Handling**: Added `error` state in `App` and `ResponseDisplay` to handle API failures or invalid inputs.
- **File Processing**: Integrated `pdf-parse` and `mammoth` for text extraction from PDF and DOCX files before API submission.
- **Consolidated Submission**: Maintained requirement for both a query and a document, with a single `handleSubmit` function.
- **Responsive Design**: Preserved responsive widths (`max-w-md sm:max-w-lg lg:max-w-4xl`), padding (`p-4 sm:p-6 lg:p-8`), and typography (`text-2xl sm:text-3xl lg:text-4xl`).
- **Centered Layout**: Retained `items-center justify-center` for full-page centering.
- **File Name Display**: Kept dynamic file name display in `DocumentUpload` with a “Clear” button.
- **Styling**: Maintained white card container (`bg-white shadow-lg rounded-lg`) and neutral color scheme for inputs (`bg-black`, `text-white`).

## Future Enhancements

- **Advanced Error Handling**: Add validation for file sizes, query length, and specific file type restrictions, with detailed error messages.
- **Accessibility**: Enhance ARIA attributes and keyboard navigation for better inclusivity.
- **Authentication**: Implement user authentication for personalized query history or secure uploads.
- **UI Polish**: Add animations for loading states or transitions using Tailwind’s utilities.
- **Caching**: Implement response caching to reduce API calls for repeated queries.

## Component Interaction Table

| Component       | Inputs                    | Outputs                          | Styling Highlights                             |
| --------------- | ------------------------- | -------------------------------- | ---------------------------------------------- |
| App             | Query, file, submit click | xAI API response, summary, error | Centered card, responsive width/padding        |
| QueryInput      | User text input           | Updates query state              | Black text area, gray container                |
| DocumentUpload  | File selection            | Updates file state, name         | Black button, file name on right, clear option |
| ResponseDisplay | Response data, error      | Displays query/summary, error    | White card, readable text, red errors          |

## Conclusion

The Legal Query Assistant’s architecture is a robust, component-based system leveraging React, TypeScript, Vite, Tailwind CSS v4, and the xAI API. Recent updates have integrated real AI responses via the xAI API, streamlined the submission process, enhanced responsiveness, and ensured a centered layout, making the application user-friendly and visually appealing. The consolidated submission logic requires both a query and a document, with xAI API-driven responses providing legal analysis and document summarization. Future enhancements can focus on advanced error handling and additional features to transform the proof-of-concept into a production-ready tool.
