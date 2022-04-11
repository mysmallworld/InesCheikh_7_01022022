<template>
<div class="post">
    <div class="container pt-2">
    <div class="card col-md-8 col-lg-6 mx-auto">
        <div class="card-body">
        <div class="d-flex flex-row">
            <img src="http://localhost:3000/images/avatar.png" alt="avatar" style="width: 2rem;"/>
            <p class="ms-2 me-1 fs-6 my-auto">{{user.firstname}}</p>
            <p class="fs-6 my-auto">{{user.lastname}}</p>

            <div class="btn-group dropstart ms-auto bd-highlight">
                <i class="bi bi-sliders2" data-bs-toggle="dropdown" aria-expanded="false" ></i>
                <ul class="dropdown-menu rounded shadow-sm border-light text-center">
                    <li><a class="dropdown-item font-btn" href="#">Modifier le post</a></li>
                    <li><a class="dropdown-item font-btn" href="#">Supprimer le post</a></li>
                </ul>
            </div>
        </div>
            <p class="p-2">{{post.title}}</p>
            <p class="p-2">{{post.content}}</p>
            <img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="post" class="img-fluid rounded shadow-sm w-100"> 
        <div class="d-flex flex-row">
        <div class="card-body d-flex flex-row border-bottom p-0 my-2">
            <i class="bi bi-hand-thumbs-up me-1 mb-1 px-1 border rounded-circle"></i>
            <i class="bi bi-hand-thumbs-down mb-1 px-1 border rounded-circle"></i>
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
</template>

<script>
export default {

}
</script>