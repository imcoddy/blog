var open = require('open');
 
hexo.on('new', function(data) {
  open(data.path);
});
