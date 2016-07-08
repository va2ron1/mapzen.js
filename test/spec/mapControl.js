describe('Map Control Test', function () {
  var el;

  beforeEach(function () {
    el = document.createElement('div');
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
  });

  afterEach(function () {
    el.parentNode.removeChild(el);
  })

  describe('Tangram check', function () {
    it('checks default style is set.', function (done) {
      var _hasWebGL = function() {
        try {
          var canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (x) {
          return false;
        }
      }
      var thisMap = L.Mapzen.map(el);
      // Give time to load Tangram script
      setTimeout(function () {
        if (_hasWebGL()) {
          thisMap.eachLayer(function (layer) {
            if (layer.scene) done();
          });
          // If no layer with scene found, break the test.
          done(new Error('No Tangram scene found.'));
        } else {
          // When WebGL is not avilable, skip the test.
          done();
        }
      }, 1500);
    });
  })
});
