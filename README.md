# CineVault API

Backend API for **CineVault**, an Ironhack **Module 2 - Project #2** app for managing a movie and TV watchlist.

This API uses JSON Server to provide REST-style endpoints from a local `db.json` file. It is designed to support a frontend app where users can save titles, mark them as watched, add ratings, and store personal notes.

## Features

- Movie and TV watchlist data
- REST-style CRUD endpoints
- Health-check endpoint
- CORS enabled for frontend requests
- Request logging with Morgan
- Configurable port with environment variables

## Tech Stack

- Node.js
- JSON Server
- Morgan

## Deployment

Live API:

```text
https://cinevault-api-2vhd.onrender.com
```

This deployed version runs JSON Server with `db.json` on Render. It is fine for class demo and testing, but watchlist changes are not guaranteed to persist permanently.

Render's default filesystem is ephemeral, so changes written to local files like `db.json` can be lost when the service restarts or redeploys. For permanent watchlist data later, use a managed datastore or persistent storage option such as:

- Render persistent disk
- MongoDB Atlas
- Render PostgreSQL
- Supabase

Source: [Render Persistent Disks docs](https://render.com/docs/disks)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The API runs by default at:

```text
http://localhost:5005
```

### Development Mode

To run the server with Node watch mode:

```bash
npm run dev
```

## Environment Variables

The server uses port `5005` by default. To use a different port, create a `.env` file in the project root:

```env
PORT=5005
```

## API Routes

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "cinevault-api"
}
```

### Watchlist

JSON Server creates these endpoints automatically from the `watchlist` collection in `db.json`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/watchlist` | Get all saved titles |
| `GET` | `/watchlist/:id` | Get one saved title |
| `POST` | `/watchlist` | Add a new title |
| `PUT` | `/watchlist/:id` | Replace a title |
| `PATCH` | `/watchlist/:id` | Update part of a title |
| `DELETE` | `/watchlist/:id` | Delete a title |

## Data Model

Example watchlist item:

```json
{
  "id": 1,
  "mediaType": "movie",
  "tmdbId": 27205,
  "title": "Inception",
  "overview": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
  "poster_path": "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  "backdrop_path": "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  "release_date": "2010-07-16",
  "vote_average": 8.4,
  "watched": false,
  "userRating": null,
  "userNotes": "",
  "addedAt": "2026-06-02"
}
```

## Example Requests

Get all watchlist items:

```bash
curl http://localhost:5005/watchlist
```

Add a new watchlist item:

```bash
curl -X POST http://localhost:5005/watchlist \
  -H "Content-Type: application/json" \
  -d '{
    "mediaType": "movie",
    "tmdbId": 157336,
    "title": "Interstellar",
    "overview": "A team travels through a wormhole in search of a new home for humanity.",
    "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "backdrop_path": "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    "release_date": "2014-11-07",
    "vote_average": 8.4,
    "watched": false,
    "userRating": null,
    "userNotes": "",
    "addedAt": "2026-06-02"
  }'
```

Update a saved item:

```bash
curl -X PATCH http://localhost:5005/watchlist/1 \
  -H "Content-Type: application/json" \
  -d '{
    "watched": true,
    "userRating": 5,
    "userNotes": "Great movie."
  }'
```

Delete an item:

```bash
curl -X DELETE http://localhost:5005/watchlist/1
```

## Project Structure

```text
cinevault-api/
├── app.js
├── db.json
├── package.json
├── package-lock.json
└── README.md
```

## Notes

- `db.json` stores the API data.
- JSON Server writes changes directly to `db.json`.
- This backend is intended for an Ironhack Module 2 project frontend.
