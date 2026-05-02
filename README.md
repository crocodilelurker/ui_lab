# Project Charter & Technical Roadmap: UI_lab

**Project Start Date:** May 10, 2026

## 1. Project Overview
**UI_lab** is a full-stack, community-driven platform designed to allow developers to discover, interact with, and customize high-quality React UI components. Built with a React frontend and a robust Spring Boot backend, the platform demonstrates a clear understanding of decoupled microservice architectures, Role-Based Access Control (RBAC), and enterprise-grade state management.

Crucially, UI_lab goes beyond a static gallery by featuring an **Interactive Component Playground**. Users can visually manipulate component properties (like size, color, and variants) in real-time, watching the underlying code update automatically before copying or downloading the finalized file.

## 2. Core Architecture & Tech Stack

### Frontend (The Client Layer)
* **Framework:** React (initialized via Vite for optimized build times).
* **Styling:** Tailwind CSS.
* **State Management:** Context API or Redux (essential for managing the live state of the interactive component controls).
* **Component Rendering & Compilation:** `react-live` (or similar AST-based renderer) combined with a custom property-binding engine to safely compile, display, and modify user-submitted code in the browser.

### Backend (The API Layer)
* **Framework:** Java / Spring Boot 3.x
* **Security:** Spring Security with stateless JSON Web Tokens (JWT).
* **Data Access:** Spring Data JPA / Hibernate.
* **Database:** PostgreSQL.

## 3. Feature Specification

### 3.1. Authentication & RBAC (Role-Based Access Control)
* **User Role:** Can browse the public gallery, utilize the interactive lab to tweak components, download files, and submit new base components to the pending queue.
* **Admin Role:** Bypasses the public gallery logic. Accesses a secure administrative dashboard to review pending code submissions, test them in the lab, and approve or reject them.

### 3.2. The Community Component Workflow
* **Submission Engine:** A frontend form allowing users to input a Component Title, Base React Code (JSX), and configurable properties (e.g., declaring which CSS classes or props can be altered).
* **Status State Machine:** Every submitted component is assigned an initial `PENDING` status in the database.
* **Approval Pipeline:** Admin users query the database for pending items, review them, and mutate the status to `APPROVED` or `REJECTED`.

### 3.3. Interactive Component Playground (The "Lab")
* **Visual Property Controls:** A control panel alongside the component displaying sliders, color pickers, and dropdowns (e.g., changing a button from 'sm' to 'lg', or primary color to '#ff0000').
* **Real-time Code Mutation:** As the user interacts with the visual controls, the raw React code snippet updates dynamically to reflect the exact props and Tailwind classes applied.
* **Export Utilities:** * "Copy to Clipboard" for instant pasting.
    * "Download Component" which packages the finalized JSX/TSX and any associated CSS into a downloadable file.

## 4. Phased Development Plan

### Phase 1: Environment & Database Design (May 10 - May 16, 2026)
* Initialize the Spring Boot project via Spring Initializr.
* Design the PostgreSQL relational schema (`Users`, `Roles`, `Components`, and `Component_Properties` for the interactive controls).
* Configure `application.properties` for local database connections.

### Phase 2: Spring Boot Backend & Security (May 17 - May 31, 2026)
* Implement the User Entity, JWT generation, and Spring Security configuration.
* Create the Controller, Service, and Repository layers for Component CRUD.
* Implement RBAC logic for the approval endpoints.

### Phase 3: React Frontend Initialization & Auth (June 1 - June 10, 2026)
* Initialize React with Vite and configure CORS in Spring Boot.
* Build the Login/Registration UI and implement JWT storage.

### Phase 4: Core Application Logic & Workflow (June 11 - June 24, 2026)
* Build the 'Submit Component' interface to accept code strings and definable properties.
* Develop the Admin Dashboard grid and approval workflow.
* Develop the Main Gallery grid for approved items.

### Phase 5: The "Lab" Playground & Export Logic (June 25 - July 10, 2026)
* **Visual Editor:** Build the dynamic control panel that reads a component's editable properties and renders the appropriate UI inputs (color pickers, sliders).
* **Code Sync:** Implement the logic that parses the user's visual changes and mutates the live React code string.
* **Live Render:** Integrate `react-live` to display the mutated code string as a functioning React component.
* **File Generation:** Implement the logic to format the final code string and trigger a browser-side file download (`.tsx`/`.jsx`).