<template>
  <div id="app">

  <b-container>
    <b-row align-h="center">

      <!--Esta sección contiene un mensaje para desplegar un mensaje en caso de
      no poder cargar los datos.-->
      <section v-if="errored">
        <p>Lo sentimos, hubo un error. Contactese con el administador.</p>
      </section>
      
      <section v-else>
        <!--Mensaje que se despliega mientras se realiza la carga de los datos-->
        <div v-if="loading">Cargando...</div>
          <div v-else>
            
            <h3 class="fuente">Superhéroes</h3>
            
            <!--Este input llena la variable search, que se utiliza para filtrar más abajo-->
            <div class="m-3">
              <label for="buscar">Ingrese nombre: </label>            
              <input type="text" v-model="search" id="buscar">
            </div>
            
            <!--Ciclo repetitivo que recorre los resultados de la API-->
            <div v-bind:key="heroes.id"  v-for="heroes in filteredItems">              
              
              <b-card no-body class="overflow-hidden border" style="max-width: 600px;">
                <b-row no-gutters>
                  <b-col md="5">
                    <b-card-img :src="heroes.avatarURL" alt="Imagen no disponible" class="imagen" ></b-card-img>
                  </b-col>
                  <b-col md="7">
                    <b-card-body :title="heroes.nombre">
                      <b-card-text>
                        {{heroes.nombreReal}}
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            
            </div>
          </div>                  
      </section>

    </b-row>      

  </b-container>   
    
  </div>
</template>

<script>
//Se inicializa la librería Axios para utilizar promesas para el servicio web
const axios = require('axios');

export default {
  name: 'app',
  //Se inicializan variables que serán usadas como estados
  data () {
    return {
      msg: '',
      loading:true,
      errored:false,
      search:''
    }
  },
  mounted () {
    axios
      //Ejecuta el serv. web
      .get('http://157.245.138.232:9091/api/v1/test/superheroes',{ params: { puedeVolar: true } })
      //Para obtener respuesta exitosa(código200)
      .then(response => (this.msg = response.data.data)) 
      //Para capturar cualquier tipo de error. Se muestra el error por consola y se cambia la variable "error"
      .catch(error => {
      console.log(error)
      this.errored=true
      })
      //Cuando se termine de ejecutar el servicio, cambia la variable loading
      .finally(() => this.loading=false)
  },
  //Computed se utiliza cuando un estado depende de otro. En este caso depende de search
  computed: {
    filteredItems() {
      //Toma la variable msg y filtra por lo que se escriba en el input search
      return this.msg.filter(item => {
         return item.nombre.indexOf(this.search) > -1
      })
    }
  }

}
</script>

<style>

.imagen{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 8px;
}

.fuente{
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}


  
</style>
