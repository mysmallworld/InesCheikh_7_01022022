<template>
<div class="post">
  <div class="container p-3">
  <div class="mb-3" v-for="post in posts" :key="post.id">
    <div class="card col-md-8 col-lg-7 col-xl-6 mx-auto">
        <div class="card-body">
        <div class="d-flex flex-row">
            <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle avatar"/>
            <div class="ps-1">
                <div class="d-flex flex-row">
            <p class="ms-2 me-1 fs-6 my-auto fw-bold font-title">{{user.firstname}}</p>
            <p class="fs-6 my-auto fw-bold font-title">{{user.lastname}}</p>
                </div>
            <p class="ms-2 fs-6">{{dateTime(post.createdAt, post.updatedAt)}}</p>
            </div>
            <div class="btn-group dropstart ms-auto bd-highlight btn-update-post" v-if="post.User.lastname == user.lastname || user.admin == true">
                <i class="bi bi-sliders" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul class="dropdown-menu rounded shadow-sm border-light text-center">
                    <li><a class="dropdown-item rounded font-btn btn-post-update">
                        <router-link :to=" {name: 'updatePost', params: { id: post.id }}">Modifier le post</router-link></a></li>
                    <li><a class="dropdown-item rounded font-btn btn-post-delete" @click="deletePost(post)">Supprimer le post</a></li>
                </ul>
            </div>
        </div>
        
            <h1 class="d-flex justify-content-center font-title fw-bold fs-3">{{post.title}}</h1>
            <img :src="post.imageURL" alt="image post" class="img-fluid rounded shadow-sm w-100">
            <h2 class="py-2 px-4 fs-4">{{post.content}}</h2>
        <div class="d-flex flex-row">
        <div class="card-body d-flex flex-row border-bottom p-0 my-2">
            <i class="bi bi-hand-thumbs-up-fill me-1 mb-1 px-1 text-primary like"></i>
            <i class="bi bi-hand-thumbs-down-fill me-1 mb-1 px-1 position-absolute text-danger dislike"></i>
        </div>
        </div>
        <div class="d-flex flex-row d-flex justify-content-between ms-auto py-1">
            <div class="d-flex justify-content-between">
            <i class="bi bi-hand-thumbs-up mx-1 my-auto text-primary"></i>
            <p class="my-auto text-primary font-btn">J'aime</p>
            </div>
            <div class="d-flex justify-content-between">
            <i class="bi bi-chat-dots mx-1 my-auto text-secondary"></i>
            <p class="my-auto text-secondary font-btn">Commenter</p>
            </div>
            <div class="d-flex justify-content-between">
            <i class="bi bi-hand-thumbs-down mx-1 my-auto text-danger"></i>
            <p class="my-auto text-danger font-btn">Je n'aime pas</p>
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
import moment from "moment"

export default {
    data() {
      return {
          user: "",
          posts:[],
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
        .get("http://localhost:3000/api/post/myPosts/" +localStorage.getItem("id"),{
        headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.posts = response.data.posts))
        .catch((err) => console.log(err));
},
methods: {
    //Methodes pour formater le temps  de creation ou mise a jour des posts
    dateTime(createdAt, updatedAt) {   
        moment.locale('fr')
        if(updatedAt != createdAt)return `Modifié le ${moment(updatedAt).format('D MMMM YYYY, LT')}`
        else return moment(createdAt).format('D MMMM YYYY, LT');
    },
    deletePost(post) {
    axios
        .delete("http://localhost:3000/api/post/" +post.id, {
        headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.post = response.data.post,
        this.$router.go()))
        .catch((err) => console.log(err));
    }
}
}
</script>
