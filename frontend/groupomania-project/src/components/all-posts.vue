<template>
<div class="posts">
    <!-- Posts -->
  <div class="container p-3" v-for="post in posts" :key="post.id">
  <div class="mb-3">
    <div class="card col-md-8 col-lg-7 col-xl-6 mx-auto">
        <div class="card-body">
        <div class="d-flex flex-row">
            <img :src="post.User.avatar" alt="avatar" class="img-fluid border rounded-circle avatar"/>
            <div class="ps-1">
                <div class="d-flex flex-row">
            <p class="ms-2 me-1 fs-6 my-auto fw-bold font-title">{{post.User.firstname}}</p>
            <p class="fs-6 my-auto fw-bold font-title">{{post.User.lastname}}</p>
                </div>
            <p class="ms-2 fs-6">{{dateTime(post.createdAt, post.updatedAt)}}</p>
            </div>
            <div class="btn-group dropstart ms-auto bd-highlight btn-update-post" v-if="post.User.lastname == user.lastname || user.admin === true">
                <i class="bi bi-sliders" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu rounded shadow-sm border-light text-center">
                    <li><a class="dropdown-item rounded font-btn btn-post-update">
                        <router-link :to=" {name: 'updatePost', params:{id:post.id}}">Modifier le post</router-link></a></li>
                    <li><a class="dropdown-item rounded font-btn btn-post-delete" @click="deletePost(post, post.id)">Supprimer le post</a></li>
                </ul>
            </div>
        </div>
            <h1 class="d-flex justify-content-center font-title fw-bold fs-3">{{post.title}}</h1>
            <img :src="post.imageURL" class="img-fluid rounded shadow-sm w-100">
            <h2 class="pb-4 pt-3 px-4 fs-5">{{post.content}}</h2>
        <div class="d-flex flex-row bd-highlight">
        <div class="card-body d-flex flex-row border-bottom p-0 col">
            <i class="bi bi-hand-thumbs-up-fill me-1 mb-1 px-1 text-primary like" v-if="post.Likes != 0">{{post.Likes.length}}</i>
            <i class="bi bi-hand-thumbs-down-fill me-1 mb-1 px-1 text-danger dislike" v-if="post.Dislikes != 0">{{post.Dislikes.length}}</i>
       </div>
        <!-- Likes/Comment/Dislikes -->
        </div>
        <div class="d-flex flex-row col border-bottom">
            <div class="d-flex justify-content-center rounded col w-100 py-2 likes-btn" @click="likePost(post, user, post.id)">
            <i class="bi bi-hand-thumbs-up mx-1 my-auto text-secondary"></i>
            <p class="my-auto text-secondary font-btn">J'aime</p>
            </div>
            <div class="d-flex justify-content-center rounded col w-100 py-2 comment-btn" @click='newcomment = !newcomment'>
            <i class="bi bi-chat-dots mx-1 my-auto text-secondary"></i>
            <p class="my-auto text-secondary font-btn">Commenter</p>
            </div>
            <div class="d-flex justify-content-center rounded col w-100 py-2 dislikes-btn" @click="dislikePost(post, user, post.id)">
            <i class="bi bi-hand-thumbs-down mx-1 my-auto text-secondary"></i>
            <p class="my-auto text-secondary font-btn">Je n'aime pas</p>
            </div>
        </div>

        <!-- New Comment -->
        <div class="comment" v-show='newcomment'>
            <div class="d-flex flex-row align-items-center py-2">
                <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle comment-avatar me-1"/>
             <div class="position-relative w-100 d-flex flex-row">
                <textarea v-model="comment.comment" placeholder="Écrivez un commentaire..." 
                class="form-control border rounded-pill comment-textarea overflow-auto"></textarea>
                <i class="bi bi-send-check position-absolute end-0 pe-2 py-2 comment-send" @click="postedComment(comment, post.id)"></i>
            </div>
            </div>
        </div>
        <!-- Comments -->
        <div class="comments">
            <div class="pt-3 pb-1" v-for="comment in post.Comments" :key="comment.id">
            <div class="d-flex flex-row me-2">
                <img :src="comment.User.avatar" alt="avatar" class="img-fluid border rounded-circle comment-avatar"/>
            <div class="card w-100 comment-card ms-1 px-1">
                <div class="d-flex flex-row mt-1">
                    <p class="ms-2 me-1 fs-6 my-auto fw-bold font-title">{{comment.User.firstname}}</p>
                    <p class="fs-6 my-auto fw-bold font-title">{{comment.User.lastname}}</p>
                </div>
                <textarea class="px-2 comment-card" v-model="comment.comment" 
                v-if="comment.User.lastname == user.lastname"></textarea>
                <p class="px-2 comment-card" v-else>{{comment.comment}}</p>
            </div>
            </div>
            <div class="d-flex flex-row" v-if="comment.User.lastname == user.lastname || user.admin == true">
                <a class="ms-5 comment-update" @click="updateComment(comment, comment.id, postId)">modifier</a>
                <a class="mx-2 comment-delete" @click="deleteComment(comment, postId)">supprimer</a>
                <p class="ms-2 fs-6 comment-time">{{dateFromNow(comment.createdAt, comment.updatedAt)}}</p>
            </div>
            <div v-else>
                <p class="ms-5 fs-6 comment-time">{{dateFromNow(comment.createdAt, comment.updatedAt)}}</p>
            </div>
        </div>
        </div>        
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from "axios"
import moment from 'moment'
export default {
    data() {
      return {
          user: "",
          posts:[],
            comment: { 
                comment:''
            },
          newcomment: false,
      };
    },
created() {
    axios
        .get("http://localhost:3000/api/auth/user", {
                headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
            })
            .then((response) => (this.user = response.data.user))
            .catch((err) => console.log(err));
    
    axios
        .get("http://localhost:3000/api/post/allPosts/" +localStorage.getItem("id"), {
        headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.posts = response.data.posts))
        .catch((err) => console.log(err));
},

methods: {
    //Méthode pour formater le temps de création ou de mise à jour des posts
    dateTime(createdAt, updatedAt) {   
        moment.locale('fr')
        if(updatedAt != createdAt)return `Mise à jour le: ${moment(updatedAt).format('D MMMM YYYY, LT')}`
        else return moment(createdAt).format('D MMMM YYYY, LT');
    },
    deletePost(post) {
        axios
            .delete("http://localhost:3000/api/post/" +post.id, {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
            })
            .then((response) => (this.post = response.data.post))
            this.$router.go()
            .catch((err) => console.log(err));
    },

    postedComment(comm, idpub) {
        console.log(comm.comment)
        console.log(idpub)
        let fd = new FormData();
        fd.append('comment', comm.comment);
        fd.append('postId', idpub);
       
        axios
        .post("http://localhost:3000/api/comment/", fd, {
                headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'}, 
            })
            .then((response) => (this.comment = response.data.comment,
            this.$router.go()))
            .catch((err) => console.log(err));
        },

    dateFromNow(createdAt, updatedAt) {   
        moment.locale('fr')
        if(updatedAt != createdAt) return `Mise à jour ${moment(updatedAt).fromNow()}`; 
        else return moment(createdAt).fromNow();    
    },

    updateComment(comment) {
        let fd = new FormData();
        fd.append('comment', comment.comment);
        
    axios
      .put("http://localhost:3000/api/comment/" +comment.id, fd, {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'}, 
        })
        .then((response) => (this.comment = response.data.comment,
        this.$router.go()))
        .catch((err) => console.log(err));
    },

    deleteComment(comment) {
    axios
        .delete("http://localhost:3000/api/comment/" +comment.id, {
        headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.comment = response.data.comment, 
        this.$router.go()))
        .catch((err) => console.log(err));
    },

    likePost(post, user) {
        axios
         .post("http://localhost:3000/api/post/" +post.id+ "/likes", user, {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
            })
            .then((response) => (this.Likes = response.data.Likes,
            this.$router.go()))
            .catch((err) => console.log(err));
    },

    dislikePost(post, user) {
        axios
         .post("http://localhost:3000/api/post/" +post.id+ "/dislikes", user, {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
            })
            .then((response) => (this.Dislikes = response.data.Dislikes,
            this.$router.go()))
            .catch((err) => console.log(err));
    }
}}
</script>
