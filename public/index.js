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
    var uluru = {lat: -22.363, lng: 144.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    var places = [
      {lat: -60.363, lng: 38.044, description: "place1"},
      {lat: 98.363, lng: -144.044, description: "place2"},
      {lat: -20.363, lng: 140.044, description: "place3"}
    ];
    for ( var i = 0; i < places.length; i++ ) {
      var position = new google.maps.Marker({
        position: places[i],
        map: map,
        title: 'Uluru (Ayers Rock)'
      });
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
