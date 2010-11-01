/*
 * jQuery Pure Template plugin v 0.9.02
 * Copyright 2010, Michal Papis <mpapis@niczsoft.com>
 * Licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function($){
  $.fn.render = function(data,map){
    $_pt.logO('rendering',this.selector);
    var target = this;
    var templates = this.map(function(){
      $_pt.logO('r:',this,$.data(this, '_tp_template'));
      return $.data(this, '_tp_template') ? this : null;
    });
    if (templates.length>0) {
      target = this.map(function(){
        var elem = $(this);
        var template = $.data(this,'_tp_template')
        $_pt.logO('elem',elem,'template',template);
        if (template) {
          elem = $(this).replaceWith(template);
          elem.remove();
          return template;
        } else {
          elem.remove();
          return null;
        }
      });
      target.selector = this.selector;
    }
    target.each(function(){
      $.data(this,'_tp_template',$(this).clone()[0]);
      $_pt.logO('w:',this,$.data(this, '_tp_template'));
    });
    $_pt.logO('this',this,'temps',templates,'target',target);
    $_pt.render(target,data,map);
    target.each(function(){
      $_pt.logO('r2:',this,$.data(this, '_tp_template'));
    });
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
$_pt.uniq = function() {return '_pt_key'+$_pt.uniq_id++ + '_';}

//fill element with data
$_pt.render = function(root,data,map,attr) {
  var t1 = new Date().getTime();
  $_pt.logO('root:',root,'map:',map,'selector:',root.selector,'data:',data,'attr:',attr);
  var newElem;
  if (attr){
    root.attr(attr,data);
  } else if (data instanceof Array) {
    var uniq = $_pt.uniq();
    var first = null;
    for (var id in data){
      newElem = root.clone();
      if (!first) first = newElem;
      if (data[id]['id']) {
        var obj_id = data[id]['id'];
        delete data[id]['id'];
        newElem.attr('id',obj_id)
        newElem.selector=root.selector+'#'+obj_id;
      } else {
        newElem.addClass(uniq+id);
        newElem.selector=root.selector+'.'+uniq+id+':first';
      }
      root.before(newElem);
      $_pt.render(newElem,data[id],map);
    }
    first.each(function(id){
      var template = root[id] ? $.data(root[id],'_tp_template') : undefined;
      if (template) $.data(first[id],'_tp_template',template);
    });
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
      newElem = ($.trim(key)==='') ? root : root.find(key);
      $_pt.render(newElem, val, map, attr);
    }
  }
  var t2 = new Date().getTime();
  $_pt.logO(''+(t2-t1)+'ms',root.selector,data);
};
