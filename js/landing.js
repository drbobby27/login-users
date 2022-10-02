new Vue({   
    el: '#app',
    data: {
        error: false,
        users: [],

    },
    created(){
       
    },
    methods: {
        setterLocalStorage(key, data){
            localStorage.setItem(key, JSON.stringify(data));
        },
        getParsedLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key) || "[]");
        },
        validateInputs(){
            error = false;
          if (typeof this.username !== 'string' || this.username === "" ){
              this.errors.username = true;
              error= true
           }
           else {
            this.errors.username = false;
          }if (this.password === ""){
            this.errors.password = true;
            error= true
         }
         else {
          this.errors.password = false;
        }
           return error;
        },
        validateFormLogin(user,key){
        this.validateInputs() ? this.error : this.loginUser(user,key)
        },
        message(title, timer, position, text, button) {
        swal({
          position,
          text,
          icon: "success",
          title,
          dangerMode: false,
          timer,
          button,
        });
     },
     deleteAlert(item) {
        swal({
            title: "¿Está seguro de eliminar?",
            text: "¡Este proceso es irreversible!",
            icon: "warning",
            buttons: true,
            dangerMode: true
          }).then((result) => {
            if (result) {
              this.consolidationLiquidations.splice(this.consolidationLiquidations.indexOf(item), 1)
              this.message(
                "Se eliminó correctamente",
                2000,
                "center",
                "¡Los cambios fueron guardados!"
              )
              this.setLocalStorageData(this.STORAGE_KEY, this.consolidationLiquidations)
            }
          })
    }
    }
})