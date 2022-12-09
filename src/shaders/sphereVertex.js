export default `
uniform float uTime;
varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv + (uTime * 0.3);

}
`;
