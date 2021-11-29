<template>
  <v-container id="container_inmuebles" fill-height fluid>
    <v-row class="justify-center align-center">
      <v-col>
        <v-card
          class="d-flex flex-column align-center justify-center"
          min-width="700"
          min-height="1000"
        >
          <h1 class="display-1 ma-1 mb-4">
            👇🏽 Viendo artefactos de inmueble 👇🏽
          </h1>
          <!-- <h2>test</h2> -->
          <br />
          <v-card class="d-flex flex-column my-6" min-width="950">
            <v-card-title> Artefactos a gas 🔥 </v-card-title>
            <v-data-table
              :headers="headers"
              :items="artefactos_gas"
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
                    <span class="font-weight-regular">
                      Acciones sobre el artefacto:
                    </span>
                    <span class="inline font-weight-bold">{{ item.name }}</span>
                  </h3>
                  <div
                    class="
                      d-flex
                      mt-5
                      mb-3
                      mx-2
                      px-2
                      justify-center
                      align-center
                    "
                  >
                    <v-btn class="mx-2">Simular consumo gas 🔥</v-btn>
                    <v-btn class="mx-2">Ver/Editar artefacto</v-btn>
                  </div>
                  <div
                    class="d-flex my-3 mx-2 px-2 justify-center align-center"
                  >
                    <v-btn class="mx-2">Eliminar artefacto</v-btn>
                  </div>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <v-card class="d-flex flex-column my-6" min-width="950">
            <v-card-title> Artefactos electricos ⚡ </v-card-title>
            <v-data-table
              :headers="headers"
              :items="artefactos_luz"
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
                    <span class="font-weight-regular">
                      Acciones sobre el artefacto:
                    </span>
                    <span class="inline font-weight-bold">{{ item.name }}</span>
                  </h3>
                  <div
                    class="
                      d-flex
                      mt-5
                      mb-3
                      mx-2
                      px-2
                      justify-center
                      align-center
                    "
                  >
                    <v-btn class="mx-2" disabled
                      >Simular consumo electricidad ⚡</v-btn
                    >
                    <v-btn class="mx-2">Ver/Editar artefacto</v-btn>
                  </div>
                  <div
                    class="d-flex my-3 mx-2 px-2 justify-center align-center"
                  >
                    <v-btn class="mx-2">Eliminar artefacto</v-btn>
                  </div>
                </td>
              </template>
            </v-data-table>
          </v-card>

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
                <v-btn
                  class="ma-2"
                  align="center"
                  justify="space-around"
                  to="/Inmuebles"
                  >Volver a Inmuebles</v-btn
                >

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
                      Añadir artefacto
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
                                  label="Nombre del artefacto"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-select
                                  v-model="nuevo_item_categorias"
                                  :items="nuevo_item_categorias_opciones"
                                  :rules="[
                                    (v) => !!v || 'La categoria es obligatoria',
                                  ]"
                                  label="Categoria del artefacto"
                                  required
                                ></v-select>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_consumo"
                                  type="number"
                                  label="Ingrese consumo (kw/h)"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_usodiario"
                                  type="number"
                                  label="Ingrese uso diario del artefacto (hs)"
                                  required
                                ></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field
                                  v-model="nuevo_item_calorresidual"
                                  type="number"
                                  label="Ingrese calor residual del artefacto (kw/h)"
                                  required
                                ></v-text-field>
                              </v-row>
                              <!--  <v-row>
                                <v-text-field
                                  v-model="nuevo_item_ambiente"
                                  label="Ingrese ambiente del artefacto"
                                  required
                                ></v-text-field>
                              </v-row> -->
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
export default {
  name: "Artefactos",

  data() {
    return {
      /* FORMULARIO DATOS */
      nuevo_item_name: "",
      nuevo_item_categorias_opciones: ["luz", "gas"],
      nuevo_item_categorias: "",
      nuevo_item_email: "",
      nuevo_item_consumo: 0,
      nuevo_item_usodiario: 0,
      nuevo_item_calorresidual: 0,
      nuevo_item_ambiente: "",
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
          width: "210px",
        },
        { text: "Categoria", sortable: false, value: "categoria" },
        { text: "Consumo (kw/h)", sortable: false, value: "consumo" },
        { text: "Uso diario (hs)", sortable: false, value: "uso_diario" },
        { text: "Meses de uso", sortable: false, value: "meses_uso" },
        { text: "Calor residual", sortable: false, value: "calor_residual" },
        { text: "Ambiente", sortable: false, value: "ambiente" },
        { text: "", sortable: false, value: "data-table-expand" },
      ],
      artefactos: [
        {
          name: "Estufa",
          categoria: "gas",
          consumo: 108,
          uso_diario: 4,
          meses_uso: 7,
          calor_residual: 8,
          ambiente: "Planta baja",
        },
        {
          name: "Aire acondicionado",
          categoria: "luz",
          consumo: 408,
          uso_diario: 2,
          meses_uso: 3,
          calor_residual: 8,
          ambiente: "Planta alta",
        },
      ],
      artefactos_luz: [],
      artefactos_gas: [],
    };
  },
  created() {
    this.artefactos_gas = this.artefactos.filter(
      (artefacto_item) => artefacto_item.categoria === "gas"
    );
    this.artefactos_luz = this.artefactos.filter(
      (artefacto_item) => artefacto_item.categoria === "luz"
    );
    /* console.log("🔥🔥🔥", this.artefactos_gas);
    console.log("⚡⚡⚡", this.artefactos_luz); */
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
<style scoped>
#container_inmuebles {
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