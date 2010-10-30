/*
 * jQuery Pure Template plugin v 0.9
 * Copyright 2010, Michal Papis <mpapis@niczsoft.com>
 * Licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function($){
  $.fn.render = function(data,map){
    $_pt.logO('this:',this)
    var current = this;
    var selector = current.selector;
    var template = current.data('_tp_template') || current;
    var target = template.clone();
    target.data('_tp_template',template);
    var old = current.replaceWith(target);
    old.remove();
    target.selector = selector;
    $_pt.render(target,data,map);
  }
})(jQuery)

$_pt = {debug:false};

$_pt.log = function(msg){if ($_pt.debug) console.log(msg);}
$_pt.logO = function(){
  if (!$_pt.debug) return;
  var opts = [];
  for (var i = 0; i < arguments.length; i++) opts.push(arguments[i]);
  console.log(opts);
}

$_pt.uniq_id = 1;
$_pt.uniq = function() {
  return '_pt_key'+$_pt.uniq_id++ + '_';
}

//fill element with data
$_pt.render = function(root,data,map,attr) {
  $_pt.logO('selector:',root.selector,'root:',root,'data:',data,'map:',map,'attr:',attr);
  var newElem;
  if (attr){
    root.attr(attr,data);
  } else if (data instanceof Array) {
    for (var id in data){
      newElem = root.clone();
      var uniq = $_pt.uniq();
      newElem.addClass(uniq+id);
      newElem.selector=root.selector+'.'+uniq+id;
      root.before(newElem);
      $_pt.render(newElem,data[id],map);
    }
    root.remove();
  } else if (data instanceof String || typeof(data) === 'string') {
    root.html(data);
  } else if (data instanceof Number || typeof(data) === 'number') {
    root.html(''+data);
  } else {
    for (var key in data) {
      var val = data[key];
      if (map && (map[key] || map[key]==="")) {
        key = map[key];
        if (key instanceof Array) {
          map = key[1];
          key = key[0];
        }
      }
      var arr = key.split('@');
      attr = arr[1];
      key = arr[0];
      newElem = $(root.selector+' '+key);
      $_pt.render(newElem,val,map,attr);
    }
  }
};
