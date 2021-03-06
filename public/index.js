/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      searchName: "",
      searchBio: "",
      sortAttribute: "name",
      sortAsc: true,
      people: [],
      newPerson: {name: "", bio: "", bioVisible: true}
    };
  },
  created: function() {
    axios.get("/people").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      var params = {
        name: this.newPerson.name,
        bio: this.newPerson.bio
      };
      axios.post("/people", params).then(function(response) {
        console.log("adding a person");
        this.people.push(response.data);
        this.newPerson = "";
      }.bind(this));
    },
    deletePerson: function(person) {
      console.log(person);
      var index = this.people.indexOf(person);
      console.log(index);
      this.people.splice(index, 1);
    },
    toggleBioVisible: function(person) {
      // if (person.bioVisible === true) {
      //   person.bioVisible = false;
      // } else {
      //   person.bioVisible = true;
      // }
      person.bioVisible = !person.bioVisible;
    },
    isValidPerson: function(inputPerson) {
      console.log("running isValidPerson");
      var validBio = inputPerson.bio.toLowerCase().includes(this.searchBio.toLowerCase());
      var validName = inputPerson.name.toLowerCase().includes(this.searchName.toLowerCase());
      return validBio && validName;
    },
    setSortAttribute: function(inputAttribute) {
      this.sortAsc = !this.sortAsc;
    },
    setMarker: function(thePlace, theMap) {
      var contentString = thePlace.description;

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: {lat: thePlace.latitude, lng: thePlace.longitude},
        map: theMap,
        title: 'Uluru (Ayers Rock)'
      });

      marker.addListener('click', function() {
        infowindow.open(theMap, marker);
      });
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var person1Attribute = person1[this.sortAttribute].toLowerCase();
        var person2Attribute = person2[this.sortAttribute].toLowerCase();
        if (this.sortAsc) {
          return person1Attribute.localeCompare(person2Attribute);
        } else {
          return person2Attribute.localeCompare(person1Attribute);
        }
      }.bind(this));
    }
  },
  mounted: function() {
    var uluru = {lat: -5.363, lng: 31.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });

    var places = [
      {latitude: 33.3, longitude: 44.4, description: "somethingsomething"},
      {latitude: 80.3, longitude: -44.4, description: "second marker"},
      {latitude: -33.3, longitude: 144.4, description: "third marker"}
    ];

    for ( var i = 0; i < places.length; i++ ) {
      this.setMarker(places[i], map);
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
