<template>
  <v-container id="container_inmuebles" fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col>
        <v-card
          class="d-flex flex-column align-center justify-center"
          min-width="700"
          min-height="900"
        >
          <h1 class="display-1 ma-1 mb-4">Bienvenido al Sistema Flux 🏡</h1>
          <br />
          <v-data-table
            :headers="headers"
            :items="inmuebles"
            :items-per-page="50"
            item-key="name"
            class="elevation-1"
            hide-default-footer
            show-expand
            :single-expand="singleExpand"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td style="height: 200px" :colspan="headers.length">
                <h3 class="text-center">
                  Acciones sobre Inmueble: <strong>{{ item.name }}</strong>
                </h3>
                <div
                  class="d-flex mt-5 mb-3 mx-2 px-2 justify-center align-center"
                >
                  <v-btn class="mx-2">Simular consumo gas 🔥</v-btn>
                  <v-btn class="mx-2" disabled
                    >Simular consumo electricidad ⚡</v-btn
                  >
                </div>
                <div class="d-flex my-3 mx-2 px-2 justify-center align-center">
                  <v-btn class="mx-2">Ver artefactos</v-btn>
                  <v-btn class="mx-2">Eliminar inmueble</v-btn>
                  <v-btn class="mx-2" disabled>Ver historico</v-btn>
                </div>
              </td>
            </template>
          </v-data-table>
          <div class="mt-10 text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="red lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  transition="dialog-bottom-transition"
                >
                  Volver a inicio
                </v-btn>

                <v-dialog
                  v-model="dialog2"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Añadir Inmueble
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog2 = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        >Ingresa datos de nuevo artefacto</v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-list fill-height fluid>
                      <v-list-item
                        class="
                          d-flex
                          align-items-center
                          justify-items-center justify-center
                        "
                        min-width="900"
                      >
                        <!-- FORMULARIO 👇🏽👇🏽 -->
                        <v-form v-model="valid">
                          <v-container>
                            <v-col style="width: 500px">
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_name"
                                  label="Ingrese nombre del inmueble"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_direccion"
                                  label="Ingrese direccion del inmueble"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_antiguedad"
                                  type="number"
                                  label="Ingrese antiguedad del inmueble"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_habitantes"
                                  type="number"
                                  label="Ingrese numero de habitantes"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <!-- <v-text-field
                                  v-model="nuevo_item_ambiente"
                                  label="Ingrese ambiente del artefacto"
                                  required
                                ></v-text-field> -->
                              </v-row>
                              <v-row>
                                <v-btn
                                  color="error"
                                  class="mr-4"
                                  @click="reset"
                                >
                                  Resetear datos
                                </v-btn>
                                <v-btn
                                  :disabled="!valid"
                                  color="success"
                                  class="mr-4"
                                  @click="submit"
                                >
                                  Añadir
                                </v-btn>
                              </v-row>
                            </v-col>
                          </v-container>
                        </v-form>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-dialog>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  ¿Esta seguro que desea salir del sistema?
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="d-flex align-center justify-center my-2"
                    color="secondary lighten-2"
                    text
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    class="d-flex align-center justify-center my-2"
                    color="red lighten-2"
                    dark
                    to="/"
                  >
                    Salir
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue"; // in Vue 2
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "Inmuebles",

  components: {},

  data() {
    return {
      /* FORMULARIO DATOS */
      nuevo_item_name: "",
      nuevo_item_direccion: "",
      nuevo_item_consumo_gas: 0,
      nuevo_item_consumo_luz: 0,
      nuevo_item_antiguedad: 0,
      nuevo_item_habitantes: 1,
      nuevo_item_localidad_cp: 1900,
      /* OTROS DATOS */
      select: null,
      items: ["Ambiente 1", "Ambiente 2", "Ambiente 3", "Ambiente 4"],
      checkbox: null,
      dialog: false,
      dialog2: false,
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Direccion", sortable: false, value: "direccion" },
        { text: "Consumo Luz ⚡", sortable: false, value: "consumo_luz" },
        { text: "Consumo Gas 🔥", sortable: false, value: "consumo_gas" },
        { text: "Antiguedad (años)", sortable: false, value: "antiguedad" },
        { text: "Habitantes", sortable: false, value: "habitantes" },
        { text: "Localidad (CP)", sortable: false, value: "localidad" },
        { text: "", sortable: false, value: "data-table-expand" },
      ],
      inmuebles: [
        {
          name: "Casa",
          direccion: "Av 70 541",
          consumo_luz: 108 + " kw/h",
          consumo_gas: 108 + " kw/h",
          antiguedad: 4,
          habitantes: 7,
          localidad: 1900,
        },
        {
          name: "Negocio almacen",
          direccion: "Av 54 441",
          consumo_luz: 408 + " kw/h",
          consumo_gas: 408 + " kw/h",
          antiguedad: 2,
          habitantes: 3,
          localidad: 1900,
        },
        {
          name: "Negocio ferreteria",
          direccion: "Calle 13 1441",
          consumo_luz: 38 + " kw/h",
          consumo_gas: 58 + " kw/h",
          antiguedad: 6,
          habitantes: 2,
          localidad: 1900,
        },
        {
          name: "Segunda casa",
          direccion: "Calle 23 1341",
          consumo_luz: 383 + " kw/h",
          consumo_gas: 583 + " kw/h",
          antiguedad: 6,
          habitantes: 2,
          localidad: 1900,
        },
      ],
    };
  },
};
</script>

<style scoped>
#container_inmuebles {
  /* background: center no-repeat
    url("https://cdn.motor1.com/images/mgl/n0enG/s1/back-to-the-future-delorean-on-ebay.jpg"); */
  background-color: black;
}

#container_inmuebles::before {
  content: "";
  background-image: url("https://www.deplace.es/wp-content/uploads/2019/01/que-es-bien-inmueble.jpg");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.45;
}
</style>