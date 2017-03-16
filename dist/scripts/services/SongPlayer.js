(function () {
    function SongPlayer($rootScope, Fixtures) {
        
        var SongPlayer = {};
        /**
        *@desc Current album object retrieved from fixtures
        *@type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        /**
        *@desc Active song object from list of songs
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        *@desc Current playback time (in seconds) of currently playing song
        *@type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        *@desc Volume used for songs
        *@type {Number}
        */
        SongPlayer.volume = 80;
        /**
        *@function setCurrentTime
        *@desc Set current time (in seconds) of currently playing song
        *@param {number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
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
            
                currentBuzzObject.bind('timeupdate', function() {
                    $rootScope.$apply(function() {
                        SongPlayer.currentTime = currentBuzzObject.getTime();
                    });
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
        *@function getSongIndex
        *@desc Gets index of a song
        *@type {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
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
        /**
        *@function setVolume
        *@desc Sets volume for songs
        @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
        
        return SongPlayer;
    };
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
