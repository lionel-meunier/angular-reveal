/**
 * Created by lmeunier on 27/02/15.
 */
(function (window) {
  window.revealSectionMock = window.revealSectionMock || {};

  window.revealSectionMock.createFakeSection = function (index) {
    return {
      indexC : index,
      getIndex: function () {
        return index;
      },
      setState : function() {

      }
    }
  };


})(window);
