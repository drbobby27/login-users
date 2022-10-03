new Vue({   
    el: '#app',
    data: {
        error: false,
        storeDataFromApi: [],
        parsedData: [],
        justCredentialsArray: [],
        username: "",
        password: "",
        errors: {
            username: false,
            password: false
        },
        USERS_FETCHED_KEY: 'users_fetched_and_filtered',
        LOGUED_USER_KEY: 'user_logued'
    },
    created(){
        this.fetchingApi()
        this.justCredentialsArray = this.getParsedLocalStorage(this.USERS_FETCHED_KEY)
    },
    methods: {
        setterLocalStorage(key, data){
            localStorage.setItem(key, JSON.stringify(data))
        },
        getParsedLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key) || "[]")
        },
        message(icon,title, timer, position, text, button) {
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
        messageSuccessLogin(){
            this.message(
                "success", 
                "¡Enhorabuena!",
                2000,
                "center",
                "¡Login exitoso!",
                false)
            
            setTimeout(() => window.location.href = "../views/landing-page.html", 2001)
        },
        async  fetchingApi (client= 10) {
            try{
                const URL =  'https://randomuser.me/api/?results='
                const request = await fetch(`${URL}${client}`)
                const response = await request.json()
                
               this.setterLocalStorage(this.USERS_FETCHED_KEY, this.storeDataFromApi = response.results.map(user => ({
                    username: user.login.username,
                    password:  user.login.password,
                    gender: user.gender,
                    email: user.email,
                    img: user.picture.medium,
                    name: user.name.first,
                    lastname: user.name.last,
                    city: user.location.city
                }) ))
                
            } catch(error) {
                console.log(error)
            }
            this.dataInput =  ""
        },
        loginUser(user,key){
           
            let loguedUser = [];
            let session = this.storeDataFromApi.filter(
             (({username, password})  => username === user && password === key)
             )
             loguedUser = [...session]
             this.setterLocalStorage(this.LOGUED_USER_KEY,loguedUser )

             this.password = ""
             this.username = ""

            return loguedUser.length === 0
            ?
            this.message(
            "warning",
            "Oops",
            2200,
            "center",
            "Verifique que los datos sean correctos",
            false
            )
            : 
            this.messageSuccessLogin()
        },
        validateInputs(){
            error = false;
          if (typeof this.username !== 'string' || this.username === "" ){
              this.errors.username = true;
              error= true
           }
           else {
            this.errors.username = false
          }if (this.password === ""){
            this.errors.password = true
            error= true
         }
         else {
          this.errors.password = false
        }
           return error
        },
        validateFormLogin(user,key){
        this.validateInputs() ? this.error : this.loginUser(user,key)
        }
    }
})