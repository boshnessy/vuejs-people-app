/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      searchName: "",
      searchBio: "",
      sortAttribute: "name",
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
      console.log("adding a person");
      this.people.push(this.newPerson);
      this.newPerson = "";
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
      this.sortAttribute = inputAttribute;
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var person1Name = person1[this.sortAttribute].toLowerCase();
        var person2Name = person2[this.sortAttribute].toLowerCase();
        return person1Name.localeCompare(person2Name);
      }.bind(this));
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
