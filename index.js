var loggedUser = 'ale__borsa93';

var docHtml = (post) => {
    return (
    `<div class="main" id=${post._id}>
    <div class="box1">
        <div class="profilo">
            <div class="circle">
                <img class="immagineProfilo" src="io.jpg"/>
            </div>
            <div class="nome"><b>${post.createdBy} </b> </div>
        </div>
        <div>
            <i style="font-size:50px;" class="fas fa-ellipsis-v"></i>  
        </div>
    </div>
    
    <div ondblclick="likePost(${post._id}, false)" class="immagine">
        <img src=${post.source} />
    </div>
   
    <div class="box2">
        <div class="icone3">
            <span class="icona-cuore" onclick="likePost(${post._id}, true)" class="icona">
                <i style="font-size:50px;" class="far fa-heart"></i>
            </span>
            <span onclick="toggleComments(${post._id},true)" class="icona-messaggio" class="icona">
                <i style="font-size:50px;" class="far fa-comment"></i>  
            </span>
            
            <span class="icona-send" class="icona">
                <i style="font-size:50px;" class="far fa-paper-plane"></i>     
            </span>
        </div>
        <span class="icona-salva" class="icona">
                <i style="font-size:50px;" class="far fa-bookmark"></i>
        </span>
    </div>

    <div class="box3">
        <p class="show-likes">${visualizzaLikes(post.likes)}</p>
        <p><b>ale__borsa93</b> ${post.description}</p>
        <p>${post.hashtags}</p>

        <p class="onclick" onclick="toggleComments(${post._id},true)">
            ${visualizzaCommenti(post.comments)} 
        </p>

        <div class="comment_section hidden">
        <button class="close" onclick="toggleComments(${post._id}, false)">X</button>
            <ul class="comment_list">${commentFunc(post.comments, post._id)}
            
            </ul>
            
            <form onsubmit="return false">
                <input class="input-comment" type="text"/>
                <input class="submit-comment" type="submit" onclick="sendComment(${post._id})"/>
            </form>
        </div>
        
    </div>

 `);


};


var posts = [
    {
        _id: "sksksksksksksksksksk1",
        createdAt: "Fri Dec 04 2020 16:27:43 GMT+0100",
        createdBy: "ale__borsa93",
        source: "Sirfrancisdashwood.jpg",
        likes: ["aleborsa93","lozio","fratm","ajeje","salam"],
        description: "Hello my friends",
        hashtags: "#saluti #saludos",
        comments: [
            {
                text:"che foto",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"bellissima",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"adoro",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"wow",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"love it",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"yep",
                likes: ["ale__borsa93","lozio","salam"]
            },
            {
                text:"magnifica",
                likes: ["ale__borsa93","ajeje"]
            }
        ]
    },
    {
        _id: "sksksksksksksksksksk2",
        createdAt: "Fri Dec 02 2020 11:27:43 GMT+0100",
        createdBy: "ale__borsa93",
        source: "Aiace.jpg",
        likes: ["lozio","fratm","ajeje","salam"],
        description: "I'm the king of the world",
        hashtags: "#yep",
        comments: [
            {
                text:"follow 4 follow",
                likes: ["ale__borsa93","salam"]
            }
        ]
    },
    {
        _id: "sksksksksksksksksksk3",
        createdAt: "Fri Dec 01 2020 16:00:43 GMT+0100",
        createdBy: "ale__borsa93",
        source: "Gerrit.jpg",
        likes: ["aleborsa93","salam"],
        description: "I love",
        hashtags: "#io",
        comments: [
            {
                text:"amazing",
                likes: ["ale__borsa93","lozio","salam"]
            }
        ]
    },
];

//funzione per scritta 'piace a tot persone'
function visualizzaLikes(likes){
    
    if((likes.length) == 0){
        return('nessun like');
        
    } else if ((likes.length) == 1) {
        return ('Piace a ' + likes[0]);
    } else if ((likes.length) == 2) {
        return ('Piace a ' + likes[0] + 'e ' + likes[1]);
    } else if ((likes.length) > 2) {
        return ('Piace a ' + likes[0] + ', ' + likes[1] + ' e altre ' + (likes.length-2) + ' persone');
    };
}


//apre e chiude i commenti
function toggleComments(post, open) {
    
    var commentList = post.getElementsByClassName('comment_section')[0];
    var commentsClosed = commentList.classList.contains('hidden');
    var onclick = post.getElementsByClassName('onclick')[0];
    
    if (open && commentsClosed) {
        commentList.classList.remove('hidden');
        onclick.classList.add('hidden');
    } else if (!open && !commentsClosed) {
        commentList.classList.add('hidden');
        onclick.classList.remove('hidden');
    };
}

//prende i commenti dall'array e li mette in una lista
function commentFunc(comments, postId) {
    
    return (comments.map((comment, index) => {
       
        return (`<li class="commento" <p>${comment.text}</p><button onclick="deleteComment(${postId}, ${index})" class="elimina-commento">elimina</button></li>`)}
    )).join('');
}

//mettere like dal cuore o dall'immagine
function likePost(post, allowToggle){
    var iconaCuore = post.getElementsByClassName('icona-cuore')[0];
    var filled = iconaCuore.classList.contains('fill');
    var showLikes = post.getElementsByClassName('show-likes')[0];
    var likedPost = posts.find(x => x._id === post.id);
    var indexUser = likedPost.likes.indexOf(loggedUser);
    console.log(indexUser);
    
    
    if (allowToggle && filled) {
       iconaCuore.classList.remove('fill');
       likedPost.likes.splice(indexUser, 1);
       showLikes.innerHTML = '<p class="show-likes">'+visualizzaLikes(likedPost.likes)+'</p>';
       console.log(likedPost.likes);
        
    } else {
        iconaCuore.classList.add('fill');
        likedPost.likes.unshift(loggedUser);
        
        showLikes.innerHTML = '<p class="show-likes">'+visualizzaLikes(likedPost.likes)+'</p>';
        console.log(likedPost.likes);
    };
}

//funzione di visualizza commenti
function visualizzaCommenti(commenti){
    
    if((commenti.length)!=0){
        return( 'Visualizza tutti i ' + commenti.length + ' commenti');
        
    } else if ((commenti.length)==0) {
        return ( 'Nessun commento');
    };
}

//invia commento
function sendComment(post){
    var comment = post.getElementsByClassName('input-comment')[0];
    var valoreComment = comment.value;
    var commento = {
        text: valoreComment,
        likes: ''
    };
    var commentedPost = posts.find(x => x._id === post.id);
    commentedPost.comments.push(commento);
    var commentList = post.getElementsByClassName('comment_list')[0];
    commentList.innerHTML = commentFunc(commentedPost.comments, post.id);
    comment.value = "";

    var onclick = post.getElementsByClassName('onclick')[0];
    if((commentedPost.comments.length)!=0){
        
        onclick.innerHTML = 'Visualizza tutti i ' + commentedPost.comments.length + ' commenti';
        
    } else if ((commentedPost.comments.length)==0) {
        
        onclick.innerHTML = 'Nessun commento';
    };
}

//elimina commento
function deleteComment(post, index){
    
    
    var commentedPost = posts.find(x => x._id === post.id);
    commentedPost.comments.splice(index, 1);
    var listaAggiornata = post.getElementsByClassName('comment_list')[0];
    listaAggiornata.innerHTML = '<ul class="comment_list">' + commentFunc(commentedPost.comments, post.id) + '</ul>';
    var onclick = post.getElementsByClassName('onclick')[0];
    if((commentedPost.comments.length)!=0){
        
        onclick.innerHTML = 'Visualizza tutti i ' + commentedPost.comments.length + ' commenti';
        
    } else if ((commentedPost.comments.length)==0) {
        
        onclick.innerHTML = 'Nessun commento';
    };

}
function insertPost() {
   
    this._id = "";
    this.createdAt = "";
    this.createdBy = "";
    this.source = "";
    this.likes = [];
    this.description = "";
    this.hashtags = "";
    this.comments = [];
    
            
	
}


function newPost(){
    var feed = document.getElementById("feed");
    var source = document.getElementsByClassName('source')[0];
    var description = document.getElementsByClassName('description')[0];
    var hashtags = document.getElementsByClassName('hashtags')[0];
    var date = new Date();
    var newPost = new insertPost();
    var idRandom = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    newPost._id = idRandom();
    newPost.createdAt =  date.toString();
    newPost.createdBy = loggedUser;
    newPost.source = source.value;
    newPost.likes = [];
    newPost.description = description.value;
    newPost.hashtags = hashtags.value;
    newPost.comments = [];

    posts.push(newPost);
    
    var newhtmlpost = docHtml(newPost);
    
    feed.innerHTML += docHtml(newPost);
    

    

};


  
//esegue il codice una volta che si è caricata la pagina
window.addEventListener('DOMContentLoaded', function() {
    var feed = document.getElementById("feed");
    
    
   

    
    //inserisce in html la finestra per caricare il post
    feed.innerHTML = 
    `<div class="bottom-sheet">
        <form class="insert-post" onsubmit="return false">
            <label>Source<input class="source" type="text"></label>
            <label>Description<input class="description" type="text"></label>
            <label>Hashtags<input class="hashtags" type="text"></label>
            <input class="submit-post" type="submit" onclick="newPost()"/>
        </form>
        

    </div>`;


    

    //per ogni elemento dell'array crea il post html
    posts.map(ele => feed.innerHTML += docHtml(ele));
    
   
    
  

    
});


