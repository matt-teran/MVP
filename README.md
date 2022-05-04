# MVP

## Purpose

This web app will be a lightweight productivity companion that aims to improve efficiency of your workflow.

## Goals

- [x] Create an app to keep track of the amount of time the user is studying.
- [x] The user can sign up in order for study time to persist through sessions.
- [ ] Notify the user to take a 5 minute break from studying after 25 minutes, aka enforce the Pomodoro Technique.
- [ ] Allow the user to connect their Spotify account and play music through the app. The music will be toggled on and off for breaks.
  The music will default to [lofi hip hop music - beats to study/relax to](https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM)
- [ ] Allow the user to select custom study/break intervals (i.e. 50/10; 90/30)
- [ ] Allow the user to select different Spotify generated playlists. The playlists will be listed and based on genre radios.
- [ ] Allow the user to select a custom Spotify generated playlist (i.e. the user would be able to search for a song, and select the radio playlist
  generated from that song)

## Features

- Minimalistic Front End
- User Authentication
- Data store for user information
- Use of Spotify API & Spotify Web Playback SDK for music playback

## Technologies

### Frontend

- NextJS?
- React
- MaterialUI, Mantine, Ant Design

### Backend

- Express for Server
- Mongoose.js
- Passport for Authorization

### Database

- MongoDB w/ Mongoose.js
- Firebase?

### Build Tools

- Webpack

### Testing

- Jest

### Deployment

- Vercel
