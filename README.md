# Real Estate Property Platform

This project is a real estate property platform developed with **Next.js**. It allows users to register, browse properties, filter properties. The data is stored client-side using **localStorage** and managed with **React Context**. The platform is styled with **Tailwind CSS**.

## Tech Stack

- **Next.js** - Framework for server-side rendering and static site generation.
- **TypeScript** - Type-safe development environment.
- **Tailwind CSS** - Utility-first CSS framework for responsive design.
- **LocalStorage** - Used to persist user and app data on the client-side.
- **React Context API** - For state management across the application.

## Features

### 1. User Authentication
- **Registration**: Users can create an account with a username, email, password, and optional profile avatar.
- **Login**: Users can log in using their email and password.
- **Local Persistence**: User data is stored in **localStorage**, and session persistence is handled across browser refreshes.

### 2. Property Listing
- **Dynamic Property List**: Users can view a dynamically populated list of properties.
- **Image Support**: Property images are displayed dynamically, and user-uploaded avatars are supported via local uploads.

### 3. Property Filtering
- **Search Filter**: Users can search for properties based on criteria such as location, price range, or property type.
- **Real-Time Filtering**: The property list updates in real time as the user inputs search criteria, enhancing the user experience.

### 4. Cart Functionality
- **Add to Cart**: Users can add properties to their cart (favorites list).
- **View Cart**: Users can view their cart with the properties they have added as favorites.
- **Remove from Cart**: Users can remove properties from their cart.
- **Local Persistence**: Cart items are stored in **localStorage**, so the cart remains intact across browser refreshes.


## Approach

### Authentication
User authentication is fully handled on the client-side. The **React Context API** manages the user state globally. Upon registration or login, user details (including avatar) are stored in **localStorage** for session persistence.

### Property Listing
The property listing is dynamically generated using mock data stored locally. This data can later be replaced by API calls to a backend service if required.

### Property Filtering
The filtering functionality works by applying real-time filtering on the available property data based on user input. The filtered list updates as users type in search fields or apply filters such as property type or location.

### Cart Functionality
Users can add properties to their cart (favorites list), view their cart, and remove items from the cart. The cart state is managed using **localStorage** to ensure persistence across browser sessions.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kcdev10/-totality-frontend-challenge-.git
   cd real-estate-platform
   npm install 
   npm run dev
