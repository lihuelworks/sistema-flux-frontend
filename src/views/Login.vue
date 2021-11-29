<template>
  <v-container id="container_inicio" fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="4">
        <v-card
          class="d-flex flex-column align-center justify-center"
          min-height="600"
          min-width="500"
          align="center"
          justify="center"
        >
          <h1 class="ma-2" align="center" justify="center">Login</h1>
          <!-- formulario -->
          <v-form class="mx-15" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Contraseña"
              required
            ></v-text-field>

            <v-btn
              class="mx-2"
              :disabled="!valid"
              color="success"
              @click="validate"
            >
              Validar
            </v-btn>

            <v-btn class="mx-2" color="error" @click="reset">
              Resetear Datos
            </v-btn>
          </v-form>
          <!-- botones -->
          <div class="my-4">
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              align="center"
              justify="center"
              to="/"
              >Volver a inicio</v-btn
            >
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              align="center"
              justify="center"
              to="/Register"
              >Registrarse</v-btn
            >

            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              align="center"
              justify="center"
              to="/Inmuebles"
              >Ingresar como invitado
            </v-btn>
          </div>
        </v-card>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
export default {
  name: "Login",

  components: {},
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Se necesita Nombre para ingresar",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Se necesita E-mail para ingresar",
      (v) => /.+@.+/.test(v) || "E-mail debe ser valido",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
