<template>
<div class="post">
    <Nav/>
<div class="container pt-2" v-for="post in posts" :key="post.id">
    <div class="card col-md-8 col-lg-6 mx-auto">
        <div class="d-flex flex-row border-bottom pb-4">
            <h2 class="d-flex justify-content-center w-100 position-absolute mt-2 pt-2 fs-4 font-title">Modifier une publication</h2>
            <i class="bi bi-x-circle-fill fs-4 ms-auto me-1 close-post" @click="close()"></i>
        </div>
        <div class="d-flex flex-row pt-2">
        <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle avatar mx-2"/>
        <div class="ps-1">
                <div class="d-flex flex-row">
            <p class="ms-2 me-1 fs-6 my-auto fw-bold font-title">{{user.firstname}}</p>
            <p class="fs-6 my-auto fw-bold font-title">{{user.lastname}}</p>
                </div>
        </div>
            </div>
            <textarea class="form-control textarea-post mb-2 fw-bold font-title fs-4 text-center" v-model="post.title" placeholder="Nouveau titre"></textarea>
            <textarea class="form-control textarea-post mb-2" v-model="post.content" placeholder="Nouveau contenu"></textarea>
            <img :src="post.imageURL" class="img-fluid rounded shadow-sm mx-2">
            <div class="file btn border rounded-pill my-2 mx-auto btn-select-file">
            <div class="d-flex flex-row justify-content-center">
			<p class="fw-bolder font-title fs-6 text-file my-2 mx-3">
                Modifier le fichier de votre publication
            <i class="bi bi-images ms-3 my-auto icon-file">
                <input type="file" name="file" class="btn-file" @change="onFileSelected"/>
            </i></p>
            </div>
			</div>
            <div class="alert alert-success my-2 mx-4 text-center" role="alert" v-if="selectFileName">
                {{selectFileName}}
            </div>
            <button type="button" class="btn btn-secondary btn-lg btn-block m-2 btn-post" @click="updatePost(post)">Publication</button>
        </div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/home-nav.vue'
import axios from "axios"

export default {
    name: 'user-home',
    components: {
      Nav
    },
data() {
      return {
          user: "",
          posts:[],
          newPost:{
              title: "",
              content: "",
              newImageUrl: "",
          },
          selectedFile: null,
          selectFileName: ""
      };
},
 created(){
    axios
      .get("http://localhost:3000/api/auth/user", {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")}, 
        })
        .then((response) => (this.user = response.data.user))
        .catch((err) => console.log(err));
},

methods: {
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        this.name = event.target.files[0].name;
        this.selectFileName = 'Le fichier "' + this.name + '" a été sélectionné.';
    }, 
    updatePost(post) {
        let fd = new FormData();
        fd.append('image', this.selectedFile),
        fd.append('title',this.newPost.title),
        fd.append('content',this.newPost.content)
        
    axios
        .put("http://localhost:3000/api/post/" +post.id, fd, {
        headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'}, 
        })
        .then((response) => (this.newPost = response.data.newPost,
        this.$router.push({name: 'home'}).$router.go()))
        .catch((err) => console.log(err));
         
    },
    close() {
      this.$router.push({name: 'home'});
    },
}
}
</script>