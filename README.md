# Forum-Frontend
This is the frontend for my main repo [Forumeong](https://github.com/Sunset-06/Forumeong)
Built using React and Mantine UI.

The UI is simple enough and I have designed it to not be too intrusive or flashy as this project was originally undertaken to learn about server-side programming, so I recomend checking out the main repo for more details about the project.
The authenticaton is done cient-side by the Firebase SDK, so all code related to authentication is present in this repo. Just add your env file and it should run. 

## To run it on your device:

First, clone the repository. You need to have npm and node.js installed on your system.

after cloning, use: 
```
npm install
``` 
to run the dev server use: 
```
npm run dev
```

To connect this with your Spring-boot server, you need to build the code first.

to create a production build, use:
```
npm run build
```
then transfer the contents of the 'dist' directory to the backend.

To view the project, check out the main repository, It is fully deployed on Render.
