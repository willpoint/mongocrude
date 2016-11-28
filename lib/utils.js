var splitObjects = function(obj) {
  var keys = Object.keys(obj);
  var i = -1, res = [];

  while (++i < 3)
    res.push(obj[keys[i]])
  return res;
}

exports.splitObjects = splitObjects;

