<template>
  <div id="app">

  <b-container>
    <b-row align-h="center">

      <section v-if="errored">
        <p>Lo sentimos, hubo un error. Contactese con el administador.</p>
      </section>

      <section v-else>
        <div v-if="loading">Cargando...</div>
          <div v-else>
            
            <h3 class="fuente">Superhéroes</h3>
            
            <div class="m-3">
              <label for="buscar">Ingrese nombre: </label>            
              <input type="text" v-model="search" id="buscar">
            </div>
            
            
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
const axios = require('axios');

export default {
  name: 'app',
  data () {
    return {
      msg: 'hola',
      loading:true,
      errored:false,
      search:''
    }
  },
  mounted () {
    axios
      .get('http://157.245.138.232:9091/api/v1/test/superheroes',{ params: { puedeVolar: true } })
      .then(response => (this.msg = response.data.data))
      .catch(error => {
      console.log(error)
      this.errored=true
      })
      .finally(() => this.loading=false)
  },
  computed: {
    filteredItems() {
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
