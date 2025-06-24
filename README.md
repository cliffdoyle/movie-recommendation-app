# Movie Discovery Web App

A comprehensive entertainment discovery platform built with React, Vite, and multiple movie database APIs. This application allows users to search for movies and TV shows, view detailed information, manage a personal watchlist, and discover trending content.



## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Usage](#api-usage)
- [Project Setup](#project-setup)
- [API Documentation & Usage](#api-documentation--usage)
  - [TMDB API](#tmdb-api)
  - [OMDB API](#omdb-api)
- [GitHub Workflow](#github-workflow)
- [Screenshots](#screenshots)

---

## Features

- **Trending Dashboard:** View a list of movies and TV shows that are currently trending.
- **Debounced Search:** Real-time search functionality with debouncing to prevent excessive API calls.
- **Pagination:** Easily navigate through multiple pages of search results and lists.
- **Detailed View:** Click on any movie to see a comprehensive detail page with plot, cast, ratings, and more.
- **Watchlist Management:** Add or remove movies from a personal watchlist that persists in your browser's `localStorage`.
- **Mark as Watched:** Toggle the "watched" status for items in your watchlist.
- **Data Syncing:** Integrates data from both TMDB (for core data and images) and OMDB (for supplementary ratings) on the detail page.
- **Responsive Design:** A clean and modern UI that works on both desktop and mobile devices.

---

## Tech Stack

- **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Routing:** [React Router](https://reactrouter.com/)
- **Styling:** CSS3
- **Data Fetching:** Native Fetch API
- **State Management:** React Hooks (`useState`, `useEffect`)

---

## API Usage

This project leverages two external APIs to provide comprehensive movie data:

1.  **[The Movie Database (TMDB) API](https://developer.themoviedb.org/docs):** The primary source for movie/TV data, images, search, and trending content.
2.  **[The Open Movie Database (OMDB) API](http://www.omdbapi.com/):** A secondary source used to fetch supplementary ratings from sources like IMDb and Rotten Tomatoes.

---

## Project Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    You need to get API keys from both TMDB and OMDB.
    - Create a file named `.env` in the root of the project.
    - Add your keys to the `.env` file like this:
      ```
      VITE_TMDB_API_KEY=your_tmdb_api_access_token_here
      VITE_OMDB_API_KEY=your_omdb_api_key_here
      VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
      ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## API Documentation & Usage

This section provides a brief overview of how the APIs are used in the project, with code examples.

### TMDB API

Used for fetching trending movies, searching, and getting detailed movie information. All requests to the TMDB API require an Authorization header with a Bearer Token.

#### Example: Fetching Trending Movies

This is used on the `HomePage` to display what's popular this week.

- **Endpoint:** `GET /trending/movie/week`
- **Code Snippet (`HomePage.jsx`):**
  ```javascript
  const API_URL = `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/week`;
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    }
  });
  const data = await response.json();
  setMovies(data.results);

#### Example: Fetching Movie Details & Cast

This is used on the `MovieDetailPage` to get comprehensive data for a single film.

- **Endpoint:** `GET /movie/{movie_id}`
- **Parameters:** `append_to_response=credits` is used to include cast information in the same API call.
- **Code Snippet (`MovieDetailPage.jsx`):**
  ```javascript
  const { movieId } = useParams();
  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`;

  const tmdbResponse = await fetch(tmdbUrl, {
    headers: { Authorization: `Bearer ${TMDB_API_KEY}` }
  });
  const tmdbData = await tmdbResponse.json();


  ### OMDB API

Used as a secondary source on the `MovieDetailPage` to fetch additional ratings (e.g., Rotten Tomatoes) once we have the movie's IMDb ID from TMDB.

#### Example: Fetching Supplementary Ratings

-   **Endpoint:** Uses the `i` (IMDb ID) parameter for lookup.
-   **Code Snippet (`MovieDetailPage.jsx`):**
    ```javascript
    // 'tmdbData.imdb_id' is retrieved from the TMDB API call above
    if (tmdbData.imdb_id) {
      const omdbUrl = `http://www.omdbapi.com/?i=${tmdbData.imdb_id}&apikey=${OMDB_API_KEY}`;
      const omdbResponse = await fetch(omdbUrl);
      const omdbData = await omdbResponse.json();
      
      // The ratings array is then combined with the main state
      combinedData.omdbRatings = omdbData.Ratings || [];
    }
    ```

---

## GitHub Workflow

This project adheres to a professional Git workflow utilizing feature branches and Pull Requests for code review.

### Branching

-   **`main`**: The production-ready branch.
-   **`feature/search-and-discovery`**: For all features related to searching and viewing movie details.
-   **`feature/watchlist-management`**: For all features related to the user's personal watchlist.

### Commits

-   Commits follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat:`, `fix:`, `docs:`).

### Pull Requests (PRs)

-   No code is merged directly into `main`.
-   All features are developed in their respective branches and proposed for merging via a PR.
-   A peer review is required before a PR can be merged.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.