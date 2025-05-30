# staffengineer-poc-03-llm-nextjs

# Legal Query Assistant

The Legal Query Assistant is a single-page web application built with **Next.js 15**, **TypeScript**, **React 19**, and **Tailwind CSS v4**. It allows users to input legal queries and upload documents (PDF, DOC, DOCX, TXT), receiving mock AI-driven responses and summaries. The application features a responsive, accessible, and centered UI with a card-like design. It is designed for future integration with xAI's Grok API for real AI-driven legal analysis.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Testing and Validation](#testing-and-validation)
- [Future Enhancements](#future-enhancements)
- [Grok API Integration](#grok-api-integration)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Legal Query Assistant enables users to submit legal queries alongside uploaded documents, receiving simulated AI responses that analyze the query and summarize the document. The application is built as a proof-of-concept (PoC) with a modular, component-based architecture, leveraging Next.js’s App Router and Turbopack for fast development. Recent updates consolidated the submission process to require both a query and a document, enhanced responsiveness across screen sizes, and improved the visual layout with a centered, card-like design.

## Features

- **Consolidated Submission**: Users must provide both a query and a document to submit, with a single "Submit Request" button.
- **Dynamic File Upload**: Displays the uploaded file's name (e.g., `Sample_Contract.txt`) with a "Clear" option.
- **Responsive Design**: Scales from mobile (320px) to desktop (1200px) with responsive padding, typography, and button widths.
- **Centered Layout**: UI is vertically and horizontally centered with a white card on a gray background.
- **Loading State**: Disables inputs and shows "Processing…" during submission, simulating a 2-second AI delay.
- **Mock AI Responses**: Generates placeholder responses and summaries, ready for real AI integration.
- **Type Safety**: Uses TypeScript for robust, error-free code.
- **API Route**: Includes a mock API route (`/api/submit`) for future Grok integration.
- **Turbopack**: Uses Next.js’s experimental Rust-based bundler for faster development.

## Folder Structure

```
legal-query-assistant/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   └── submit/
│   │       └── route.ts          # Mock API for processing submissions
│   ├── globals.css               # Tailwind CSS v4 setup
│   ├── layout.tsx                # Root layout for metadata and HTML structure
│   └── page.tsx                  # Main page with state and UI logic
├── components/                   # Reusable React components
│   ├── QueryInput.tsx            # Text area for legal query input
│   ├── DocumentUpload.tsx        # File upload with dynamic file name display
│   └── ResponseDisplay.tsx       # Displays mock AI responses and summaries
├── types/                        # TypeScript type definitions
│   └── index.ts                  # LegalResponse interface
├── public/                       # Static assets (empty by default)
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS v4 configuration
└── README.md                     # Project documentation
```

## Technologies Used

- **Next.js** (15.3.3): React framework with App Router and Turbopack.
- **TypeScript** (^5): Adds type safety to JavaScript.
- **Tailwind CSS** (^4): Utility-first CSS framework for responsive styling.
- **React** (^19.0.0): Component-based UI library.
- **React DOM** (^19.0.0): DOM rendering for React.
- **ESLint** (^8.57.0): Linting for code quality (recommended).
- **Node.js** (18+): Runtime environment.

## Setup Instructions

### Prerequisites

- **Node.js** (18 or later): [Download](https://nodejs.org/)
- **Git** (optional): [Download](https://git-scm.com/)
- A code editor (e.g., VS Code)

### Installation

1. **Clone the Repository** (or create a new project):

   ```bash
   git clone https://github.com/your-username/legal-query-assistant.git
   cd legal-query-assistant
   ```

   Alternatively, scaffold a new Next.js project:

   ```bash
   npx create-next-app@latest legal-query-assistant
   ```

   Select: TypeScript, ESLint, Tailwind CSS, App Router, no `src/` directory.

2. **Update `package.json`**:
   Ensure dependencies match:

   ```json
   {
     "dependencies": {
       "next": "15.3.3",
       "react": "^19.0.0",
       "react-dom": "^19.0.0"
     },
     "devDependencies": {
       "@tailwindcss/postcss": "^4",
       "@types/node": "^20",
       "@types/react": "^19",
       "@types/react-dom": "^19",
       "autoprefixer": "^10.4.17",
       "eslint": "^8.57.0",
       "eslint-config-next": "^15.0.0",
       "tailwindcss": "^4",
       "typescript": "^5"
     }
   }
   ```

   Run:

   ```bash
   npm install
   ```

3. **Set Up Tailwind CSS v4**:

   - Create `tailwind.config.js`:
     ```js
     /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: [
         "./app/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```
   - Update `app/globals.css`:

     ```css
     @import "tailwindcss";

     body {
       margin: 0;
       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
         Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
     }
     ```

4. **Set Up Files**:

   - Copy or create the files listed in the [Folder Structure](#folder-structure) section.
   - Ensure the `components/` folder includes `QueryInput.tsx`, `DocumentUpload.tsx`, and `ResponseDisplay.tsx`.
   - Verify `types/index.ts` defines the `LegalResponse` interface.
   - Use `app/page.tsx`, `app/layout.tsx`, and `app/api/submit/route.ts` for the main UI and mock API.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in a browser. Uses Turbopack for faster development.

## How It Works

1. **User Interface**:

   - The UI is a centered, white card (`bg-white shadow-lg rounded-lg`) on a gray background (`bg-gray-100`).
   - Components include:
     - **QueryInput**: A text area for entering legal queries.
     - **DocumentUpload**: A file input for uploading PDF, DOC, DOCX, or TXT files, showing the file name and a "Clear" button.
     - **Submit Button**: Triggers processing, enabled only when both query and file are provided.
     - **ResponseDisplay**: Shows the mock AI response and document summary.

2. **Data Flow**:

   - **Input Collection**:
     - Users enter a query in `QueryInput`, updating the `query` state in `page.tsx`.
     - Users upload a file in `DocumentUpload`, updating the `file` state and displaying the file name.
   - **Submission**:
     - Clicking "Submit Request" in `page.tsx` calls `handleSubmit`, sending the query and file name to `/api/submit` via a `fetch` POST request.
     - The API route simulates a 2-second delay and returns a mock response.
   - **Response Display**:
     - The `legalResponse` state updates with the API response.
     - `ResponseDisplay` renders the query analysis and document summary.

3. **Styling**:

   - **Responsive Design**:
     - Container width: `max-w-md` (mobile) to `max-w-4xl` (desktop).
     - Padding: `p-4` (mobile) to `p-8` (desktop).
     - Typography: `text-2xl` (mobile) to `text-4xl` (desktop) for headings.
     - Button: `w-full` (mobile) to `w-auto` (desktop).
   - **Visual Hierarchy**:
     - White card contrasts with gray background.
     - Black inputs/buttons (`bg-black text-white`) for a professional aesthetic.

4. **Mock API**:
   - The `/api/submit` route simulates AI processing, returning a `LegalResponse` object:
     ```json
     {
       "queryResponse": "Analysis of query: '[query]'. This is a mock legal response...",
       "summary": "Summary of [fileName]: This is a mock summary..."
     }
     ```

## Testing and Validation

### Setup

- Run `npm run dev` and open [http://localhost:3000](http://localhost:3000).
- Use browser dev tools (F12) for inspections.

### Centering

- Verify the UI is centered:
  - Check `flex items-center justify-center` on the outer `div` in `page.tsx`.
  - Ensure the card is vertically and horizontally centered across screen sizes.

### Responsiveness

- Test at:
  - Mobile: 320px
  - Tablet: 640px
  - Desktop: 1200px
- Confirm:
  - Container width: `max-w-md` to `max-w-4xl`.
  - Padding: `p-4` to `p-8`.
  - Typography: `text-2xl` to `text-4xl`.
  - Button: `w-full` (mobile) to `w-auto` (desktop).

### Functionality

1. Enter a query (e.g., "What is a contract?").
2. Upload a file (e.g., `Sample_Contract.txt`).
3. Verify the "Submit Request" button is disabled without both inputs.
4. Click "Submit Request" and check:
   - Button shows "Processing…" for 2 seconds.
   - Console logs:
     ```
     Submitting query: [query]
     Submitting file: [fileName]
     API response: { queryResponse: "...", summary: "..." }
     ```
   - Response appears in `ResponseDisplay`.

### Styling

- Inspect the main container:
  - `background-color: rgb(255, 255, 255)`
  - `box-shadow` and `border-radius: 0.5rem`
- Check button:
  - `background-color: rgb(59, 130, 246)` (`bg-blue-500`)

## Future Enhancements

- **Real AI Integration**: Replace mock responses with Grok API calls (see [Grok API Integration](#grok-api-integration)).
- **Error Handling**: Validate file types, sizes, and query length with user-friendly error messages.
- **Accessibility**: Add AR
