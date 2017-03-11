(function() {
    function Fixtures() {
        var Fixtures = {};
        
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
                {title: 'Blue', duration: '161.71', audioUrl: '/assets/music/bloc_jams_music/blue'},
                {title: 'Green', duration: '103.96', audioUrl: '/assets/music/bloc_jams_music/green'},
                {title: 'Red', duration: '268.45', audioUrl: '/assets/music/bloc_jams_music/red'},
                {title: 'Pink', duration: '153.14', audioUrl: '/assets/music/bloc_jams_music/pink'},
                {title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/bloc_jams_music/magenta'}
            ]
        };

        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
                {title: 'Hello, Operator?', length: '1:01'},
                {title: 'Ring, ring, ring', length: '5:01'},
                {title: 'Fits in your pocket', length: '3:21'},
                {title: 'Can you hear me now?', length: '3:14'},
                {title: 'Wrong phone number', length: '2:15'}
            ]
        };
        
        Fixtures.getAlbum = function() {
            return albumPicasso;
        };
        
        Fixtures.getCollection = function() {
            var albums = [];
            
            for (var i = 0; i < numberOfAlbums; i++) {
                albums.push(albumPicasso);
            }
            return albums;
        };
        
        return Fixtures;
    };
    
    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();