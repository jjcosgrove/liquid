#!/usr/bin/env node
!function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=9)}([function(e,n){e.exports=require("log-symbols")},function(e,n){e.exports=require("commander")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("inquirer")},function(e,n){e.exports=require("js-yaml")},function(e){e.exports={name:"@jjcosgrove/liquid",version:"0.0.4",description:"Linode Quick Deployment (LiQuiD) CLI tool",author:"Jonathan James Cosgrove",license:"MIT",repository:{type:"git",url:"https://github.com/jjcosgrove/liquid.git"},scripts:{build:"NODE_ENV=production webpack --config ./webpack.config.babel.js",prepack:"yarn install && rm -rf build && yarn build"},bin:{liquid:"./build/liquid.js"},preferGlobal:!0,engines:{node:">=10.0"},dependencies:{axios:"^0.18.0",commander:"^2.19.0",inquirer:"^6.2.1","js-yaml":"^3.12.1","log-symbols":"^2.2.0",mkdirp:"^0.5.1"},devDependencies:{"@babel/cli":"^7.2.3","@babel/core":"^7.2.2","@babel/node":"^7.2.2","@babel/polyfill":"^7.2.5","@babel/preset-env":"^7.2.3","babel-loader":"^8.0.5",eslint:"^5.12.0","eslint-config-standard":"^12.0.0","eslint-loader":"^2.1.1","eslint-plugin-import":"^2.14.0","eslint-plugin-node":"^8.0.1","eslint-plugin-promise":"^4.0.1","eslint-plugin-standard":"^4.0.0",webpack:"^4.28.1","webpack-cli":"^3.2.1","webpack-node-externals":"^1.7.2"}}},function(e,n){e.exports=require("os")},function(e,n){e.exports=require("mkdirp")},function(e,n){e.exports=require("axios")},function(e,n,t){e.exports=t(10)},function(e,n,t){"use strict";t.r(n);var i=t(1),o=t.n(i),a=t(3),r=t(0),c=t.n(r);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},i=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(n){s(e,n,t[n])})}return e}({appName:"LiQuiD",linode:{baseAPIConfig:{apiVersion:"v4",baseURL:"https://api.linode.com",headers:{ContentType:"application/json"}},endpoints:{data:{TYPES:"/linode/types",REGIONS:"/regions",IMAGES:"/images"},linode:{CREATE:"/linode/instances"}}}},t(5)),l=t(6),p=t.n(l),f=t(2),d=t.n(f),g=t(4),b=t.n(g),y=t(7),m=t.n(y),h=t(8),v=t.n(h);function w(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},i=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(n){k(e,n,t[n])})}return e}function k(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function O(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var j=function(e){return e.data&&e.data.data?e.data.data:e.data},I=function(e){return Promise.reject(e)},P=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.createConfig(n),this.createInstance(u.linode.endpoints),this.assignInterceptors(j,I)}var n,t,i;return n=e,(t=[{key:"createConfig",value:function(e){var n=u.linode.baseAPIConfig;this.apiConfig=w({},n,{baseURL:"".concat(n.baseURL,"/").concat(n.apiVersion),headers:w({},n.headers,{Authorization:"Bearer ".concat(e)})})}},{key:"createInstance",value:function(e){this.apiInstance=v.a.create(this.apiConfig),this.apiEndpoints=e}},{key:"assignInterceptors",value:function(e,n){this.apiInstance.interceptors.response.use(e,n)}},{key:"getTypes",value:function(){return this.apiInstance.get(this.apiEndpoints.data.TYPES)}},{key:"getRegions",value:function(){return this.apiInstance.get(this.apiEndpoints.data.REGIONS)}},{key:"getImages",value:function(){return this.apiInstance.get(this.apiEndpoints.data.IMAGES)}},{key:"createLinode",value:function(e){return this.apiInstance.post(this.apiEndpoints.linode.CREATE,e)}}])&&O(n.prototype,t),i&&O(n,i),e}();function C(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],i=!0,o=!1,a=void 0;try{for(var r,c=e[Symbol.iterator]();!(i=(r=c.next()).done)&&(t.push(r.value),!n||t.length!==n);i=!0);}catch(e){o=!0,a=e}finally{try{i||null==c.return||c.return()}finally{if(o)throw a}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function E(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var L=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.homeDir="".concat(p.a.homedir()),this.baseDir="".concat(this.homeDir,"/.").concat(u.appName.toLowerCase()),this.configFile="".concat(this.baseDir,"/").concat(u.appName.toLowerCase(),".yml")}var n,t,i;return n=e,(t=[{key:"initialize",value:function(e){this.createConfigsAndStore(this.homeDir,e),console.log(c.a.success,"".concat(u.appName," successfully initialized"))}},{key:"createConfigsAndStore",value:function(e,n){var t=!1;m()(this.baseDir,function(e){e&&(t=!0)}),this.writeConfig({token:n}),t&&console.log(c.a.error,"Cannot create ".concat(u.appName," folders and files. Check permissions"))}},{key:"getLinodeData",value:function(){var e=this;return new Promise(function(n,t){var i=e.readConfig(),o=new P(i.token),a=o.getTypes(),r=o.getRegions(),c=o.getImages();Promise.all([a,r,c]).then(function(e){var t=C(e,3),i=t[0],o=t[1],a=t[2];n({types:i.map(function(e){return{name:"".concat(e.label," (").concat(e.id,")"),value:e.id}}),regions:o.map(function(e){return{name:"".concat(e.country.toUpperCase()," (").concat(e.id,")"),value:e.id}}),images:a.map(function(e){return{name:"".concat(e.label," (").concat(e.id,")"),value:e.id}})})})})}},{key:"createLinodeInstance",value:function(e){if(this.alreadyInitialized()){var n=this.readConfig();new P(n.token).createLinode(e).then(function(n){console.log(c.a.success,"Linode: ".concat(n.label," (id: ").concat(n.id,") has been assigned the IP: ").concat(n.ipv4,", is currently ").concat(n.status," ").concat(e.booted?"and will":"but will not"," boot."))}).catch(function(n){console.log(c.a.error,n.message),console.log(c.a.error,e)})}else console.log(c.a.info,"Please run: ".concat(u.appName," init"))}},{key:"alreadyInitialized",value:function(){try{return d.a.statSync(this.baseDir).isDirectory()}catch(e){return"ENOENT"===!e.code}}},{key:"readConfig",value:function(){try{return b.a.safeLoad(d.a.readFileSync(this.configFile,"utf8"))}catch(e){console.log(c.a.error,"Cannot read from ".concat(u.appName," configuration"))}}},{key:"writeConfig",value:function(e){try{d.a.writeFileSync(this.configFile,b.a.dump(e))}catch(e){console.log(c.a.error,"Cannot write to ".concat(u.appName," configuration"))}}}])&&E(n.prototype,t),i&&E(n,i),e}());o.a.version(u.version).description(u.description),o.a.command("init").description("Initialize LiQuiD with a Linode Personal Access Token").action(function(){L.alreadyInitialized()?console.log(c.a.info,"".concat(u.appName," has already been initialized")):Object(a.prompt)([{type:"input",name:"token",message:"Linode Personal Access Token:",validate:function(e){return S(e)}}]).then(function(e){return L.initialize(e.token)})}),o.a.command("create").description("Provision a new Linode instance using the LiQuiD wizard").action(function(){L.alreadyInitialized()?L.getLinodeData().then(function(e){Object(a.prompt)([{type:"input",name:"label",default:"LINODE",message:"Name:"},{type:"list",choices:e.types,name:"type",default:"g6-nanode-1",message:"Type:"},{type:"list",choices:e.regions,name:"region",default:"eu-west",message:"Region:"},{type:"list",choices:e.images,name:"image",default:"linode/debian9",message:"Image:"},{type:"password",name:"root_pass",message:"Password",validate:function(e){return S(e)}},{type:"confirm",name:"backups_enabled",default:!1,message:"Backups?"},{type:"confirm",name:"booted",default:!1,message:"Boot?"}]).then(function(e){return L.createLinodeInstance(e)})}):console.log(c.a.info,"".concat(u.appName," has not been initialized. Please re-run with 'init'"))}),o.a.parse(process.argv);var S=function(e){return!!e.length||"Cannot be empty"}}]);