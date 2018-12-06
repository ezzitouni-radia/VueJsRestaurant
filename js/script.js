window.onload = init;

function init() {
  new Vue({
    el: "#app",
    data: {
      nom: "",
      cuisine: "",

      restaurants: [],

      page: 1,
      pagesize: 10,
      name: "",

      nbrPage: 0,
      nbrestaurant: 0,
      nomRecherche: "",

      idd: ""
    
    },

    mounted() {
      console.log("AVANT RENDU HTML");
      this.getRestaurantsFromServer();
    },

    methods: {
      getRestaurantsFromServer() {
        let url =
          "http://localhost:8080/api/restaurants?page=" +
          this.page +
          "&pagesize=" +
          this.pagesize +
          "&name=" +
          this.nomRecherche +
          this.name;

        fetch(url)
          .then(responseJSON => {
            responseJSON.json().then(responseJSON => {
              // Maintenant res est un vrai objet JavaScript
              //  afficheReponseGET(res);
              this.restaurants = responseJSON.data;
              this.nbrestaurant = responseJSON.count;
              this.nbrPage = responseJSON;
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

    

      premierepage() {
        this.page = 0;
        this.getRestaurantsFromServer();
      },

      precedentMeth() {
        if (this.page !== 1) {
          this.page--;
          this.getRestaurantsFromServer();
        }
      },

      SuivantMeth() {
        if (this.page < this.pagesize) {
          this.page++;
          this.getRestaurantsFromServer();
        }
      },

      dernierepage() {
        this.page = this.nbrPage;
        this.getRestaurantsFromServer();
      },

      supprimerRestaurant(id) {
        let url = "http://localhost:8080/api/restaurants/" + id;
        fetch(url, {
          method: "DELETE"
        })
          .then(responseJSON => {
            responseJSON.json().then(res => {
              console.log("Restaurant supprimé");
              this.getRestaurantsFromServer();
            });
          })
          .catch(function(err) {
            console.log(+err);
          });
      },

      ajouterRestaurant(event) {
        event.preventDefault();

        let formulaire = event.target;
        let dataFormulaire = new FormData(formulaire);
        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: dataFormulaire
        })
          .then(responseJSON => {
            responseJSON.json().then(responseJS => {
              console.log(responseJS.msg);
              console.log(dataFormulaire);
              this.getRestaurantsFromServer();

              this.name = "";
              this.cuisine = "";
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      modifierRestaurant(event) {
        event.preventDefault();

        let formulaire = event.target;
        let dataFormulaire = new FormData(formulaire);
        let id = document.querySelector("#idd").value;

        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url, {
          method: "PUT",
          body: dataFormulaire
        })
        .then(responseJSON => {
            responseJSON.json().then(responseJS => {
              console.log(responseJS.msg);              
              this.name = "";
              this.cuisine = "";
              this.idd = "";
              this.getRestaurantsFromServer();
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      RecupMeth: function(event) {
        let id = document.querySelector("#idd").value;
        if (id) this.modifierRestaurant(event);
        else this.ajouterRestaurant(event);
      },

      getRequest4(id) {
        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url)
          .then(responseJSON => {
            responseJSON.json().then(responseJSON => {
              // Maintenant res est un vrai objet JavaScript
              this.name=responseJSON.restaurant.name;
              this.cuisine=responseJSON.restaurant.cuisine;
              this.idd=responseJSON.restaurant._id;

            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      
    }
  });
}
