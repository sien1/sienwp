

uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

varying vec2 vTextureCoord;


void main() {

    gl_FragColor = vec4(1.,1.,0.,1.);

    vec2 uv = vec2(vTextureCoord.x + sin(vTextureCoord.y*10.)/10., vTextureCoord.y);
    gl_FragColor = texture2D(uTextureOne, vTextureCoord);
}