<template>
<div class="signup">
  <div class="d-flex justify-content-center py-4 py-sm-2 py-md-1">
    <img :src="require('../assets/logo.png')" alt="logo groupomania" class="col-10 col-sm-8 col-md-6 col-lg-4"/>
  </div>
  <div class="container pt-5 pb-3">
    <div class="row d-flex justify-content-center">
      <div class="col-8 col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body text-center">
            <form>
              <div class="d-flex justify-content-center">
              <img src="http://localhost:3000/images/avatar.png" alt="avatar" class="w-50 w-md-25 mb-3"/>
            </div>
              <div class="input-group d-flex flex-align-item mb-1">
                <span class="input-group-text" id="basic-addon1" style="background-color:#F9D3D2; color:#EC3E1B;"><i class="bi bi-person"></i></span>
                <input type="username" class="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="username">
              </div>
              <div class="input-group d-flex flex-align-item my-1">
                <span class="input-group-text" id="basic-addon1" style="background-color:#F9D3D2; color:#EC3E1B;"><i class="bi bi-envelope"></i></span>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@mail.com">
              </div>
              <div class="input-group d-flex flex-align-item my-1">
                <span class="input-group-text" id="basic-addon1" style="background-color:#F9D3D2; color:#EC3E1B;"><i class="bi bi-lock"></i></span>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="password">
              </div>
              <div class="input-group d-flex flex-align-item mb-4">
                <span class="input-group-text" id="basic-addon1" style="background-color:#F9D3D2; color:#EC3E1B;"><i class="bi bi-chat-dots"></i></span>
                <input type="bio" class="form-control py-4" id="exampleInputbio1" aria-describedby="bioHelp" placeholder="bio">
              </div>

              <nav class="d-flex justify-content-center my-2">
                <router-link to="/home"> 
                  <button type="submit" class="btn btn-primary">Inscription</button>
                </router-link>
              </nav>
              <router-view/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-8 col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body text-center">
            <nav>
              <router-link to="/login" class="link">Vous avez un compte ? <strong>Connectez-vous</strong></router-link>
            </nav>
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>