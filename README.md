# 1. How to Run the Application Locally

## Prerequisites
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).


## Steps to Run

1. **Clone the Repository:**
   ```bash
   git clone  https://github.com/bashubisht/Assessment_Alma.git 
   cd  Assessment_Alma
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
    # or (If above doesn't work)
   npm install @mui/x-date-pickers @mui/x-date-pickers-pro dayjs
   npm run build
   npm start
   ```

   ```bash
   The Public Lead Form will be available at [http://localhost:3000/publicLeadForm]
   The Internal Lead UI will be available at [http://localhost:3000/InternalLeadsLogin]
   To Login username = "admin" and password = "alma123"
   ```

4. **Run Tests:**
   ```bash
   npm test
   # or
   yarn test
   ```

---

# 2. Design Document

## Overview
This document outlines the design choices made during the development of the application, explaining the rationale behind selecting the technologies and tools used in the project. The application enables user form submissions, admin management, and lead state updates using a robust yet minimalistic approach.

## Design Choices

### 2.1. Framework: Next.js/Typescript
*Reason for Choice:*
- *Full-Stack Capabilities:* Next.js combines front-end and back-end in a single framework, allowing the use of API routes alongside React components.
- *Server-Side Rendering (SSR):* For the Admin UI, SSR ensures fast initial page loads and better SEO, even though SEO is not critical for this application.
- *Routing Simplification:* Next.js's file-based routing eliminates the need for explicit route definitions, improving development speed.
- *Ease of Deployment:* Seamless integration with platforms like Vercel makes deploying the app quick and scalable.
- *Typescript for safety.*

### 2.2. Storage: In-Memory Storage
*Reason for Choice:*
- *Simplified Development:* In-memory storage is ideal for small-scale or demo projects, reducing the complexity of integrating external databases.
- *Low Latency:* Data retrieval and updates in memory are extremely fast, ensuring a responsive user experience.
- *Development Focus:* It allows the focus to remain on core features without needing to manage persistent storage for the initial implementation.

*Trade-Offs:*
- Data is ephemeral and will be lost on server restarts or deployments. This is acceptable for the scope of this project but not ideal for production.

### 2.3. Styling: CSS and Material-UI
*CSS:*
- *Reason for Choice:* 
- Custom CSS provides fine-grained control over the application's design, enabling unique branding and layouts.

- *Use Cases:*
- Custom styles for basic components such as headers, footers, and general layouts.
- Flexibility to override Material-UI components when needed.

*Material-UI:*
- *Reason for Choice:*
- A prebuilt component library reduces development time and ensures consistency across the application.
- Built-in support for responsive design.
- Ready-to-use, accessible, and customizable UI components (e.g., tables, forms, buttons).

- *Use Cases:*
- Admin Dashboard: Used Material-UI's table for displaying leads.
- Theme Provider for JSON form

*Combination:*
- CSS was used alongside Material-UI for customizations not covered by Material-UI's theme system, ensuring the application remains visually distinct.

### 2.4. Form Rendering: Custom JSON Form UI
*Reason for Choice:*
- *Dynamic Form Requirements:* The use of a custom rendering system for JSON-based forms allows flexibility to dynamically create form fields and layouts based on JSON definitions.
- *Ease of Maintenance:* Future changes to the form structure require only updates to the JSON configuration, not the underlying code.

*Use Case:*
- For the user form, JSON definitions specify field types (e.g., text, email), validation rules, and labels.

### 2.5. API Layer: Next.js API Routes
*Reason for Choice:*
- *Built-In API Support:* Next.js provides API routes that simplify backend development by co-locating front-end and back-end code.
- *Scalable Structure:* API routes support RESTful principles, ensuring clarity and maintainability of the endpoints.

*Use Cases:*
- POST /api/leads: Handles form submissions from the User UI.
- GET /api/leads: Fetches all leads for the Admin UI.
- PUT /api/leads/:id: Updates the state of a lead.

### 2.6. Testing: Jest
*Reason for Choice:*
- Jest is a powerful testing framework that integrates well with Next.js.
- Supports both unit tests (for components and utilities) and integration tests (for API routes).

*Scope of Testing:*
- *API Routes:* Verifies the correctness of endpoints (/api/leads).
- *Form Validation:* Tests form input validation for required fields and email format.

### 2.7. State Management:
- Simplified State Management: Hooks like useState and useReducer streamline managing local state in functional components.
- Integration with Redux: Hooks like useSelector and useDispatch simplify accessing and updating global state.
- Reusable Logic: Custom hooks encapsulate shared logic, reducing duplication and promoting modularity.

---

## 3. Benefits of the Design Choices

### 3.1. Simplicity and Agility
- The combination of Next.js, in-memory storage, and API routes allows for rapid development and iteration during the early phases of the project.

### 3.2. Modern and Maintainable UI
- Using Material-UI ensures a professional and responsive design with minimal effort.
- Custom CSS provides the flexibility to override and fine-tune the design.

### 3.3. Extensibility
- The use of Next.js API routes and JSON form rendering provides a modular architecture, making the    application easy to extend:
- Add new API endpoints as required.
- Modify the form structure by editing the JSON configuration.

### 3.4. Deployment and Hosting
- The application is fully compatible with serverless hosting environments like Vercel, enabling cost-effective and scalable deployments.

---

## 4. Limitations

1. *In-Memory Storage:*
- Data is not persistent across server restarts or deployments.
- Unsuitable for production use where long-term data persistence is required.
2. *Authentication:*
- Admin authentication is basic and lacks robust security measures like OAuth or JWT.
3. *Scalability:*
- The current architecture is designed for assignment purposes only.

---

## 5. Conclusion
The chosen design balances simplicity and functionality, leveraging Next.js for seamless integration between front-end and back-end, in-memory storage for rapid prototyping, and a combination of CSS and Material-UI for a responsive and professional UI. While suitable for small-scale applications and demos, the system is designed to evolve into a production-ready application with future improvements.

---

## 6. File Structure Documentation

This document outlines the key directories and their purposes in the project.


### Key Directories

### `src/`
- **Purpose:** Contains core resources and utilities for the project.
- **Subdirectory:**
  - `schema/leadFormSchema.ts`: Contains JSON schema files used for JSON Forms.
  - `store/publicLeadFormSlice.ts`: Manages form-related state, logic, and actions, keeping the form state modular and reusable.
  - `store/store.ts`: Configures the Redux store, combines slices, applies middleware, and exports the store.

### `components/`
- **Purpose:** Houses reusable UI components.
- **Subdirectory:**
  - `admin/loginForm.tsx`: Contains functionality for the admin login page.
  - `admin/successModal.tsx`: Contains UI for successfully authenticated.
  - `features/customCubeIconRender.tsx`: Contains custon render for cube icon in JSON form.
  - `features/customHeartIconRender.tsx`: Contains custon render for heart icon in JSON form.
  - `features/customRender.js`: Contains custon render for text area box in JSON form.
  
### `hooks/`
- **Purpose:** Simplified State Management.
- **Subdirectory:**
  - `adminPage/useLeads.tsx`: Contain hook for internal lead list.
  - `publicLeadForm/usePublicLead.tsx`: Contain hook for public lead form.

### `pages/`
- **Purpose:** Includes all page-level components for the application.
- **Subdirectory:**
  - `api/leads.tsx`: Contains Next.js API routes for handling backend logic.
  - `styles/public-lead-form.module.css`: Contains CSS for public lead form.
  - `InternalLeadsLogin.tsx`: Contains UI for Admin login.
  - `InternalLeadsPage.tsx`: Contains dashboard for internal lead list.
  - `publicLeadForm.tsx`: Contains UI for public lead form.

### `public/`
- **Purpose:** Contains static files.
- **Subdirectory:**
 - `images`: Contains images used across the project.

### `tests/`
- **Purpose:** Contains test files for components and application functionality.
- **Subdirectory:**
 - `lead-form.test.tsx`: Unit tests for validations and API.

---

# 7. System Design Documentation

## Table of Contents
- [Functional Requirements](#functional-requirements)
- [System Behavior](#system-behavior)
- [Flow Steps](#flow-steps-for-the-nextjs-application)
- [APIs](#apis)


## Functional Requirements

### User Interface (User UI)
1. *Form Submission*
   - Users can submit a form with the following fields:
     - First Name (required)
     - Last Name (required)
     - Email (required, validated)
     - Country of Citizenship (required)
     - LinkedIn URL (required)
     - Resume / CV (file upload)
     - Visa Category (required)
     - Help Message (required)
   - Successful submissions return a confirmation message.


### Admin Interface (Admin UI)
1. *Admin Authentication*
   - Admins must log in with email and password.
   - Invalid credentials return an error.
2. *View Leads*
   - Display leads in a table with columns:
     - Name
     - Submission Date
     - Country
     - State
   - Features:
     - Filter by state (PENDING or REACHED_OUT)
     - Search by name.
3. *Update Lead State*
   - Admins can change a lead's state (e.g., PENDING → REACHED_OUT).
   - Changes are reflected immediately in the UI.


### Backend Functionality
1. *Data Storage*
   - In-memory storage for leads with fields:
     - ID
     - Name
     - Email
     - Country
     - State
     - Submission Date
     - LinkedIn URL
     - Help Message
     - Visa Category
2. *API Endpoints*
   - POST /api/leads: Submit a new lead (validates required fields).
   - GET /api/leads: Fetch all leads for the admin dashboard.
   - PUT /api/leads/:id: Update a lead's state.


## System Behavior
- *State Management*:
  - Leads have two states: PENDING (default) and REACHED_OUT.
- *Error Handling*:
  - Returns appropriate HTTP error codes (e.g., 400 for invalid requests, 401 for unauthorized access).
- *Session Management*:
  - Admin UI and APIs are accessible only to authenticated admins.


## Flow Steps for the Next.js Application

1. *User Submits Form*
   - User fills and submits the form.
   - Data is sent via POST /api/leads.
   - Server saves the lead with a unique ID and PENDING state.

2. *Server Handles Submission*
   - Next.js API route validates and stores the lead in-memory.
   - Confirmation message is returned to the user.

3. *Admin Views Submissions*
   - Admin logs in and accesses the dashboard.
   - Login success popup is displayed.
   - Admin UI fetches leads via GET /api/leads.
   - Leads are displayed in a filterable/searchable table.

4. *Admin Updates Lead State*
   - Admin selects "Mark as Reached Out" for a lead.
   - PUT /api/leads/:id updates the state to REACHED_OUT.
   - Server returns the updated lead.

5. *Admin UI Reflects Changes*
   - UI updates dynamically to show the new state.


## APIs

### 1. Submit New Lead
*Endpoint*: POST /api/leads  
*Request Body*:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "countryOfCitizenship": "USA",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "visaCategories": "H1B",
  "helpMessage": "Need visa assistance.",
  "state": "PENDING" 
}
```
### 2. Get New Lead
*Endpoint*: GET /api/leads  


### 3. Update Lead State
*Endpoint*: PUT /api/leads/:id
*Request Body*:

```json
{
 "state": "REACHED_OUT" 
}
```

---

## 8. Design Diagrams

<img width="635" alt="SystemArchitecture" src="https://github.com/user-attachments/assets/be88cc88-abc1-4667-8e9e-1d0863a00e37" />


<img width="913" alt="Ui System Design" src="https://github.com/user-attachments/assets/bb097a42-b497-4940-978c-d6197dcfd026" />

---

## 9. Bonus Features Implemented

✅ Next.js API routes for handling form submissions.

✅ JSONForms used for a configuration-driven form setup.

✅ Redux Toolkit used for efficient state management.

✅ Unit tests for form submission and validation.

✅ Responsive design to ensure a great user experience across different screen sizes.

✅ TypeScript integration for type safety.

✅ Form validation feedback to show meaningful error messages.

✅ Documentation with a detailed system design explanation.

---

THANK YOU

---
