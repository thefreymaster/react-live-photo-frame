# React Live Photo Frame

A React app that allows for video playback intented to be displayed on a tv or monitor, and controlled from a smartphone web app.

## Prerequistis to Running Project

1.  Clone the project
```
git clone https://github.com/thefreymaster/react-live-photo-frame.git
```

2.  Create a .env file at the root, see `example.env` for key names
        You'll need three environment variables
```
REACT_APP_OPENWEATHERMAP Obtained at https://openweathermap.org/api
REACT_APP_LOCATION example: REACT_APP_LOCATION=New York, NY, US
REACT_APP_SERVER_IP this is the IP of where the server is running.  Run ifconfig and get the local IP address.   
```

## Running Project

3. In the terminal on the server run the following command at the root of the project:
```
npm run app
```

4.  Navigate to your server's IP address on port 4000 (example, `192.168.1.100:4000`)
5.  Select controller if on your phone, or frame if app is running on tv or monitor computer

## Adding videos

1.  If you'd like to have videos play on the frame device, add video files to the `/videos` directory
2.  Each video will show up as a tile in the controller on your phone to navigate the frame to
