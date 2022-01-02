const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songPlay = $(".song-play__info");
const songName = $(".song-play__author p");
const songAuthor = $(".song-play__author span");
const audio = $("#audio");
const songImg = $(".song-play__img img");
const playSong = $(".song-play__play");
const nextSong = $(".next-btn");
const prevSong = $(".prev-btn");
const progress = $(".progress");
const currentTime = $(".song-play__progress span:first-child");
const durationTime = $(".song-play__progress span:last-child");
const volume = $(".song-volume");
const muteSong = $(".play-song__volumn-mute");
const songItemAct = $(".content-song__list");
const repeatBtn = $(".repeat-btn");
const tabList = $$(".content-song__option-item");
const tabItem = $$(".content-song__container");
const imgItems = $$(".content-song__img-container");
const openTheme = $(".content-header__item.open-theme");
const documentA = document.getElementsByTagName("a");

const avatar = $(".content-body__avt > img");
const avatarChange = $("#file-style");
const avatar2 = $(".content-header__item>img");

const avatarLocal = localStorage.getItem("avatar");
avatarChange.onchange = function (e) {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    localStorage.setItem("avatar", file.preview);
    avatar.src = file.preview;
    avatar2.src = file.preview;
};
/**
 * 1. Render Song
 * 2. Scroll top
 * 3. Play - Pause - Seek
 * 4. CD rotate
 * 5. Next - prev
 * 6. Random
 * 7. Next - prev random when end
 * 8. Active Song
 * 9. Scroll active song into view
 * 10. Play song when click
 */
const app = {
    isPlaying: false,
    currentIndex: 0,
    isMute: false,
    isRepeat: false,
    isOpenSearch: false,
    isRandom: false,
    songs: [
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/song-5.mp3",
            image: "./assets/img/song-5.jpg",
            time: "04:35",
            album: "MTP - album",
        },
        {
            name: "3107-2",
            singer: "ft. Nâu, Duongg",
            path: "./assets/music/song-6.mp3",
            image: "./assets/img/song-6.jpg",
            time: "04:28",
            album: "3107 - album",
        },
        {
            name: "Sài gòn đau lòng quá",
            singer: "Hứa Kim Tuyền",
            path: "./assets/music/song-7.mp3",
            image: "./assets/img/song-7.jpg",
            time: "05:08",
            album: "Nhạc buồn - album",
        },
        {
            name: "Nàng thơ",
            singer: "Hoàng Dũng",
            path: "./assets/music/song-8.mp3",
            image: "./assets/img/song-8.jpg",
            time: "04:14",
            album: "Nhạc buồn - album",
        },
        {
            name: "Cưới đi",
            singer: "Masew",
            path: "./assets/music/song-1.mp3",
            image: "./assets/img/song-1.jpg",
            time: "03:02",
            album: "Cưới nàoo - album",
        },
        {
            name: "Người em cố đô",
            singer: "Rum x Da",
            path: "./assets/music/song-2.mp3",
            image: "./assets/img/song-2.jpg",
            time: "03:33",
            album: "Nhạc hay - album",
        },
        {
            name: "Dịu dàng em đến",
            singer: "Karik",
            path: "./assets/music/song-3.mp3",
            image: "./assets/img/song-3.jpg",
            time: "03:05",
            album: "Nhạc hay - album",
        },
        {
            name: "Chuyện rằng",
            singer: "Thịnh Suy",
            path: "./assets/music/song-4.mp3",
            image: "./assets/img/song-4.jpg",
            time: "04:32",
            album: "Nhạc buồn - album",
        },
        {
            name: "Trên tình bạn dưới tình yêu",
            singer: "Min",
            path: "./assets/music/song-9.mp3",
            image: "./assets/img/song-9.jpg",
            time: "03:18",
            album: "Nhạc hay - album",
        },
        {
            name: "Mãi chẳng tìm được em",
            singer: "Freak D, Reddy(Hữu Duy)",
            path: "./assets/music/song-10.mp3",
            image: "./assets/img/song-10.jpg",
            time: "06:03",
            album: "Nhạc buồn - album",
        },
        {
            name: "Chúng ta không thuộc về nhau",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/song-11.mp3",
            image: "./assets/img/song-11.jpg",
            time: "03:52",
            album: "MTP - album",
        },
        {
            name: "Hãy trao cho anh",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/song-12.mp3",
            image: "./assets/img/song-12.jpg",
            time: "04:05",
            album: "MTP - album",
        },
    ],
    choiseToday: [
        {
            image: "./assets/img/choise1.webp",
            content1: "Everyday Favorites",
            content2: "Enjoy cả ngày với những bản Hits nghe không biết chán là gì",
        },
        {
            image: "./assets/img/choise2.webp",
            content1: "Đóa hồng nhạc Việt",
            content2: "Những đóa hồng tỏa sắc hương trong khu vườn V-pop",
        },
        {
            image: "./assets/img/choise3.webp",
            content1: "Anime Now",
            content2: "Nhạc anime hot nhất thời điểm hiện tại có hết tại đây",
        },
        {
            image: "./assets/img/choise4.webp",
            content1: "K-Christmas",
            content2: "Cùng các sao K-Pop hâm nóng không khí trước kì giáng sinh",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
        {
            image: "./assets/img/choise5.webp",
            content1: "Catchy Tune",
            content2: "Dễ nghe dễ nhớ, nghe phát hát theo luôn",
        },
    ],
    corner: [
        {
            image: "./assets/img/corner1.webp",
            content1: "Throwback Acountic",
            content2: "Acountic mộc mạc với điểm nhấn là giọng hát",
        },
        {
            image: "./assets/img/corner2.webp",
            content1: "Justin Biebers Flavour",
            content2: "Âm nhạc của Justin Biebers là cảm hứng cho các ca sỹ trẻ",
        },
        {
            image: "./assets/img/corner3.webp",
            content1: "ASIA Tune OST",
            content2: "Bộ phim bạn yêu thích, giai đoạn bạn yêu thích",
        },
        {
            image: "./assets/img/corner4.webp",
            content1: "Daily XONES Picks",
            content2: "Tuyển chọn đặc biệt mỗi ngày mới XUNE radio",
        },
        {
            image: "./assets/img/corner5.webp",
            content1: "Indie Hits",
            content2: "Những cái tên indie nổi bậc nhất",
        },
    ],
    playlist: [
        {
            image: "./assets/img/playlist1.webp",
            content: "Sơn Tùng MTP",
        },
        {
            image: "./assets/img/playlist2.webp",
            content: "Phi Hành Gia",
        },
        {
            image: "./assets/img/playlist3.webp",
            content: "Yêu Là Cưới",
        },
        {
            image: "./assets/img/playlist4.webp",
            content: "Độ Tộc",
        },
        {
            image: "./assets/img/playlist5.webp",
            content: "Mr Siro",
        },
        {
            image: "./assets/img/playlist6.webp",
            content: "Jack - Ablum",
        },
        {
            image: "./assets/img/playlist7.webp",
            content: "Đoãn Hiếu",
        },
        {
            image: "./assets/img/playlist8.webp",
            content: "Lil Z",
        },
        {
            image: "./assets/img/playlist9.webp",
            content: "Đạt Kaa",
        },
    ],
    themeList: [
        {
            image: "./assets/img/back-ground-2.jpg",
            headerColor: "#e7dfdd",
        },
        {
            image: "./assets/img/back-ground-3.jpg",
            headerColor: "#e7dfdd",
        },
        {
            image: "./assets/img/back-ground-4.jpg",
            headerColor: "#e7dfdd",
        },
        {
            image: "./assets/img/back-ground-5.jpg",
            headerColor: "#e7dfdd",
        },
        {
            image: "./assets/img/back-ground-6.jpg",
            headerColor: "#e7dfdd",
        },
    ],
    articList: [
        {
            image: "./assets/img/artic1.png",
            name: "Sơn Tùng MTP",
            follower: "2.5M",
        },
        {
            image: "./assets/img/artic-2.jpg",
            name: "Han Sara",
            follower: "195K",
        },
        {
            image: "./assets/img/artic-3.jpg",
            name: "Min",
            follower: "1M",
        },
        {
            image: "./assets/img/artic-4.jpg",
            name: "Binz",
            follower: "900K",
        },
        {
            image: "./assets/img/artic-5.jpg",
            name: "Jack",
            follower: "1.5M",
        },
        {
            image: "./assets/img/artic-6.jpg",
            name: "Amee",
            follower: "850k",
        },
        {
            image: "./assets/img/artic-7.png",
            name: "Mr.Siro",
            follower: "1.8M",
        },
    ],
    listenList: [
        {
            image: "./assets/img/list-1.webp",
            content: "Những Sự Kết Hợp Mới",
            singer1: "Min",
            singer2: "HIEUTHUHAI",
            singer3: "Lemese",
        },
        {
            image: "./assets/img/list-2.webp",
            content: "Hot Hits VietNam 2021",
            singer1: "Orange",
            singer2: "Adele",
            singer3: "SOOBIN",
        },
        {
            image: "./assets/img/list-3.webp",
            content: "Giai Điệu Và Trào Lưu",
            singer1: "Doja Cat",
            singer2: "The Kid",
            singer3: "LaRoi",
        },
        {
            image: "./assets/img/list-4.webp",
            content: "Thay Lời Muốn Nói",
            singer1: "Karik, OnlyC",
            singer2: "The Kid",
            singer3: "LaRoi",
        },
        {
            image: "./assets/img/list-5.webp",
            content: "VPOP 2021 Nghe Gì",
            singer1: "Erik",
            singer2: "LyLy",
            singer3: "Monstar",
        },
    ],
    newSongList: [
        {
            image: "./assets/img/newsong-1.webp",
            content: "Hot Hits VietNam 2021",
            singer1: "Bảo Anh, Ali hoàng Dương",
        },
        {
            image: "./assets/img/newsong-2.webp",
            content: "VPOP Tháng 12/2021",
            singer1: "Min",
        },
        {
            image: "./assets/img/newsong-3.webp",
            content: "Giai Điệu Và Trào Lưu",
            singer1: "Doja Cat",
        },
        {
            image: "./assets/img/newsong-4.webp",
            content: "Thay Lời Muốn Nói",
            singer1: "Karik, OnlyC",
        },
        {
            image: "./assets/img/newsong-5.webp",
            content: "VPOP 2021 Nghe Gì",
            singer1: "Erik",
        },
    ],
    hasListen: [
        {
            image: "./assets/img/siro-1.webp",
            content: "Những Bài Hát Hay Nhất ",
            singer1: "Mr.Siro",
        },
        {
            image: "./assets/img/siro-2.webp",
            content: "Mr.siro - Piano Version",
            singer1: "Mr.Siro",
        },
        {
            image: "./assets/img/siro-3.webp",
            content: "Phải Chi Lúc Trước Anh Sai",
            singer1: "Mr.Siro",
        },
        {
            image: "./assets/img/siro-4.webp",
            content: "Tình Yêu Chắp Vá",
            singer1: "Mr.Siro",
        },
        {
            image: "./assets/img/siro-5.webp",
            content: "Mr.Siro Collection",
            singer1: "Mr.Siro",
        },
    ],
    // Render Song
    renderSong() {
        var html = this.songs.map(function (song, index) {
            return `
            <div class="song-item ${index === app.currentIndex ? "active" : ""}" data-set = "${index}">
                            <div class="song-item__info">
                                <div class="icon-inside__img">
                                    <img src=${song.image} alt="">
                                    <div class="img-modal">
                                        <i class="fas fa-play play-btn"></i>
                                    </div>
                                </div>
                                <div class="song-item__author">
                                    <span>${song.name}</span>
                                    <a href="#">${song.singer}</a>
                                </div>
                            </div>
                            <div class="song-item__duration">
                                ${song.time}
                            </div>
                            <div class="song-item__option">
                                <div class="song-item__option-icon">
                                    <i class="bx bxs-microphone"></i>
                                </div>
                                <div class="song-item__option-icon">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <p>
                                    <span></span><span></span><span></span>
                                </p>
                            </div>
                        </div>
            `;
        });
        $(".content-song__list").innerHTML = html.join("");
    },
    renderZingChart() {
        var html = this.songs.map(function (song, index) {
            return `
            <div class="list-song__container ${
                index === app.currentIndex ? "active" : ""
            }" data-set = "${index}">
                        <div class="list-song__info">
                            <i class="fas fa-music"></i>
                            <div class="lis-song__info-img">
                                <img src="${song.image}" alt="">
                                <div class="img-modal2">
                                    <i class="fas fa-play play-btn"></i>
                                </div>
                            </div>
                            <div class="list-song__author">
                                <span>${song.name}</span>
                                <p>
                                    ${song.singer}
                                </p>
                            </div>
                        </div>
                        <div class="list-song__albume">
                            ${song.album}
                        </div>
                        <div class="list-song__time">
                            <i class="bx bxs-microphone"></i>
                            <i class="fas fa-heart"></i>
                            <span>${song.time}</span>
                        </div>
                    </div>
            
            `;
        });
        $(".row.zing-chart").innerHTML = html.join("");
    },
    renderListSong() {
        var html = this.songs.map(function (song, index) {
            return `
            <div class="list-song__container ${
                index === app.currentIndex ? "active" : ""
            }" data-set = "${index}">
                        <div class="list-song__info">
                            <i class="fas fa-music"></i>
                            <div class="lis-song__info-img">
                                <img src="${song.image}" alt="">
                                <div class="img-modal2">
                                    <i class="fas fa-play play-btn"></i>
                                </div>
                            </div>
                            <div class="list-song__author">
                                <span>${song.name}</span>
                                <p>
                                    ${song.singer}
                                </p>
                            </div>
                        </div>
                        <div class="list-song__albume">
                            ${song.album}
                        </div>
                        <div class="list-song__time">
                            <i class="bx bxs-microphone"></i>
                            <i class="fas fa-heart"></i>
                            <span>${song.time}</span>
                        </div>
                    </div>
            
            `;
        });
        $(".content-song__container2").innerHTML = html.join("");
        $(".row.zing-chart").innerHTML = html.join("");
    },
    renderChoise() {
        var html = this.choiseToday.map(function (choise, index) {
            return `
            <div class="col l-2-4 m-3 c-4">
                                <div class="album-item">
                                    <div class="album-item__img">
                                        <img src="${choise.image}" alt="">
                                        <div class="album-img__modal">
                                            <i class="fas fa-heart"></i>
                                            <div class="song-play__play2">
                                                <div class="song-play">
                                                    <i class="fas fa-play play-btn"></i>
                                                </div>
                                            </div>
                                            <i class="bx bxs-microphone micro"></i>
                                        </div>
                                    </div>
                                    <span>${choise.content1}</span>
                                    <p>${choise.content2}</p>
                                </div>
                            </div>
            `;
        });
        $(".album-container").innerHTML = html.join("");
    },
    renderCorner() {
        var html = this.corner.map(function (corner, index) {
            return `
            <div class="col l-2-4 m-3 c-6">
                                <div class="album-item">
                                    <div class="album-item__img">
                                        <img src="${corner.image}" alt="">
                                        <div class="album-img__modal">
                                            <i class="fas fa-heart"></i>
                                            <div class="song-play__play2 ">
                                                <div class="song-play">
                                                    <i class="fas fa-play play-btn"></i>
                                                </div>
                                            </div>
                                            <i class="bx bxs-microphone micro"></i>
                                        </div>
                                    </div>
                                    <span>${corner.content1}</span>
                                    <p>${corner.content2}</p>
                                </div>
                            </div>
            `;
        });
        $(".album-corner").innerHTML = html.join("");
    },
    renderPlaylist() {
        var html = this.playlist.map(function (item, index) {
            return `
            
                
                    <div class="col l-2-4 m-4 c-6">
                        <div class="playlist-item">
                            <div class="playlist-item__img">
                                <div class="playlist-img"
                                    style="background-image: url(${item.image})"></div>
                                <div class="playlist-modal">
                                <div class="song-play__play2 song-play__play3">
                                <div class="song-play song-play2">
                                    <i class="fas fa-play play-btn"></i>
                                </div>
                                </div>

                                </div>
                            </div>
                            <div class="playlist-title">
                                <h3>${item.content}</h3>
                                <p>Zing-mp3</p>
                            </div>
                        </div>
                    </div>
                
            
            `;
        });
        $(".row.playlist").innerHTML = html.join("");
    },
    rederArtic() {
        var html = this.articList.map(function (artic, index) {
            return `
            <div class="col l-2-4 m-4 c-6">
                <div class="artict-container">
                    <div class="artic-img__wrap">
                        <div class="artic-img"
                            style="background-image: url(${artic.image})"></div>
                        </div> 
                        <div class="artic">
                            <div class="artic-info">
                                <p>${artic.name}</p>
                                <span>Quan tâm: ${artic.follower} vote</span>
                            </div>
                            <div class="interest-btn">
                                <i class="fas fa-check"></i>
                                <span>ĐÃ QUAN TÂM</span>
                            </div>
                        </div>
                </div>
            </div>
            `;
        });
        $(".artic-wrapper").innerHTML = html.join("");
    },
    renderListen() {
        var html = this.listenList.map(function (listen, index) {
            return `
            <div class="col l-2-4 m-3 c-4">
                                <div class="album-item">
                                    <div class="album-item__img">
                                        <img src="${listen.image}" alt="">
                                        <div class="album-img__modal">
                                            <i class="fas fa-heart"></i>
                                            <div class="song-play__play2">
                                                <div class="song-play">
                                                    <i class="fas fa-play play-btn"></i>
                                                </div>
                                            </div>
                                            <i class="bx bxs-microphone micro"></i>
                                        </div>
                                    </div>
                                    <span>${listen.content}</span>
                                    <p>${listen.singer1},${listen.singer2},${listen.singer3}</p>
                                </div>
                            </div>
            `;
        });
        $(".listen-container").innerHTML = html.join("");
    },
    renderNewSong() {
        var html = this.newSongList.map(function (song, index) {
            return `
            <div class="col l-2-4 m-3 c-4">
                                <div class="album-item">
                                    <div class="album-item__img">
                                        <img src="${song.image}" alt="">
                                        <div class="album-img__modal">
                                            <i class="fas fa-heart"></i>
                                            <div class="song-play__play2">
                                                <div class="song-play">
                                                    <i class="fas fa-play play-btn"></i>
                                                </div>
                                            </div>
                                            <i class="bx bxs-microphone micro"></i>
                                        </div>
                                    </div>
                                    <span>${song.content}</span>
                                    <p>${song.singer1}</p>
                                </div>
                            </div>
            `;
        });
        $(".newsong-container").innerHTML = html.join("");
    },
    renderHasListen() {
        var html = this.hasListen.map(function (song, index) {
            return `
            <div class="col l-2-4 m-3 c-4">
                                <div class="album-item">
                                    <div class="album-item__img">
                                        <img src="${song.image}" alt="">
                                        <div class="album-img__modal">
                                            <i class="fas fa-heart"></i>
                                            <div class="song-play__play2">
                                                <div class="song-play">
                                                    <i class="fas fa-play play-btn"></i>
                                                </div>
                                            </div>
                                            <i class="bx bxs-microphone micro"></i>
                                        </div>
                                    </div>
                                    <span>${song.content}</span>
                                    <p>${song.singer1}</p>
                                </div>
                            </div>
            `;
        });
        $(".has-listen__container").innerHTML = html.join("");
    },
    //
    handleEvent: function () {
        const _this = this;
        //Rotate image
        const scrollImg = songImg.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        scrollImg.pause();

        // Play stop song
        audio.onplay = () => {
            this.isPlaying = true;
            $(".song-play__play").classList.add("active");
            scrollImg.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            $(".song-play__play").classList.remove("active");
            scrollImg.pause();
        };

        playSong.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
                songImg.style.marginLeft = 0 + "px";
            } else {
                audio.play();
                songImg.style.marginLeft = songImg.offsetLeft + 10 + "px";
            }
        };
        $(".play-song__all").onclick = () => {
            if (this.isPlaying) {
                audio.pause();
                songImg.style.marginLeft = 0 + "px";
            } else {
                audio.play();
                songImg.style.marginLeft = songImg.offsetLeft + 10 + "px";
            }
        };
        //Next & Previous
        nextSong.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
            }
            _this.nextSong();
            _this.renderListSong();
            _this.renderSong();
            audio.play();
            _this.scrollIntoView();
        };
        prevSong.onclick = function () {
            _this.prevSong();
            audio.play();
            _this.renderSong();
            _this.renderListSong();
            _this.scrollIntoView();
        };

        //bắt event thay đổi thời lượng
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercen = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercen;
                // Time thực
                var curT = Math.floor(audio.currentTime);
                var curM = curT / 60;
                var curS = curT % 60;
                if (curS < 10) {
                    var prefix = "0";
                } else {
                    var prefix = "";
                }
                currentTime.textContent = `0${Math.floor(curM)}:${prefix}${curS}`;
                //Duration time
                var DurT = Math.floor(audio.duration);
                var DurM = DurT / 60;
                var DurS = DurT % 60;
                if (DurS < 10) {
                    var prefixD = "0";
                } else {
                    prefixD = "";
                }
                durationTime.textContent = `0${Math.floor(DurM)}:${prefixD}${DurS}`;
            }
        };

        //Seek
        progress.oninput = function () {
            const seek = (progress.value * audio.duration) / 100;
            return (audio.currentTime = seek);
        };
        //mute Song
        muteSong.onclick = function () {
            _this.isMute = !_this.isMute;
            $(".play-song__volumn").classList.toggle("active", _this.isMute);
            console.log(audio.volume);
            if (_this.isMute) {
                audio.volume = 0;
                volume.value = 0;
            } else {
                volume.value = 100;
                audio.volume = volume.value / 100;
            }
        };

        //volume
        const curVolume = audio.volume * 100;
        volume.value = curVolume;
        volume.oninput = function () {
            const seekVolume = volume.value / 100;
            audio.volume = seekVolume;
            if (_this.isMute) {
                audio.volume = 0;
            }
            if (audio.volume === 0) {
                $(".play-song__volumn").classList.add("active");
            } else {
                $(".play-song__volumn").classList.remove("active");
            }
        };
        //Repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            $(".song-repeat__btn").classList.toggle("active", _this.isRepeat);
        };

        //when end song
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextSong.click();
            }
        };
        //open search
        $(".search-input").onclick = function () {
            _this.isOpenSearch = !this.isOpenSearch;
            $(".content-header__search-input").classList.toggle("active");
        };
        $(".search-modal").onclick = function () {
            $(".content-header__search-input").classList.remove("active");
        };
        //Tab list
        tabList.forEach(function (tab, index) {
            const tabItemIndex = tabItem[index];
            tab.onclick = function () {
                $(".content-song__option-item.active").classList.remove("active");
                $(".content-song__container.active").classList.remove("active");
                this.classList.add("active");
                tabItemIndex.classList.add("active");
            };
        });

        //Menu Mobile
        $$(".mobile-menu__item").forEach(function (item, index) {
            var menuPctab = $$(".content-body")[index];
            item.onclick = function () {
                $(".mobile-menu__item.active").classList.remove("active");
                $(".content-body.active").classList.remove("active");
                item.classList.add("active");
                menuPctab.classList.add("active");
            };
        });
        //Menu Pc
        $$(".category-item").forEach(function (item, index) {
            var menuPctab = $$(".content-body")[index];
            item.onclick = function () {
                $(".category-item.active").classList.remove("active");
                $(".content-body.active").classList.remove("active");
                item.classList.add("active");
                menuPctab.classList.add("active");
            };
        });
        //MenuTablet
        $$(".moblie-category__item").forEach(function (item, index) {
            var menuPctab = $$(".content-body")[index];
            item.onclick = function (e) {
                $(".moblie-category__item.active").classList.remove("active");
                $(".content-body.active").classList.remove("active");
                item.classList.add("active");
                menuPctab.classList.add("active");
            };
        });
        // Change slide
        var sliderList = [
            "./assets/img/slider-4.jpg",
            "./assets/img/slider-5.jpg",
            "./assets/img/slider-6.jpg",
            "./assets/img/slider-1.jpg",
            "./assets/img/slider-2.jpg",
            "./assets/img/slider-3.jpg",
        ];
        const slides = $(".dis-slider__img");
        const slides1 = $(".dis-slider__img1");
        const slides2 = $(".dis-slider__img2");
        const sliderImg = $(".dis-slider__img img");
        const sliderImg1 = $(".dis-slider__img1 img");
        const sliderImg2 = $(".dis-slider__img2 img");
        let index = 0;
        slides.addEventListener("click", slide);
        slides1.addEventListener("click", slide1);
        slides2.addEventListener("click", slide2);
        var slide2 = function () {
            index++;
            if (index <= sliderList.length - 1) sliderImg2.src = sliderList[index];
            else {
                index = 0;
                sliderImg2.src = sliderList[index];
            }
        };
        setInterval(slide2, 2500);
        var slide1 = function () {
            index++;
            if (index <= sliderList.length - 1) sliderImg1.src = sliderList[index];
            else {
                index = 0;
                sliderImg1.src = sliderList[index];
            }
        };
        setInterval(slide1, 2500);

        var slide = function () {
            index++;
            if (index <= sliderList.length - 1) sliderImg.src = sliderList[index];
            else {
                index = 0;
                sliderImg.src = sliderList[index];
            }
        };
        setInterval(slide, 2500);

        // Slider image
        let imgIndex = 2;
        function slideShow() {
            const slideImgFirst = $(".content-song__img-container.first");
            const slideImgSecond = $(".content-song__img-container.second");
            const slideImgThird = imgItems[imgIndex];
            const slideImgFourth = imgItems[imgIndex === imgItems.length - 1 ? 0 : imgIndex + 1];
            slideImgFourth.classList.replace("fourth", "third");
            slideImgThird.classList.replace("third", "second");
            slideImgSecond.classList.replace("second", "first");
            slideImgFirst.classList.replace("first", "fourth");
            imgIndex++;
            if (imgIndex >= imgItems.length) {
                imgIndex = 0;
            }
            setTimeout(slideShow, 2000);
        }
        slideShow();

        // Bắt sự kiện click vào song
        $(".content-song__list").onclick = function (e) {
            var songNote = e.target.closest(".song-item:not(.active)");
            // var listSongNote = e.target.closest('.list-song__container :not(.active)')
            if (songNote) {
                _this.currentIndex = Number(songNote.getAttribute("data-set"));
                _this.loadCurrentSong();
                _this.renderSong();
                audio.play();
            }
        };

        // Bắt sự kiện click vào play list
        $(".content-song__container2").onclick = function (e) {
            var listSongNote = e.target.closest(".list-song__container:not(.active)");
            if (listSongNote) {
                _this.currentIndex = Number(listSongNote.getAttribute("data-set"));
                _this.loadCurrentSong();
                _this.renderListSong();
                audio.play();
            }
        };

        //Random Song
        $(".random-btn").onclick = function () {
            _this.isRandom = !_this.isRandom;
            $(".song-play__random").classList.toggle("active", _this.isRandom);
        };

        //Open Theme
        const themeModal = $(".theme-modal");
        openTheme.onclick = function () {
            themeModal.classList.toggle("active");
        };
        themeModal.onclick = function () {
            themeModal.classList.toggle("active");
        };
        $(".theme").onclick = function (e) {
            e.stopPropagation();
        };
        $(".theme-modal__close").onclick = function () {
            themeModal.classList.toggle("active");
        };
        //scroll header

        // Change Theme
        // const themesBg = $$(".theme-item");
        // Array.from(themesBg).forEach(function (themeBg, index) {
        //     var bgImage = [
        //         "../../assets/img/back-ground-1.jpg",
        //         "/assets/img/back-ground-2.jpg",
        //         "./assets/img/back-ground-3.jpg",
        //         "../../assets/img/back-ground-4.jpg",
        //         "../../assets/img/back-ground-5.jpg",
        //     ];
        //     var bgColorA = ["background1", "background2", "background3", "background4", "background5"];
        //     var bgTheme = bgImage[index];
        //     var bgColor = bgColorA[index];
        //     themeBg.onclick = function () {
        //         $(".app").style.backgroundImage = `url("${bgTheme}")`;
        //         const newBody1 = $(`body.${bgColorA[index + 1]}`);
        //         if (newBody1) {
        //             newBody1.classList.remove(`${bgColorA[index + 1]}`);
        //         }
        //         const newBody2 = $(`body.${bgColorA[index + 2]}`);
        //         if (newBody2) {
        //             newBody2.classList.remove(`${bgColorA[index + 2]}`);
        //         }
        //         const newBody3 = $(`body.${bgColorA[index + 3]}`);
        //         if (newBody3) {
        //             newBody3.classList.remove(`${bgColorA[index + 3]}`);
        //         }
        //         const newBody4 = $(`body.${bgColorA[index + 4]}`);
        //         if (newBody4) {
        //             newBody4.classList.remove(`${bgColorA[index + 4]}`);
        //         }
        //         $("body").classList.add(`${bgColor}`);
        //     };
        // });
    },

    defineProperties() {
        Object.defineProperty(this, "currentSong", {
            get() {
                return this.songs[this.currentIndex];
            },
        });
    },
    loadCurrentSong() {
        songName.textContent = this.currentSong.name;
        songAuthor.textContent = this.currentSong.singer;
        audio.src = `${this.currentSong.path}`;
        songImg.src = this.currentSong.image;
    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong() {
        var newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollIntoView() {
        setTimeout(() => {
            songItemAct.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 200);
        console.log("aaaa");
    },
    slideImgScroll() {
        // Slider(dùng tạm)
        const imgSliders = $$(".content-song__img-container");
        const imgSliderWrap = $(".img-container");
        const silderImgWidth = imgSliders[0].offsetWidth;
        let index = 0;
        var positionX = 0;
        $(".content-song__item").onclick = function () {
            index++;
            if (index < imgSliders.length) {
                positionX = positionX - silderImgWidth;
                imgSliderWrap.setAttribute("style", `left : ${positionX}px`);
            } else {
                index = 0;
                positionX = 0;
                imgSliderWrap.setAttribute("style", `left : ${positionX}px`);
            }
        };
        setInterval(function () {
            $(".content-song__item").click();
        }, 3000);
    },

    render() {
        this.renderListSong();
        this.renderSong();
        this.renderChoise();
        this.renderCorner();
        this.renderPlaylist();
        this.rederArtic();
        this.renderListen();
        this.renderNewSong();
        this.renderHasListen();
        this.renderZingChart();
    },
    // START
    start() {
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
    },
};

app.start();
