# Drape Gear – Full-Stack E-Commerce Web App

**Drape Gear** is a modern full-stack e-commerce web application built with a focus on functionality, clean design, and a smooth user experience. It supports both user and admin roles, complete product browsing features, secure authentication, Stripe payments, and dynamic PDF invoice generation.

---

## Admin Access

- **Email:** admin@mail.com
- **Password:** 123456

---

## Live Site URL

Visit the live site at: [DrapeGear](https://drape-gear.vercel.app)

---

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [NextAuth](https://next-auth.js.org/)
- [Axios](https://axios-http.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

### Payments
- [Stripe](https://stripe.com/)

---

## Features

### User Functionality
- Register and login with secure authentication (hashed passwords using `bcrypt`, JWT-based).
- Role-based access: separate user and admin flows.
- Browse products by category, price (low to high, high to low), and with pagination.
- Search functionality for products.
- Quick view product modal and detailed product pages via dynamic routing.
- Add to and remove from **Cart** and **Wishlist**.
- Checkout with card payments via Stripe.
- Place orders with selected quantity.
- View order history with detailed product breakdown.
- View and download PDF invoices for placed orders.

### Admin Functionality
- Admin dashboard with secure access.
- Add, update, and delete products.
- View all users.
- View all orders placed by users.

---

## Security
- Passwords are hashed using `bcrypt` before storing in the database.
- JWT tokens used for secure API route access.
- Role-based access control (admin vs. user) implemented throughout both frontend and backend.

---

## Steps to Clone and Run the Project Locally

### Steps to Run Locally:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the repository:**

    ```bash
    cd <repository-folder>
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Configure environment variables:** Create a `.env.local` file and add the necessary configurations.

5. **Start the development server:**

    ```bash
    npm start
    ```

6. **View the application in the browser:**

    Open `http://localhost:5000` in your browser.
