# Dashboard Backend
The Dashboard Backend facilitates the connection of the Database and External APIs, handling logic of storing and retrieving data. It exposes endpoints for each use that can be freely called by the frontend application.

# Configuration
Everything required to run the backend is included within the ``.env`` file, allowing for specific ports, API keys, and access urls.

Required Parameters
 - TwitterApiKey
 - TwitterApiSecret
 - TwitterBearer
 - SpotifyApiClient
 - SpotifyApiSecret
 - MongoAuthenticatedURI

Optional Parameters || Default if unspecified
 - WebServerPort || 80

# API
This dashboard exposes a **REST Based API** for other applications to access the information collected by this application. Below are the different routes that it exposes.

## Youtube
```curl
GET /youtube/videos
```
Returns an ApiResponse containing an Array of each YoutubeVideo Object.

## Spotify
```curl
GET /spotify/episodes
```
Returns an ApiResponse continaing an Array of each SpotifyEpisode Object.

## Sensors
QueryData: ParameterName | Options
 - type | salinity, chlorophyll, tempature_f, waterquality
```curl
GET /sensors/data?{ParameterName}
```
Returns an ApiResponse containing a table of SensorData for the given parameter name.

## Messageboard
```curl
GET /messageboard/getMessages
```
Returns an ApiResponse containing an array of all Messages inside the database.

JSONBody: Key | Value
 - message | String - The contents of the message sent.
 - title | String - The title of the message.
 - image? | String/Base64 - The contents of the image.

```curl
GET /messageboard/createMessage?message=Hello+From+Florida&title=Hello!
```

## Twitter
```curl
GET /media/tweets
```
Returns an ApiResponse containing an array of all collected tweets.

# Data Structures

## ApiResponse
Every message the backend sends is wrapped in an 'ApiResponse' structure, containing useful information.
```ts
{
    status: 0 | 1, // If the request was successful
    message: string, // If there's an error, message will explain it.
    data: any, // The payload of the request
    refreshTime: number, // The time the API last refreshed.
    startTime: number // When the API last started.
}
```