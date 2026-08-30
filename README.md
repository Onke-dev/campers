# TravelTrucks

TravelTrucks is a web application for finding and booking campervans. It uses the [Campers API](https://campers-api.goit.study) to display current vehicle information, reviews, and booking confirmations.

## Features

- A home page with a direct link to the catalog.
- Camper catalog with server-side filtering by location, body type, engine, and transmission.
- Incremental loading of four camper cards at a time.
- Camper detail pages with an image gallery, specifications, reviews, and five-star ratings.
- Booking form with client-side validation and a success notification.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- TanStack Query
- Axios
- Formik and Yup
- Swiper
- CSS Modules

## Installation and use

1. Clone the repository:

   ```bash
   git clone https://github.com/Onke-dev/campers.git
   cd campers
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

```bash
npm run dev    # start the development server
npm run build  # create a production build
npm run start  # start the production server
npm run lint   # check the code with ESLint
```

## Author

Mykyta — [Onke-dev](https://github.com/Onke-dev)
