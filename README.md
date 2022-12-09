# CreativeCodeFinal
React-Three-Fiber Globe with arbitrary points and arc lines between them to represent locations of audience members in a virtual concert.

## About

This is 3D globe visualization built in React Three Fiber. After a month of learning how to use Three.JS and R3F thanks to Bruno Simon's [ThreeJSJourney](https://threejs-journey.com/), I set out to build my own globe with this technology to provide a visualization for our groups project, The Rug Experience, which is an audio-reactive hand-woven rug with embedded vibrational motors and LED lights to be used as way to improve the remote-concert experience. This was also an opportunity for me to work more with integrating glsl code into Three.js scenes.


## Getting Started
Install all dependencies with
```
npm install
```

Then, run using
```
npm run dev
```

## How it Works

React Three Fiber (R3F) is a React renderer that allows one to write JSX code that gets converted into a Three.js scene. Drei is collection of community-made components for R3F.

The index.js file houses the root component that is used by react-dom rendering import to add the Three.js canvas (via R3F) to the html. That is also where I set the initial camera controls to show put the globe at the center of the field of view.

The majority of the code exists in the Experience.js file, which is called as a JSX component housed within the Canvas component.

After the imports, the shader materials are declared. These are grabbing the vertex and fragment glsl code (exist in .js code as default exports), as well as a uniform for time that I use to animate the shaders.

Then the lat/long coordinates are defined for the locations I use on the globe. Ideally these would not be hardcoded, so incoporating the Mapbox api with a geocoding functionality is a future direction for this project.

Then I wrote a function for converting lat/longs into cartesian coordinates to get the points in the correct place on the globe.

The next function I wrote with the help of [Yuri Artiukh's Earth Coordinates in Three.JS video](https://www.youtube.com/watch?v=2pUzJOfekVE&t=3037s) to get the 3D CatmullRomCurve (3D splin curve) path between two points.

The Experience component return function begins with defining props I use to get the earth map texture for the globe. Then many ref instances are defined using UseRef to allow for animations in the shaders I use. All three shaders were provided by [ThreeJSJourney](https://threejs-journey.com/), but animations were done by using a uTime uniform and multiplying it by the uv in the vertex glsl code.

After getting the time for each ref instane, the JSX for every mesh in the scene (globe, artist/audience locations, arc lines, and stars) are put in. Another future direction is to create separate components for the different types of meshes to make the code more efficient and concise, and also avoid using the many ref instances which is cumbersome and unnecessary when custom components are used.




