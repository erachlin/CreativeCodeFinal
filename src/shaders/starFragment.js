export default `

varying vec2 vUv;
#define PI 3.1415926535897932384626433832795

// vec2 rotate(vec2 uv, float rotation, vec2 mid) {
//     return vec3(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
// }

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}


void main()

{

    float pi = 3.1415926535897932384626433832795;
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);


    vec2 rotatedUv = rotate(vUv, 0.8, vec2(0.5));

    vec2 lightUvX = vec2(rotatedUv.x * 0.1 + 0.45, rotatedUv.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUvX, vec2(0.5));

    vec2 lightUvY = vec2(rotatedUv.y * 0.1 + 0.45, rotatedUv.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUvY, vec2(0.5));


    float strength = lightX * lightY;
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}
`;
