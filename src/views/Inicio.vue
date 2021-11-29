<template>
  <v-container id="container_inicio" fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="4">
        <v-card
          class="d-flex flex-column align-center justify-center"
          min-height="300"
          min-width="500"
        >
          <img src="../assets/flux_icon.svg" style="height: 50px" alt="" />
          <h1 class="my-4">Sistema Flux</h1>
          <v-btn
            class="ma-5"
            style="height: 50px"
            outlined
            color="indigo"
            align="center"
            justify="center"
            to="/Login"
            >Ingresar</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  components: {},
};
</script>

<style>
template {
  background: #000000;
}

#container_inicio {
  /* background: center no-repeat
    url("https://cdn.motor1.com/images/mgl/n0enG/s1/back-to-the-future-delorean-on-ebay.jpg"); */
  background-color: black;
}

#container_inicio::before {
  content: "";
  background-image: url("https://cdn.motor1.com/images/mgl/n0enG/s1/back-to-the-future-delorean-on-ebay.jpg");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.45;
}
</style>