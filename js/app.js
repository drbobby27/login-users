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
        DATA_STORAGE_KEY: 'users-login'
    },
    created(){
        this.generateData()
        this.justCredentialsArray = this.getParsedLocalStorage(this.DATA_STORAGE_KEY)

    },
    methods: {
        loginUser(user,key){
            this.password = ""
            this.username = ""
           
            // let loguedUser = [];
            // let session = this.userCredentials.filter(
            //  (({position, pin})  => position === user && pin === key)
            //  );
            //  console.log(session);
            // loguedUser = [...session];
            // return loguedUser.length === 0
            // ? this.message(
            //     "Oops",
            //     2200,
            //     "center",
            //     "Verifique que los datos sean correctos",
            //     "error"
            //     )
            //       : 
            this.message("¡Enhorabuena!",
            2000,
            "center",
            "¡Login exitoso!",
            false)
        },
        setterLocalStorage(key, data){
            localStorage.setItem(key, JSON.stringify(data));
        },
        getParsedLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key) || "[]");
        },
        generateData(){
            this.fetchingApi()
        },
        async  fetchingApi (client= 10) {
            try{
                const URL =  'https://randomuser.me/api/?results='
                const request = await fetch(`${URL}${client}`)
                const response = await request.json()
                
               this.setterLocalStorage(this.DATA_STORAGE_KEY, this.storeDataFromApi = response.results.map(user => ({
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
                console.log(error);
            }
            this.dataInput =  ""
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
     }
    }
})