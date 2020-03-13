

uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
varying vec2 vTextureCoord;
uniform mat3 mappedMatrix;
uniform vec2 uvAspect;
uniform float uProgress;

mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}


void main() {

    vec3 map = vec3(vTextureCoord.xy,1.)*mappedMatrix;
    vec2 uv = (map.xy - .5)*.5*vec2(2,2.) + 0.5 ;

    vec2 uvDivided = fract(uv*vec2(150.,1.));
    float progress = fract(uProgress);

    vec2 uvDisplaced1 = uv + rotate(3.1415926/4.)*uvDivided*progress*0.1*2.;
    vec2 uvDisplaced2 = uv + rotate(3.1415926/4.)*uvDivided*(1. - progress)*0.1;

    


    //gl_FragColor = vec4(1.,1.,0.,1.);

   //vec2 uv = vec2(vTextureCoord.x + sin(vTextureCoord.y*10.)/10., vTextureCoord.y);
   vec4 im1 = texture2D(uTextureOne, uvDisplaced1);
   vec4 im2 = texture2D(uTextureTwo, uvDisplaced2);

   gl_FragColor = mix(im1, im2, progress);
    //gl_FragColor =vec4(uvDivided,0.,1.);
}