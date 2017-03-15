(function () {
    function SongPlayer(Fixtures) {
        
        var SongPlayer = {};
        /**
        *@desc Current album object retrieved from fixtures
        *@type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        *@function getSongIndex
        *@desc Gets index of a song
        *@type {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        /**
        *@desc Active song object from list of songs
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */      
        var setSong = function(song) {
            if (currentBuzzObject) {
                    stopSong(SongPlayer.currentSong);
                }
                
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                
                SongPlayer.currentSong = song;
        };
        /**
        *@function playSong
        *@desc Plays currentBuzzObject
        *@type {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
        *@function stopSong
        *@desc Stops currentBuzzObject
        *@type {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        /**
        *@function play
        *@desc Play current or new song
        *@param {Object} song
        */
        SongPlayer.play = function(song) {
            
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                
                setSong(song);
                currentBuzzObject.play();
                song.playing = true;
                
            } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
                }
            }
    
        };
        /**
        *@function pause
        *@desc Pause current song
        *@param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        *@function next
        *@desc Plays the next song
        *@param {Object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        *@function previous
        *@desc Plays the previous song
        *@param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        
        return SongPlayer;
    };
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();