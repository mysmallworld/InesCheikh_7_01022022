<template>
  <div class="comments">
    <div class="pt-3 pb-1" v-for="comment in posts.Comments" v-bind:key="comment.id" :postId="post.id">
    <div class="d-flex flex-row me-2">
        <img :src="comment.User.avatar" alt="avatar" class="img-fluid border rounded-circle comment-avatar"/>
    <div class="card w-100 comment-card ms-1 px-1">
        <div class="d-flex flex-row mt-1">
            <p class="ms-2 me-1 fs-6 my-auto fw-bold font-title">{{comment.User.firstname}}</p>
            <p class="fs-6 my-auto fw-bold font-title">{{comment.User.lastname}}</p>
        </div>
        <textarea class="px-2 comment-card" v-model="comment.comment" 
        v-if="comment.User.lastname == user.lastname || user.admin == true"></textarea>
        <p class="px-2 comment-card" v-else>{{comment.comment}}</p>
    </div>
    </div>
    <div class="d-flex flex-row" v-if="comment.lastname == user.lastname || user.admin == true">
        <a class="ms-5 comment-update" @click="updateComment(comment)">modifier</a>
        <a class="mx-2 comment-delete" @click="deleteComment(comment)">supprimer</a>
        <p class="ms-2 fs-6 comment-time">{{dateTime(comment.createdAt, comment.updatedAt)}}</p>
    </div>
    <div v-else>
        <p class="ms-5 fs-6 comment-time">{{dateTime(comment.createdAt, comment.updatedAt)}}</p>
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
          comment:"",
          Comments:[],
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
},
methods: {
    //Méthode pour formater le temps  de création ou de mise à jour des posts
    dateTime(createdAt, updatedAt) {   
        moment.locale('fr')
        if(updatedAt != createdAt) return `Mise à jour ${moment(updatedAt).fromNow()}`; 
        else return moment(createdAt).fromNow();    
    },
    updateComment(comment) {
        let fd = new FormData();
        fd.append('comment', this.comment.comment)
        
    axios
      .put("http://localhost:3000/api/comment/" +comment.id, fd, {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'}, 
        })
        .then((response) => (console.log(response)))
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
    }
}
}
</script>