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
          <h1 class="ma-2" align="center" justify="center">Registrarse</h1>
          <v-form
            class="mx-15"
            ref="form"
            @submit.prevent="checkRegister"
            id="check-login-form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="nombre"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="apellido"
              :rules="apellidoRules"
              label="Apellido"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              :rules="passwordRules"
              hint="Minimo 5 caracterees"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <!-- Botones Validar/Resetear -->
            <div class="my-5">
              <v-btn
                type="submit"
                form="check-login-form"
                class="mx-2"
                :disabled="!valid"
                color="success"
                @click="submitRegistro"
              >
                Validar y enviar
              </v-btn>

              <v-btn class="mx-2" color="error" @click="reset">
                Resetear Datos
              </v-btn>
            </div>
            <!-- <v-btn type="submit" color="success" form="check-login-form"
              >Registrarse</v-btn
            > -->
          </v-form>
          <div class="my-5">
            <v-btn class="ma-2" align="center" justify="space-around" to="/"
              >Home</v-btn
            >
            <v-btn
              class="ma-2"
              align="center"
              justify="space-around"
              to="/Login"
              >Volver a Login</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",

  components: {},
  data() {
    return {
      show1: false,
      valid: true,
      password: "",
      nombre: "",
      apellido: "",
      email: "",
      role: 0,
      nombreRules: [(v) => !!v || "El nombre es obligatorio"],
      apellidoRules: [(v) => !!v || "El apellido es obligatorio"],
      passwordRules: [
        (v) => !!v || "La contraseña es obligatoria",
        (v) =>
          v.length >= 5 || "La contraseña debe tener al menos 5 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "Por favor ingrese un e-mail valido",
      ],
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      console.log("Validado!");
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submitRegistro() {
      /* Validar */
      this.$refs.form.validate();
      console.log("Validado!");
      //submit vue form
      if (this.email.endsWith("@edu.com.ar")) {
        // SE LE AÑADE EL ROL "EDUCATIVO" de INT 1
        console.log("Es educativo");
        this.role = 1;
      } else {
        console.log("Es invitado");
        this.role = 0;
      }

      return false;
    },
  },
};
</script>
