<template>
<div class="profile">
  <div class="card d-flex flex-row" style="border:none">
    <div class="d-flex justify-content-between py-4 px-2 px-md-4">
      <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-6 col-sm-4 col-md-3 col-lg-2"/>
    </div>
    <div class="d-flex justify-content-between py-4 px-4 px-md-4">
      <i class="bi bi-mailbox" style="font-size: 2rem;"></i>
    </div>
  </div>

  <div class="fixed-bottom position-absolute">
      <div class="card body" style="border:1px solid rgba(0,0,0,.125); border-radius: 20px 20px 0 0">
      <div class="d-flex justify-content-around">
          <nav>
          <router-link to="/home" class="link">
      <div class="d-flex flex-row"><i class="bi bi-globe" style="font-size: 1.8rem; color:#F9D3D2"></i></div>
          </router-link>
          </nav>
          <nav>
          <router-link to="/profil" class="link">
      <div class="d-flex flex-row d-flex justify-content-center"><i class="bi bi-person-circle" style="font-size: 1.8rem;"></i></div>
          </router-link>
          </nav>
          <nav>
          <router-link to="/login" class="link">
      <div class="d-flex flex-row"><i class="bi bi-x-circle" style="font-size: 1.8rem; color:#EC3E1B"></i></div>
          </router-link>
          </nav>
          <router-view/>
      </div>
    </div>
  </div>
    
<section class="vh-100">
  <div class="container h-100 pt-4">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-11 col-md-8 col-xl-6">
          <div class="text-end mx-2">
            <i class="bi bi-gear-wide-connected" style="font-size: 1.5rem;"></i>
          </div>
          <div class="card-body text-center">
            <div class="mb-4">
              <img
              src="http://localhost:3000/images/avatar.png"
              class="rounded-circle img-fluid" style="width: 100px;"/>
            </div>

            <h2 class="mb-2">Username</h2>
            <p class="text-muted mb-4">@role <span class="mx-2">|</span><a href="#!">email@mail.com</a></p>
            <div class="mb-4 pb-2">
              <h3>Bio</h3>
              <p>Text</p>
            </div>
            <button type="button" class="btn btn-primary btn-rounded btn-lg">
              Message now
            </button>

            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="mb-2 h5">0</p>
                <p class="text-muted mb-0">Posts</p>
              </div>
              <div class="px-3">
                <p class="mb-2 h5">0</p>
                <p class="text-muted mb-0">Likes</p>
              </div>
              <div>
                <p class="mb-2 h5">0</p>
                <p class="text-muted mb-0">Dislikes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</div>
</template>