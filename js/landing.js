new Vue({   
    el: '#app',
    data: {
        error: false,
        filteredUsers: [],
        currentLoguedUser: {},
        USERS_FETCHED_KEY: 'users_fetched_and_filtered',
        LOGUED_USER_KEY: 'user_logued',
        FILTERED_USERS_KEY:'users_filtered'

    },
    created(){
      this.users = this.getParsedLocalStorage(this.USERS_FETCHED_KEY) 
      this.currentLoguedUser = this.getParsedLocalStorage(this.LOGUED_USER_KEY) 

      this.filteredUser()

      console.log(this.users)
      console.log(this.currentLoguedUser)   
      console.log(this.filteredUsers);
    },
    methods: {
        setterLocalStorage(key, data){
            localStorage.setItem(key, JSON.stringify(data));
        },
        getParsedLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key) || "[]");
        },
        filteredUser(){
          this.filteredUsers = [...this.users.filter(user => user.username !== this.currentLoguedUser[0].username && user.password !== this.currentLoguedUser[0].password)]
          this.setterLocalStorage(this.FILTERED_USERS_KEY,this.filteredUsers)
        },message(icon,title, timer, position, text, button) {
          swal({
            position,
            text,
            icon,
            title,
            dangerMode: false,
            timer,
            button,
          })
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
              this.filteredUsers.splice(this.filteredUsers.indexOf(item), 1)
              this.message(
                "success",
                "Se eliminó correctamente",
                2000,
                "center",
                "¡Los cambios fueron guardados!",
                false
              )
                          
            }
            this.setterLocalStorage(this.FILTERED_USERS_KEY, this.filteredUsers) 
          })
        }
    }
})