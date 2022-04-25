<template>
<div class="comment">
    <div class="d-flex flex-row align-items-center">
        <img :src="user.avatar" alt="avatar" class="img-fluid border rounded-circle comment-avatar me-1"/>
        <div class="position-relative w-100 d-flex flex-row">
        <textarea v-model="comment.comment" placeholder="Écrivez un commentaire..." 
        class="form-control border rounded-pill comment-textarea overflow-auto"></textarea>
        <i class="bi bi-send-check position-absolute end-0 pe-2 py-2 comment-send" @click="posted(comment)"></i>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    data() {
      return {
          user: "",
          comment: {
              comment: '',
        },
      }
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
    posted() {
        let fd = new FormData();
        fd.append('comment',this.comment.comment),
        axios
        .post("http://localhost:3000/api/comment", fd, {
                headers: { Authorization: "Bearer " +localStorage.getItem("authToken"),'Content-Type': 'multipart/form-data'}, 
            })
            .then((response) => (this.comment = response.data.comment,
            this.$router.push({name: 'home'}).$router.go()))
            .catch((err) => console.log(err));
        }
    }
}
</script>