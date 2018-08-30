class Song {
    constructor(songName, songYear) {
        this.songName = songName;
        this.songYear = songYear;
        console.log("Song was created!");
    }
}

class Album {
    constructor(albumName, albumYear, songList= []) {
        this.albumName = albumName;
        this.albumYear = albumYear;
        this.songList = songList;
        console.log("Album was created");
    }

    addNewSong(songName, songYear) {
        this.songList.push(new Song(songName, songYear));
    }
}

class Artist {
    constructor(artistName, artistAge, albumsList = {}) {
        this.artistName = artistName;
        this.artistAge = artistAge;
        this.albumsList = albumsList;
    }

    addNewAlbum(albumName, albumYear, songList= []) {
        
        this.albumsList[albumName] = {
            name: albumName,
            year: albumYear,
            songList: songList
        }
    }
}

const bilan = new Artist('Bilan', 42);
bilan.addNewAlbum('Ocean', 2018, [new Song('Mama Mia', 1985), new Song('Million allyh roz', 1999)]);
console.log(bilan);