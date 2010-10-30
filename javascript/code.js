var data1 = 'Hello world!'
var data2 = ['First','Second','Third']
var data3 = [
  {'.name':'Ben','.name@href':'#/a','.age':24},
  {'.name':'Bob','.name@href':'#/b','.age':25},
  {'.name':'Brad','.name@href':'#/c','.age':26}
]
var data4 = [
  {'@label':'First','option':[
    {'':'A','@value':'1'},
    {'':'B','@value':'2'}
  ]},
  {'@label':'Second','option':[
    {'':'C','@value':'3'},
    {'':'D','@value':'4'}
  ]}
]
var data5 = [
  {group:'Third',list:[{name:'E',value:5},{name:'F',value:6}]},
  {group:'Forth',list:[{name:'G',value:7},{name:'H',value:8}]}
]
var map5 = {group:'@label',list:['option',{name:'',value:'@value'}]}

$(function(){
  $('#hello').render(data1);
  $('#users>li').render(data2);
  $('.users2').render(data3);
  $_pt.debug = true;
  $('#opts>optgroup').render(data4);
  $('#server_opts>optgroup').render(data5,map5);
  $_pt.debug = false;
});
