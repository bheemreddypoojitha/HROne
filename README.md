# HROne JSON Schema Builder 

This is a dynamic JSON schema builder built using React + TypeScript. It allows users to add form fields (including nested objects), choose data types, toggle required fields, and instantly see the resulting JSON schema. Built for HROne assignment.

## Features

- Add fields dynamically with names and data types (`string`, `number`)
- Support for nested objects
- Toggle required fields with a simple switch
- Real-time JSON schema preview
- Final schema output on submit
- Minimal, clean UI with Tailwind CSS

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS

## How to Run the Project

1. Clone the Repository

2. Install Dependencies
npm install
or
yarn
3. Start the Development Server
npm run dev
or
yarn dev
Visit http://localhost:5173 to view the app in your browser.

## How It Works
Click on + Add Item to create a new field.
Enter the field name, select the type from the dropdown.
Toggle the "Required" switch to mark it as a required field.
The right side (or below, depending on screen size) shows a live JSON preview.
When you click Submit, the final JSON schema is printed.

## File Structure Overview

📦src
 ┣ 📂components
 ┃ ┣ 📜FieldRow.tsx          # Handles UI + logic for each field (including nesting)
 ┃ ┗ 📜SchemaBuilder.tsx     # Core component managing the schema
 ┣ 📂types
 ┃ ┗ 📜Field.ts              # Type definitions for fields
 ┗ 📜App.tsx                 # Main App component