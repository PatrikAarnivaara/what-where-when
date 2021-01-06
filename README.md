# What Where When

Application for classifying and storing images.

## General info
An application where users can upload an image and get three classification options from TensorFlow’s image classification model. The user can also edit their own classifications. The interface is built with Material-UI. Users can browse uploaded images by clicking the image icon which displays a grid of images. When a user clicks on an image a detailed view is shown to the right side of the grid. The location icon in the left-hand corner shows if the user shares his or her geolocation, if that is the case it will be saved to the database when uploading an image. 

## Screenshots
![](screenshot1.png)
![](screenshot2.png)
![](screenshot3.png)

## Technologies
* React
* NodeJS
* MongoDB Atlas
* Cloudinary
* TensorFlow
* Google Maps API

## Features
* Upload images and get classification and probability from TensorFlow
* Render list of images and info
* Edit title
* Delete record

## Upcoming improvements
* Make application responsive
* Improve light mode
* Delete image from Cloudinary when user cancels classification before upload
* Handle upload request failure
* CSS improvements (highlight route etc.)

## Setup
To run the application you need get the following keys and install Cloudinary SDK:

CLOUDINARY_NAME=[YOUR_CLOUD_NAME]
CLOUDINARY_API_KEY=[YOUR_API_KEY]
CLOUDINARY_API_SECRET=[YOUR_API_SECRET]

Start a free tier at MongoDB Atlas and create cluster with a collection.
MONGODB_URI=[mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]]

GOOGLE_MAPS_API_KEY=[YOUR_GOOGLE_API_KEY]

Clone repo and run in optional IDE, first run "npm install" then in the root directory "npm run dev"to start application on localhost:3000

## Status
Project is: _ongoing_

## Contact
Created by Patrik Aarnivaara
