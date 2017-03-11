(function() {
    function AlbumCtrl(fixtures) {
        this.albumData = fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', 'fixtures', AlbumCtrl);
})();