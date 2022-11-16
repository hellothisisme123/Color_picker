const concatenate=(a,b)=>{return parseFloat(`${a}${b}`)}
const isObject=(variable)=>{let str_variable=`${variable}`;str_variable=str_variable.charAt(0);if(typeof variable==='string'||variable instanceof String){return!1}
if(str_variable!='['){return!1}
return!0}
const random_min_max_int=(min,max)=>{return Math.floor(Math.random()*(max-min+1)+min)}
const random_rgb=()=>{let r=random_min_max_int(0,255);let g=random_min_max_int(0,255);let b=random_min_max_int(0,255);let output=`rgb(${r}, ${g}, ${b})`;return output}
const random_hex=()=>{const hexex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];let r1=hexex[random_min_max_int(0,15)],g1=hexex[random_min_max_int(0,15)],b1=hexex[random_min_max_int(0,15)],r2=hexex[random_min_max_int(0,15)],g2=hexex[random_min_max_int(0,15)],b2=hexex[random_min_max_int(0,15)];let hex=`#${r1}${g1}${b1}${r2}${g2}${b2}`;return hex}
const hex_to_rgb=(hex)=>{if(hex.length==4||hex.length==7){hex=hex.substring(1,7)}
if(hex.length==3){hex=hex.split("");for(let i=0;i<hex.length;i++){hex[i]=hex[i]+hex[i]}}else if(hex.length==6){hex=hex.split("");hex[0]=hex[0]+hex[1];hex[1]=hex[2]+hex[3];hex[2]=hex[4]+hex[5];hex=[hex[0],hex[1],hex[2]]}
for(let i=0;i<hex.length;i++){hex[i]=parseInt(hex[i],16)}
return hex}
const insert_mid_string=(string,location,input_txt)=>{let a=string.slice(0,-(string.length-location));let b=string.slice(location,string.length);return `${a}${input_txt}${b}`}
const isNegative=(num)=>{if(num>=0)return!1;if(num<0)return!0}
const isDivisible=(num,by)=>{const a=`${(num / by)}`.split('.');if(a.length==1){if(isNaN(a[0])){console.log('variable is the wrong type')
return!1}
return!0}else if(a.length==2){return!1}}
const $=(a)=>{return document.querySelector(a)}
const remove_array_item=(array,item)=>{let a;let b;let c;let f;b=array;a=b.splice(0,item);c=b.splice(1);f=a.concat(c);return f}